import { ethers } from 'ethers'

const infuraId = 'd2f248c0dbf64edc9a11447262bfe239'

export const provider = new ethers.providers.InfuraProvider('homestead', infuraId)
