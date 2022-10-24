import CryptoJS from "crypto-js"

export const modesMap = new Map([
    ['ECB', CryptoJS.mode.ECB],
    ['CBC', CryptoJS.mode.CBC],
    ['CFB', CryptoJS.mode.CFB],
    ['OFB', CryptoJS.mode.OFB],
    ['CTR', CryptoJS.mode.CTR]
])

export const modes = [ ...modesMap.keys() ]
