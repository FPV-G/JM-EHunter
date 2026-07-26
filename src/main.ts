import { createApp, ref, h } from 'vue'
import TestApp from '../core/TestApp.vue'
import LoadingView from '../core/components/LoadingView.vue'
import '../core/style/_normalize.scss'
import { NameAlbumService } from '../core/service/AlbumService'
import { detectPlatform } from './platform/detector'
import { createPlatformService } from './platform/factory'
import { initializeWithTimeout } from './platform/initializer'
import { applyPlatformHostActions } from './platform/hostActions'
import PlatformService from './platform/base/service/PlatformService.js'
import { Platform, type InitializationError } from './platform/types'

/// <reference types="vite-svg-loader" />

// Detect platform based on current URL
const detectionResult = detectPlatform()

type JMEHunterUiBridge = {
  open: () => void
  close: () => void
  toggle: (show: boolean) => void
}

type WindowWithJMEHunterBridge = Window & {
  __JMEHUNTER_UI__?: JMEHunterUiBridge
}

const JMEHUNTER_STATUS_KEY = 'jmehunter:reader:open'
const JMEHUNTER_SWITCH_ID = 'jmehunter-switch'
const JMEHUNTER_CONTAINER_ID = 'jmehunter-app'
const JMJMEHUNTER_OPEN_DURATION_MS = 720
const JMJMEHUNTER_CLOSE_DURATION_MS = 580
const JMJMEHUNTER_OPEN_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'
const JMJMEHUNTER_CLOSE_EASING = 'cubic-bezier(0.55, 0.08, 0.68, 0.53)'

function readJMEHunterStatus(): boolean {
  const value = PlatformService.storageGet(JMEHUNTER_STATUS_KEY, true)
  if (typeof value === 'boolean') {
    return value
  }
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }
  return true
}

function writeJMEHunterStatus(open: boolean): void {
  PlatformService.storageSet(JMEHUNTER_STATUS_KEY, open)
}

function createEhunterSwitch(onOpen: () => void, themeColor: string): void {
  const existing = document.getElementById(JMEHUNTER_SWITCH_ID)
  if (existing) {
    existing.remove()
  }

  const container = document.createElement('div')
  container.style.display = 'flex'
  container.style.flexDirection = 'column'
  container.style.justifyContent = 'center'
  container.style.alignItems = 'center'
  container.style.position = 'fixed'
  container.style.right = '100px'
  container.style.top = '-150px'
  container.style.zIndex = '2147483646'
  container.style.cursor = 'pointer'
  container.style.transition = 'all 0.2s cubic-bezier(.46,-0.23,.37,2.38)'
  container.setAttribute('title', 'open JM-EHunter')
  container.setAttribute('id', JMEHUNTER_SWITCH_ID)
  container.addEventListener('click', () => {
    container.style.top = '-50px'
    window.setTimeout(() => {
      container.style.top = '-150px'
    }, 2000)
    onOpen()
  })

  const line = document.createElement('span')
  line.style.width = '2px'
  line.style.height = '200px'
  line.style.background = themeColor
  line.style.boxShadow = '0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)'
  container.appendChild(line)

  const ring = document.createElement('span')
  ring.style.border = `2px solid ${themeColor}`
  ring.style.borderRadius = '50%'
  ring.style.width = '15px'
  ring.style.height = '15px'
  ring.style.boxShadow = '0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)'
  container.appendChild(ring)

  document.body.appendChild(container)
}

// Early return if no platform detected (non-album page)
if (!detectionResult.platform) {
  console.log('JM-EHunter: No platform detected (non-album page), skipping initialization')
  // Exit silently - no errors thrown per FR-006
} else {
  // Platform detected - initialize reader
  console.log(`JM-EHunter: Platform detected: ${detectionResult.platform}`)

  let isMounted = false
  let hostActionsApplied = false
  let hideTimerId: number | null = null
  let originalViewportContent: string | null = null
  let hadViewportMeta = false
  let viewportAdjusted = false

  const isMobileLike = (): boolean => {
    return window.matchMedia('(pointer: coarse)').matches || /iphone|ipad|ipod|android|mobile/i.test(navigator.userAgent)
  }

  const ensureEHViewportForOpen = (): void => {
    if (detectionResult.platform !== Platform.EH || !isMobileLike()) {
      return
    }

    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
    const desiredContent = 'width=device-width, initial-scale=1, viewport-fit=cover'

    if (!viewportAdjusted) {
      hadViewportMeta = Boolean(viewportMeta)
      originalViewportContent = viewportMeta
        ? viewportMeta.getAttribute('content')
        : null
      viewportAdjusted = true
    }

    if (!viewportMeta) {
      viewportMeta = document.createElement('meta')
      viewportMeta.name = 'viewport'
      viewportMeta.setAttribute('data-ehunter-managed', '1')
      ;(document.head || document.documentElement).appendChild(viewportMeta)
    }

    viewportMeta.setAttribute('content', desiredContent)
  }

  const restoreEHViewportOnClose = (): void => {
    if (!viewportAdjusted) {
      return
    }

    const viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
    if (!hadViewportMeta) {
      if (viewportMeta?.getAttribute('data-ehunter-managed') === '1') {
        viewportMeta.remove()
      }
    } else if (viewportMeta) {
      if (originalViewportContent === null) {
        viewportMeta.removeAttribute('content')
      } else {
        viewportMeta.setAttribute('content', originalViewportContent)
      }
    }

    originalViewportContent = null
    hadViewportMeta = false
    viewportAdjusted = false
  }

  const clearHideTimer = (): void => {
    if (hideTimerId !== null) {
      window.clearTimeout(hideTimerId)
      hideTimerId = null
    }
  }

  const scheduleHideContainer = (container: HTMLElement, delayMs: number): void => {
    clearHideTimer()
    hideTimerId = window.setTimeout(() => {
      container.style.visibility = 'hidden'
      container.style.pointerEvents = 'none'
      hideTimerId = null
    }, delayMs)
  }

  const ensureMounted = (): HTMLElement => {
    let container = document.getElementById(JMEHUNTER_CONTAINER_ID)
    if (!container) {
      container = document.createElement('div')
      container.id = JMEHUNTER_CONTAINER_ID
      container.classList.add('normalize')
      container.style.position = 'fixed'
      container.style.height = '100%'
      container.style.width = '100%'
      container.style.transitionProperty = 'top'
      container.style.transitionDuration = `${JMEHUNTER_OPEN_DURATION_MS}ms`
      container.style.transitionTimingFunction = JMEHUNTER_OPEN_EASING
      container.style.background = '#333333'
      container.style.zIndex = '2147483647'
      container.style.top = '-100%'
      container.style.left = '0'
      container.style.visibility = 'hidden'
      container.style.pointerEvents = 'none'
      document.body.appendChild(container)
    }

    container.dataset.ehunterPlatform = detectionResult.platform!

    if (!isMounted) {
      const app = createApp({
        setup() {
          const isLoading = ref(true)
          const error = ref<InitializationError | null>(null)

          const init = async () => {
            try {
              if (!hostActionsApplied) {
                applyPlatformHostActions(detectionResult.platform!)
                hostActionsApplied = true
              }

              const albumService = createPlatformService(detectionResult.platform!)
              app.provide(NameAlbumService, albumService)
              await initializeWithTimeout(albumService, detectionResult.platform!)
              isLoading.value = false
            } catch (err) {
              isLoading.value = false
              error.value = err as InitializationError
              console.error('JM-EHunter initialization failed:', {
                message: error.value.message,
                stack: error.value.stack,
                platform: error.value.platform,
                url: error.value.url,
                timestamp: error.value.timestamp
              })
            }
          }

          init()

          const handleClose = () => {
            writeJMEHunterStatus(false)
            restoreEHViewportOnClose()
            document.body.style.overflow = ''
            const root = document.getElementById(JMEHUNTER_CONTAINER_ID)
            if (root) {
              root.style.top = '-100%'
              scheduleHideContainer(root, JMEHUNTER_CLOSE_DURATION_MS)
            }
          }

          return {
            isLoading,
            error,
            handleClose
          }
        },
        render() {
          return h(LoadingView, {
            isLoading: this.isLoading,
            error: this.error,
            onClose: this.handleClose
          }, {
            default: () => h(TestApp)
          })
        }
      })

      app.mount(`#${JMEHUNTER_CONTAINER_ID}`)
      isMounted = true
    }

    return container
  }

  const toggleJMEHunterView = (show: boolean): void => {
    const container = ensureMounted()
    clearHideTimer()
    container.style.transitionProperty = 'top'
    container.style.transitionDuration = show
      ? `${JMEHUNTER_OPEN_DURATION_MS}ms`
      : `${JMEHUNTER_CLOSE_DURATION_MS}ms`
    container.style.transitionTimingFunction = show
      ? JMEHUNTER_OPEN_EASING
      : JMEHUNTER_CLOSE_EASING
    document.body.style.overflow = show ? 'hidden' : ''

    if (show) {
      ensureEHViewportForOpen()
      container.style.visibility = 'visible'
      container.style.pointerEvents = 'auto'
      requestAnimationFrame(() => {
        container.style.top = '0'
      })
      return
    }

    restoreEHViewportOnClose()
    container.style.top = '-100%'
    scheduleHideContainer(container, JMEHUNTER_CLOSE_DURATION_MS)
  }

  const openJMEHunter = (): void => {
    writeJMEHunterStatus(true)
    toggleJMEHunterView(true)
  }

  const closeJMEHunter = (): void => {
    writeJMEHunterStatus(false)
    toggleJMEHunterView(false)
  }

  ;(window as WindowWithJMEHunterBridge).__JMEHUNTER_UI__ = {
    open: openJMEHunter,
    close: closeJMEHunter,
    toggle: toggleJMEHunterView
  }

  const platformThemeColor = detectionResult.platform === Platform.C18 ? '#FF7A00' : '#2ecc71'
  createEhunterSwitch(openJMEHunter, platformThemeColor)

  if (readJMEHunterStatus()) {
    openJMEHunter()
  }
}
