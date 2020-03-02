import { xanthoceras } from 'pollenium-xanthoceras'
import { Address } from 'pollenium-buttercup'
import { OverseerReader } from 'pollenium-honesty'
import { provider } from './provider'

export interface BopPair {
  agree: Address,
  disagree: Address
}


export async function fetchBopPair (overseerSlug: string): Promise<BopPair> {

  console.log('overseerSlug', overseerSlug, xanthoceras.get(`overseer.${overseerSlug}`).toHex())

  const overseer = new Address(xanthoceras.get(`overseer.${overseerSlug}`))

  const overseerReader = new OverseerReader({
    provider,
    address: overseer
  })

  return {
    agree: await overseerReader.fetchBopAgree(),
    disagree: await overseerReader.fetchBopDisagree()
  }
}
