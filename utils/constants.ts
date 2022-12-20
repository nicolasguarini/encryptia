import CryptoJS from "crypto-js"

export const modesMap: Map<string, any> = new Map([
    ['ECB', CryptoJS.mode.ECB],
    ['CBC', CryptoJS.mode.CBC],
    ['CFB', CryptoJS.mode.CFB],
    ['OFB', CryptoJS.mode.OFB],
    ['CTR', CryptoJS.mode.CTR]
])

export const modes: any[] = Array.from(modesMap.keys())

export const AESVariants: string[] = ['128', '192', '256']

export const SHAVariants: string[] = ['SHA-1', 'SHA-2', 'SHA-3', 'SHA-384', 'SHA-512']

export const bitsMap: Map<string, number> = new Map([
    ['512', 512],
    ['1024', 1024],
    ['2048', 2048],
    ['3072', 3072],
    ['4096', 4096]
])
