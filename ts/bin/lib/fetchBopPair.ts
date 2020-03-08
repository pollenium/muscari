import { Address } from 'pollenium-buttercup'
import { OverseerReader } from 'pollenium-honesty'
import { provider } from './provider'
import { Uish } from 'pollenium-uvaursi'

export interface BopPair {
  agree: Address,
  disagree: Address
}


export async function fetchBopPair (overseerUish: Uish): Promise<BopPair> {

  const overseer = new Address(overseerUish)

  const overseerReader = new OverseerReader({
    provider,
    address: overseer
  })

  return {
    agree: await overseerReader.fetchBopAgree(),
    disagree: await overseerReader.fetchBopDisagree()
  }
}
