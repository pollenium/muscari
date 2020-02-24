import { Uu } from 'pollenium-uvaursi'
import { Address } from 'pollenium-buttercup'

const daiHex = '6B175474E89094C44Da98b954EedeAC495271d0F'

export const dai = new Address(Uu.fromHexish(daiHex))
