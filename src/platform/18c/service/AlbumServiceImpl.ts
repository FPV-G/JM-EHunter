import type { AlbumService } from '../../../../core/service/AlbumService'
import type { ImgPageInfo, ThumbInfo, PreviewThumbnailStyle } from '../../../../core/model/model'
import { ImgPageParser } from '../parser/ImgPageParser'
import type { InitializationStepUpdate } from '../../types'
import { C18_INITIALIZATION_STEPS, createStepMap, createStepUpdate, markCurrentPendingStepFailed } from '../../init-steps'

declare const unsafeWindow: Window & { md5?: (value: string) => string }

export class C18AlbumServiceImpl implements AlbumService {
    private parser = new ImgPageParser()
    private thumbInfos: Array<ThumbInfo> = []
    private imgPageInfos: Array<ImgPageInfo> = []
    private reportStep: (s: InitializationStepUpdate) => void = () => {}
    private stepStatus: Record<string, string> = {}
    private stepOrder = C18_INITIALIZATION_STEPS.map(s => s.id)
    private stepMap = createStepMap(C18_INITIALIZATION_STEPS)
    private decodedImages = new Map<number, { url: string; ratio: number }>()
    private decodePromises = new Map<number, Promise<{ url: string; ratio: number }>>()

    isSupportOriginImg(): boolean { return false }
    isSupportImgChangeSource(): boolean { return false }
    // Decoded page URLs are shared with the thumbnail store after each page
    // finishes loading, so previews never expose the scrambled CDN source.
    isSupportThumbView(): boolean { return true }
    getTitle(): string { return this.parser.getTitle() }
    getAlbumId(): string { return this.parser.getAlbumId() }
    getIntroUrl(): string { return window.location.href }
    getPageCount(): number { return this.imgPageInfos.length }
    getCurPageIndex(): number { return 0 }

    setInitializationStepReporter(fn: (s: InitializationStepUpdate) => void): void { this.reportStep = fn }
    private step(s: InitializationStepUpdate): void { this.stepStatus[s.id] = s.status; this.reportStep(s) }
    private fail(s: string): void { markCurrentPendingStepFailed(this.stepOrder, this.stepStatus, this.stepMap, s, c => this.step(c)) }

    async init(): Promise<Error | void> {
        this.stepStatus = {}
        C18_INITIALIZATION_STEPS.forEach(c => this.step(createStepUpdate(c, 'pending')))
        const title = this.parser.getTitle()
        try {
            for (let retry = 0; retry < 50; retry++) {
                this.imgPageInfos = this.parser.getImgPageInfos()
                if (this.imgPageInfos.length > 0) break
                await new Promise(r => setTimeout(r, 200))
            }
            if (!this.imgPageInfos.length) throw new Error('Timed out waiting for images')
            this.step(createStepUpdate(this.stepMap.parseReadingPageMetadata, 'success', title + ' (' + this.imgPageInfos.length + 'p)'))
            this.step(createStepUpdate(this.stepMap.extractImagePages, 'success', String(this.imgPageInfos.length)))
            this.thumbInfos = this.parser.getThumbInfos(this.imgPageInfos)
            this.step(createStepUpdate(this.stepMap.buildThumbnails, 'success', 'done'))
            console.log('eHunter 18comic:', this.imgPageInfos.length, 'pages')
        } catch (e) {
            this.fail(e instanceof Error ? e.message : String(e))
            return e instanceof Error ? e : new Error(String(e))
        }
    }

    getThumbInfos(_: boolean): Array<ThumbInfo> { return this.thumbInfos }
    getImgPageInfos(): Array<ImgPageInfo> { return this.imgPageInfos }

    private getSegmentCount(index: number): number {
        const albumId = Number(this.parser.getAlbumId())
        const scrambleId = this.parser.getScrambleId()

        if (albumId < scrambleId) {
            return 0
        }

        if (albumId < 268850) {
            return 10
        }

        const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window
        const md5Function = (pageWindow as Window & { md5?: (value: string) => string }).md5
        if (typeof md5Function !== 'function') {
            throw new Error('18comic MD5 function is not available yet')
        }

        const pageNumber = this.parser.getPageNumber(index)
        const digest = md5Function(`${albumId}${pageNumber}`)
        const moduloBase = albumId < 421926 ? 10 : 8
        const hashedCharacterCode = digest.slice(-1).charCodeAt(0)
        const remainder = hashedCharacterCode % moduloBase
        return remainder < 10 ? 2 + 2 * remainder : 10
    }

    private requestImageBlob(url: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                responseType: 'blob',
                onload: response => {
                    if (response.status >= 200 && response.status < 300 && response.response instanceof Blob) {
                        resolve(response.response)
                        return
                    }
                    reject(new Error(`Image request failed: ${response.status} ${url}`))
                },
                onerror: response => reject(new Error(`Image request error: ${response.status} ${url}`)),
                ontimeout: () => reject(new Error(`Image request timed out: ${url}`))
            })
        })
    }

    private getCdnCandidates(url: string): string[] {
        const candidates = [url]
        for (const suffix of ['', '2', '3']) {
            const candidate = url.replace(/\/\/cdn-msp\d?\./, `//cdn-msp${suffix}.`)
            if (!candidates.includes(candidate)) {
                candidates.push(candidate)
            }
        }
        return candidates
    }

    private async requestImageBlobWithRetry(url: string): Promise<Blob> {
        let lastError: unknown = new Error(`No CDN candidates for ${url}`)
        for (const candidateUrl of this.getCdnCandidates(url)) {
            try {
                return await this.requestImageBlob(candidateUrl)
            } catch (error) {
                lastError = error
            }
        }
        throw lastError
    }

    private async decodeImage(url: string, index: number): Promise<{ url: string; ratio: number }> {
        const sourceBlob = await this.requestImageBlobWithRetry(url)
        const sourceBitmap = await createImageBitmap(sourceBlob)
        const segmentCount = this.getSegmentCount(index)
        const ratio = sourceBitmap.height / sourceBitmap.width

        if (segmentCount === 0) {
            sourceBitmap.close()
            return { url: URL.createObjectURL(sourceBlob), ratio }
        }

        const canvas = document.createElement('canvas')
        canvas.width = sourceBitmap.width
        canvas.height = sourceBitmap.height
        const context = canvas.getContext('2d')
        if (!context) {
            sourceBitmap.close()
            throw new Error('Could not create a 2D canvas context')
        }

        const stripHeight = Math.floor(sourceBitmap.height / segmentCount)
        const remainderHeight = sourceBitmap.height % segmentCount

        for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex++) {
            const sourceY = sourceBitmap.height - stripHeight * (segmentIndex + 1) - remainderHeight
            const destinationY = stripHeight * segmentIndex + (segmentIndex === 0 ? 0 : remainderHeight)
            const currentStripHeight = stripHeight + (segmentIndex === 0 ? remainderHeight : 0)

            context.drawImage(
                sourceBitmap,
                0,
                sourceY,
                sourceBitmap.width,
                currentStripHeight,
                0,
                destinationY,
                sourceBitmap.width,
                currentStripHeight
            )
        }

        sourceBitmap.close()
        const decodedBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Canvas export failed')), 'image/webp', 0.95)
        })
        return { url: URL.createObjectURL(decodedBlob), ratio }
    }

    async getImgSrc(index: number, _mode: any): Promise<ImgPageInfo | Error> {
        const imagePageInfo = this.imgPageInfos[index]
        if (!imagePageInfo) {
            return new Error(`Image not found: ${index}`)
        }

        try {
            const cachedImage = this.decodedImages.get(index)
            if (cachedImage) {
                return {
                    ...imagePageInfo,
                    src: cachedImage.url,
                    preciseHeightOfWidth: cachedImage.ratio
                }
            }

            let decodePromise = this.decodePromises.get(index)
            if (!decodePromise) {
                decodePromise = this.decodeImage(imagePageInfo.pageUrl, index)
                this.decodePromises.set(index, decodePromise)
            }

            const decodedImage = await decodePromise
            this.decodePromises.delete(index)
            this.decodedImages.set(index, decodedImage)
            imagePageInfo.preciseHeightOfWidth = decodedImage.ratio
            return {
                ...imagePageInfo,
                src: decodedImage.url,
                preciseHeightOfWidth: decodedImage.ratio
            }
        } catch (error) {
            return error instanceof Error ? error : new Error(String(error))
        }
    }

    getPreviewThumbnailStyle(index: number): PreviewThumbnailStyle {
        const t = this.thumbInfos[index]
        return { 'background-image': t && t.src ? 'url(' + t.src + ')' : '', 'background-position': 'center', 'background-size': 'contain' }
    }
}
