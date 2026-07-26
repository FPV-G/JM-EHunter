import type { ImgPageInfo, ThumbInfo } from '../../../../core/model/model'
import { ThumbMode } from '../../../../core/model/model'

const FALLBACK_CDN = 'https://cdn-msp.18comic.vip'
const FALLBACK_RATIO = 1.42

function parsePageArr(html: string): string[] {
    const m = html.match(/page_arr\s*=\s*(\[[^\]]*?\])/)
    if (!m) return []
    try { return JSON.parse(m[1]) } catch (e) { return [] }
}

function parseCdnHost(html: string): string {
    const m = html.match(/cdnImgHost\s*:\s*'([^']+)'/)
    if (m) return m[1]
    const m2 = html.match(/cdnImgHost\s*:\s*"([^"]+)"/)
    return m2 ? m2[1] : FALLBACK_CDN
}

function parseAlbumId(html: string): string {
    const m = html.match(/currentAid\s*:\s*'(\d+)'/)
    if (m) return m[1]
    const m2 = html.match(/currentAid\s*:\s*"(\d+)"/)
    return m2 ? m2[1] : ''
}

function parseScrambleId(html: string): number {
    const match = html.match(/scramble_id\s*=\s*(\d+)/)
    return match ? Number(match[1]) : 220980
}

interface C18PageData {
    cdn: string
    aid: string
    files: string[]
    scrambleId: number
}

function parseAllData(html: string): C18PageData | null {
    const files = parsePageArr(html)
    if (!files.length) return null
    const valid = files.filter(f => !f.includes('blank') && f.endsWith('.webp'))
    if (!valid.length) return null
    const cdn = parseCdnHost(html)
    const aid = parseAlbumId(html) || ''
    return { cdn, aid, files: valid, scrambleId: parseScrambleId(html) }
}

export class ImgPageParser {
    private albumId: string = ''
    private title: string = ''

    constructor(html?: string) {
        this.albumId = this.fromUrl()
        this.title = this.fromTitle()
    }

    private fromUrl(): string {
        const m = window.location.pathname.match(/\/photo\/(\d+)/)
        return m ? m[1] : ''
    }

    private fromTitle(): string {
        const h1 = document.querySelector('h1')
        if (h1 && h1.textContent) {
            const t = h1.textContent.split('|')[0].trim()
            if (t) return t
        }
        return document.title.split('|')[0].trim()
    }

    getAlbumId(): string { return this.albumId }
    getTitle(): string { return this.title }
    getCurPageIndex(): number { return 0 }

    getPageCount(): number {
        const data = this.readData()
        if (data) return data.files.length
        return document.querySelectorAll('img[id*="album_photo"]:not([src*="blank"])').length
    }

    private readData(): C18PageData | null {
        const scripts = document.querySelectorAll('script:not([src])')
        for (const s of scripts) {
            if (!s.textContent || !s.textContent.includes('page_arr')) continue
            const d = parseAllData(s.textContent)
            if (d) return d
        }
        const html = document.documentElement.outerHTML
        if (html.includes('page_arr')) return parseAllData(html)
        return null
    }

    getScrambleId(): number {
        return this.readData()?.scrambleId ?? 220980
    }

    getFileName(index: number): string {
        return this.readData()?.files[index] ?? `${String(index + 1).padStart(5, '0')}.webp`
    }

    getPageNumber(index: number): string {
        return this.getFileName(index).replace(/\.[^.]+(?:\?.*)?$/, '')
    }

    getImgPageInfos(): Array<ImgPageInfo> {
        const data = this.readData()
        const list: Array<ImgPageInfo> = []

        if (data) {
            data.files.forEach((f, i) => {
                const sourceUrl = data.cdn + '/media/photos/' + (data.aid || this.albumId) + '/' + f
                list.push({
                    id: i + 1, index: i,
                    // eHunter skips getImgSrc() when src is already populated.
                    // Keep the scrambled CDN source in pageUrl and leave src empty
                    // so every displayed page must pass through the decoder.
                    pageUrl: sourceUrl,
                    src: '',
                    heightOfWidth: FALLBACK_RATIO
                })
            })
            return list
        }

        const imgs = document.querySelectorAll('img[id*="album_photo"]')
        let lastR = FALLBACK_RATIO; let cdn = FALLBACK_CDN
        imgs.forEach((img) => {
            const el = img as HTMLImageElement
            const s = el.src || ''
            if (s.includes('blank.jpg')) return
            if (cdn === FALLBACK_CDN && s.startsWith('http')) {
                const m = s.match(/^(https?:\/\/[^\/]+)/)
                if (m) cdn = m[1]
            }
            let w = el.naturalWidth || el.width || 0
            let h = el.naturalHeight || el.height || 0
            const r = (w > 0 && h > 0) ? (h / w) : lastR
            if (r > 0.01) lastR = r
            const sourceUrl = s || (cdn + '/media/photos/' + this.albumId + '/' + String(list.length + 1).padStart(5, '0') + '.webp')
            list.push({
                id: list.length + 1, index: list.length,
                pageUrl: sourceUrl,
                src: '',
                heightOfWidth: r
            })
        })
        return list
    }

    getThumbInfos(pages: Array<ImgPageInfo>): Array<ThumbInfo> {
        return pages.map(p => {
            const ar = p.heightOfWidth || FALLBACK_RATIO
            const th = 140
            // Raw 18comic images are scrambled. Do not expose them as previews.
            return { id: p.id, src: '', mode: ThumbMode.IMG, height: th, width: Math.round(th / ar) }
        })
    }
}
