import { TokenReader } from 'pollenium-toadflax'
import { provider } from './provider'
import { dai } from 'pollenium-xanthoceras'

export const daiReader = new TokenReader({
  provider,
  address: dai
})
