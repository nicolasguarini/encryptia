import CryptoJS from "crypto-js"

export const modesMap = new Map([
    ['ECB', CryptoJS.mode.ECB],
    ['CBC', CryptoJS.mode.CBC],
    ['CFB', CryptoJS.mode.CFB],
    ['OFB', CryptoJS.mode.OFB],
    ['CTR', CryptoJS.mode.CTR]
])

export const modes = [ ...modesMap.keys() ]

export const AESVariants = ['128', '192', '256']

export const SHAVariants = ['SHA-1', 'SHA-2', 'SHA-3', 'SHA-384', 'SHA-512']

export const bitsMap = new Map([
    ['512', 512],
    ['1024', 1024],
    ['2048', 2048],
    ['3072', 3072],
    ['4096', 4096]
])
