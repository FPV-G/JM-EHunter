<template>
    <section :class="['album-book-view', `mode-${store.pageTurnAnimationMode}`]" @wheel="handleWheelFlipEvent" @click="onClickBg">
        <Transition
            v-for="spread in cachedBookSpreadList"
            :key="spread.spreadIndex"
            :name="bookTransitionName">
        <div
            v-show="spread.spreadIndex === curSpreadIndex"
            class="book-spread"
            :style="spreadStyle(spread.spreadIndex)">
            <div class="book-page-container"
                v-for="i in spread.pageList"
                :key="`${spread.spreadIndex}-${i.pageIndex}`"
                :style="pageContainerStyle(i)">
                <BookPageView
                    :index="i.pageIndex"
                    :active="true"
                    :active-load="true" />
            </div>
        </div>
        </Transition>
        <transition name="center-horizontal-fade">
            <Pagination
                v-if="store.showBookPagination && spreadPageSum > 1"
                class="bottom-pagination"
                :cur-index="curSpreadIndex"
                :page-sum="spreadPageSum"
                @change="selectSpreadIndex" />
        </transition>
        <div class="action-panel">
            <div class="next"></div>
            <div class="setting"></div>
            <div class="pre"></div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import BookPageView from './BookPageView.vue'
import Pagination from './widget/Pagination.vue'
import type { StyleValue } from 'vue'
import { computed } from 'vue'
import { store, storeAction, computedAlbumViewportRatio, computedAlbumViewportHeight, computedAlbumViewportWidth } from '../store/app'
import { handleWheelFlipEvent } from '../store/event'
import {
    buildBookSpreads,
    findBookSpreadIndexByPage,
    pickBookSpreadAnchorPage,
    getBookCoverPlaceholderHeightOfWidth,
} from '../model/bookSpread'

interface BookPageDisplayParam {
    pageIndex: number,
    height: number,
    width: number,
    top: number,
    right: number,
}

function pageContainerStyle(page: BookPageDisplayParam): StyleValue {
    return {
        width: page.width + 'px',
        height: page.height + 'px',
        top: page.top + 'px',
        right: page.right + 'px',
        zIndex: store.pageCount - page.pageIndex,
    }
}

function spreadStyle(spreadIndex: number): StyleValue {
    return {
        zIndex: spreadIndex === curSpreadIndex.value ? 2 : 1,
        pointerEvents: spreadIndex === curSpreadIndex.value ? 'auto' : 'none',
    }
}

function getPagePositionRight(pageWidth: number, pageScreenIndex: number): number {
    let rightPadding = (computedAlbumViewportWidth.value - pageWidth * store.pagesPerScreen) / 2
    let nums = pageScreenIndex
    if (store.bookDirection == 1) {
        nums = store.pagesPerScreen - nums - 1
    }
    return rightPadding + nums * pageWidth
}

function calcScreenPageSize(screen: number[]): BookPageDisplayParam[] {
    let result: BookPageDisplayParam[] = []
    if (screen.length === 0) {
        return result
    }
    // calculate page size per screen
    let maxPageRatio = screen.reduce((max, index) => {
        let val = index >= 0 && index < store.pageCount
            ? storeAction.getImgPageHeightOfWidth(index)
            : getBookCoverPlaceholderHeightOfWidth()
        if (val > max) {
            return val
        }
        return max
    }, 0)
    let pagesRatio = maxPageRatio / screen.length // assume all the widths of each page are 1
    let width = 0
    if (pagesRatio >= computedAlbumViewportRatio.value) {
        width = computedAlbumViewportHeight.value / maxPageRatio
    } else {
        width = computedAlbumViewportWidth.value / screen.length
    }
    for (let i = 0; i < screen.length; i++) {
        let pageIndex = <number>screen[i]
        let heightOfWidth = pageIndex >= 0 && pageIndex < store.pageCount
            ? storeAction.getImgPageHeightOfWidth(pageIndex)
            : getBookCoverPlaceholderHeightOfWidth()
        let height = width * heightOfWidth
        let top = computedAlbumViewportHeight.value / 2 - height / 2
        if (store.showTopBar) {
            top += store.topBarHeight
        }
            result.push({
                pageIndex: pageIndex,
            height: height,
            width: width,
            top: top,
            right: getPagePositionRight(width, i),
        })
    }
    return result
}

const cachedBookSpreadList = computed(() => {
    const spreads = buildBookSpreads({
        pageCount: store.pageCount,
        pagesPerScreen: store.pagesPerScreen,
        isChangeOddEven: store.isChangeOddEven,
    })
    const currentSpreadIndex = findBookSpreadIndexByPage(spreads, store.curViewIndex)
    const preloadSpreadNum = Math.max(1, Math.ceil(store.loadNum / Math.max(1, store.pagesPerScreen)))
    const minSpreadIndex = Math.max(0, currentSpreadIndex - preloadSpreadNum)
    const maxSpreadIndex = Math.min(spreads.length - 1, currentSpreadIndex + preloadSpreadNum)

    const result: Array<{
        spreadIndex: number,
        pageList: BookPageDisplayParam[],
    }> = []
    for (let spreadIndex = minSpreadIndex; spreadIndex <= maxSpreadIndex; spreadIndex++) {
        const spread = spreads[spreadIndex]
        result.push({
            spreadIndex,
            pageList: calcScreenPageSize(spread),
        })
    }
    if (!result.some(item => item.spreadIndex === currentSpreadIndex)) {
        const activeSpread = spreads[currentSpreadIndex] || []
        result.unshift({
            spreadIndex: currentSpreadIndex,
            pageList: calcScreenPageSize(activeSpread),
        })
    }
    return result
})

const bookSpreads = computed(() => {
    return buildBookSpreads({
        pageCount: store.pageCount,
        pagesPerScreen: store.pagesPerScreen,
        isChangeOddEven: store.isChangeOddEven,
    })
})

const curSpreadIndex = computed(() => {
    return findBookSpreadIndexByPage(bookSpreads.value, store.curViewIndex)
})

const spreadPageSum = computed(() => {
    return bookSpreads.value.length
})

function selectSpreadIndex(spreadIndex: number) {
    const targetSpread = bookSpreads.value[spreadIndex]
    const targetPageIndex = pickBookSpreadAnchorPage(targetSpread, store.curViewIndex)
    storeAction.setCurViewIndex(targetPageIndex, 'book-pagination')
}

const bookTransitionName = computed(() => {
    if (store.pageTurnAnimationMode === 'none') {
        return 'screen-none'
    }

    const isLogicalNextTurn = store.flipDirection === 0
    // Use physical flip direction: 0 = right-to-left, 1 = left-to-right
    const isRightToLeftMotion = store.physicalFlipDirection === 0

    if (store.pageTurnAnimationMode === 'slide') {
        return isLogicalNextTurn ? 'screen-slide-next' : 'screen-slide-prev'
    }
    if (store.pageTurnAnimationMode === 'horizontal-slide') {
        // Only modify keyboard arrow key behavior for horizontal slide
        // RTL: left key loads from left (screen-horizontal-ltr)
        // LTR: left key loads from right (screen-horizontal-rtl)
        // Wheel/click remain unchanged
        const isRTL = store.bookDirection === 0
        const isKeyboard = store.curViewIndexUpdater === 'keyboard'

        if (isKeyboard && !isRTL) {
            // LTR + keyboard: invert direction so left key loads from right
            return isRightToLeftMotion
                ? 'screen-horizontal-ltr'
                : 'screen-horizontal-rtl'
        }
        // RTL or non-keyboard (wheel/click): keep original logic
        return isRightToLeftMotion
            ? 'screen-horizontal-rtl'
            : 'screen-horizontal-ltr'
    }
    if (store.pageTurnAnimationMode === 'page-flip') {
        return isRightToLeftMotion ? 'screen-page-flip' : 'screen-page-flip-reverse'
    }
    // rotate mode (previously called 'realistic')
    return isRightToLeftMotion ? 'screen-flip' : 'screen-flip-reverse'
})

// Computed animation durations based on speed multiplier
const animationDurations = computed(() => {
    const speed = store.animationSpeed
    const baseDuration = 0.70 // unified base duration for all animations
    return {
        unified: (baseDuration / speed).toFixed(2) + 's',
    }
})

function onClickBg(e: any) {
    let y = e.clientY
    switch(true) {
        case y >= 0 && y < store.viewportHeight * 0.3:
            // Top area: go back
            // In RTL mode, "back" means right-to-left (physicalFlipDirection=0)
            // In LTR mode, "back" means left-to-right (physicalFlipDirection=1)
            store.physicalFlipDirection = store.bookDirection === 0 ? 0 : 1
            storeAction.setCurViewIndex(store.curViewIndex - store.pagesPerScreen, 'click')
            break
        case y >= store.viewportHeight * 0.3 && y <= store.viewportHeight * 0.7:
            break
        case y >= store.viewportHeight * 0.7 && y <= store.viewportHeight:
            // Bottom area: go forward
            // In RTL mode, "forward" means left-to-right (physicalFlipDirection=1)
            // In LTR mode, "forward" means right-to-left (physicalFlipDirection=0)
            store.physicalFlipDirection = store.bookDirection === 0 ? 1 : 0
            storeAction.setCurViewIndex(store.curViewIndex + store.pagesPerScreen, 'click')
            break
    }
}

</script>

<style lang="scss" scoped>
@import '../style/_responsive';
@import '../style/_variables';

.album-book-view {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    // transition: all 0.5s ease;
    
    > .book-spread {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;

        > .book-page-container {
            user-select: none;
            position: absolute;
            box-sizing: border-box;
            box-shadow: 0px 19px 10px -8px rgba(0,0,0,0.35);
            overflow: visible;

            &:hover {
                z-index: 13050 !important;
            }
        }
    }

    > .book-page-container {
        user-select: none;
        position: absolute;
        // transition: all 0.5s ease-in-out;
        box-sizing: border-box;
        box-shadow: 0px 19px 10px -8px rgba(0,0,0,0.35);
    }

    &.mode-rotate {
        perspective: 1800px;
        perspective-origin: 50% 50%;

        > .book-spread {
            backface-visibility: hidden;
            will-change: transform, opacity;
            overflow: visible;
            --curl-before-opacity: 0;
            --curl-after-opacity: 0;
            --curl-before-transform: translateX(0) scaleX(1);
            --curl-after-transform: translateX(0) scaleX(1);

            &::before,
            &::after {
                content: '';
                position: absolute;
                inset: -2% -1%;
                pointer-events: none;
                opacity: var(--curl-before-opacity);
                transition: opacity .42s ease, transform .42s cubic-bezier(0.22, 0.61, 0.36, 1);
            }

            // page curl highlight
            &::before {
                background: radial-gradient(
                    120% 85% at 52% 50%,
                    rgba(255, 255, 255, 0.32) 0%,
                    rgba(255, 255, 255, 0.12) 26%,
                    rgba(255, 255, 255, 0.02) 62%,
                    rgba(255, 255, 255, 0) 100%
                );
                mix-blend-mode: screen;
            }

            // inner fold shadow near spine
            &::after {
                background: linear-gradient(
                    90deg,
                    rgba(0, 0, 0, 0.34) 0%,
                    rgba(0, 0, 0, 0.16) 14%,
                    rgba(0, 0, 0, 0.06) 30%,
                    rgba(0, 0, 0, 0) 55%
                );
                opacity: var(--curl-after-opacity);
                transform: var(--curl-after-transform);
            }

            &::before {
                transform: var(--curl-before-transform);
            }

            > .book-page-container {
                overflow: visible;

                &::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: linear-gradient(
                        90deg,
                        rgba(0, 0, 0, 0.16) 0%,
                        rgba(0, 0, 0, 0.04) 18%,
                        rgba(255, 255, 255, 0) 60%
                    );
                    opacity: 0.35;
                }
            }
        }
    }

    &.mode-slide {
        > .book-spread {
            will-change: transform, opacity;
            backface-visibility: hidden;
            box-shadow: 0 16px 26px -14px rgba(0, 0, 0, 0.38);
        }
    }

    &.mode-page-flip {
        perspective: 2400px;
        perspective-origin: 50% 50%;

        > .book-spread {
            transform-style: preserve-3d;
            backface-visibility: hidden;
            will-change: transform;
        }
    }

    > .bottom-pagination {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        background: $book_view_pagination_bg;
        border-radius: 3px;
        opacity: 0.5;
        box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 12000;

        &:hover {
            opacity: 1;
        }
    }
}

.action-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    opacity: 0.5;
    display: none;
    background-color: black;
    pointer-events: none;

    .next {
        position: absolute;
        left: 0;
        right: 0;
        height: 35%;
        bottom: 0;
        background-color: red;
        pointer-events: none;

    }
    .pre {
        position: absolute;
        left: 0;
        right: 0;
        height: 35%;
        top: 0;
        background-color: green;
        pointer-events: none;

    }
    .setting {
        position: absolute;
        left: 0;
        right: 0;
        height: 30%;
        top: 50%;
        transform: translateY(-50%);
        background-color: purple;
        pointer-events: none;
    }
}

// transition styles
// Rotate mode: simple 2D rotation around Y axis
.screen-flip-enter-active,
.screen-flip-leave-active {
  transition: transform v-bind('animationDurations.unified') cubic-bezier(0.4, 0.0, 0.2, 1), opacity v-bind('animationDurations.unified') ease;
}
.screen-flip-enter-from {
    transform-origin: right center;
    transform: rotateY(90deg);
    opacity: 0;
}

.screen-flip-leave-to {
  transform-origin: left center;
  transform: rotateY(-90deg);
  opacity: 0;
}

.screen-flip-reverse-enter-active,
.screen-flip-reverse-leave-active {
  transition: transform v-bind('animationDurations.unified') cubic-bezier(0.4, 0.0, 0.2, 1), opacity v-bind('animationDurations.unified') ease;
}
.screen-flip-reverse-enter-from {
    transform-origin: left center;
    transform: rotateY(-90deg);
    opacity: 0;
}

.screen-flip-reverse-leave-to {
  transform-origin: right center;
  transform: rotateY(90deg);
  opacity: 0;
}

.screen-flip-reverse-leave-to {
  transform-origin: right center;
  transform: translate3d(16%, 0, 0) rotateY(80deg) rotateX(2.8deg) skewY(-2.6deg) scale(0.91, 0.97);
  opacity: 0;
}

.screen-slide-next-enter-active,
.screen-slide-next-leave-active,
.screen-slide-prev-enter-active,
.screen-slide-prev-leave-active {
    transition: transform v-bind('animationDurations.unified') cubic-bezier(0.22, 0.74, 0.2, 1), opacity v-bind('animationDurations.unified') ease;
}

.screen-slide-next-enter-from {
    transform: translate3d(0, 102%, 0);
    opacity: 0.95;
}

.screen-slide-next-leave-to {
    transform: translate3d(0, -102%, 0);
    opacity: 0;
}

.screen-slide-prev-enter-from {
    transform: translate3d(0, -102%, 0);
    opacity: 0.95;
}

.screen-slide-prev-leave-to {
    transform: translate3d(0, 102%, 0);
    opacity: 0;
}

.screen-horizontal-rtl-enter-active,
.screen-horizontal-rtl-leave-active,
.screen-horizontal-ltr-enter-active,
.screen-horizontal-ltr-leave-active {
    transition: transform v-bind('animationDurations.unified') cubic-bezier(0.22, 0.74, 0.2, 1), opacity v-bind('animationDurations.unified') ease;
}

// Right-to-left reading (RTL): next page enters from LEFT, previous from RIGHT
.screen-horizontal-rtl-enter-from {
    transform: translate3d(-102%, 0, 0);
    opacity: 0.95;
}

.screen-horizontal-rtl-leave-to {
    transform: translate3d(102%, 0, 0);
    opacity: 0;
}

// Left-to-right reading (LTR): next page enters from RIGHT, previous from LEFT
.screen-horizontal-ltr-enter-from {
    transform: translate3d(102%, 0, 0);
    opacity: 0.95;
}

.screen-horizontal-ltr-leave-to {
    transform: translate3d(-102%, 0, 0);
    opacity: 0;
}

.screen-none-enter-active,
.screen-none-leave-active {
    transition-duration: 0s;
}

.screen-none-enter-from,
.screen-none-leave-to {
    opacity: 1;
    transform: none;
}

// Real page flip animation transitions
.screen-page-flip-enter-active,
.screen-page-flip-leave-active,
.screen-page-flip-reverse-enter-active,
.screen-page-flip-reverse-leave-active {
    transition: transform v-bind('animationDurations.unified') cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity v-bind('animationDurations.unified') ease;
}

// Default direction: flip from right to left (like turning a page forward in RTL)
.screen-page-flip-enter-from {
    transform: rotateY(95deg);
    transform-origin: right center;
    opacity: 0.3;
}

.screen-page-flip-leave-to {
    transform: rotateY(-95deg);
    transform-origin: left center;
    opacity: 0.3;
}

// Reverse direction: flip from left to right (like turning a page backward in LTR)
.screen-page-flip-reverse-enter-from {
    transform: rotateY(-95deg);
    transform-origin: left center;
    opacity: 0.3;
}

.screen-page-flip-reverse-leave-to {
    transform: rotateY(95deg);
    transform-origin: right center;
    opacity: 0.3;
}

</style>
