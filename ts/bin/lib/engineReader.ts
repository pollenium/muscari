import { EngineReader } from 'pollenium-alchemilla'
import { provider } from './provider'
import { engine } from 'pollenium-xanthoceras'

export const engineReader = new EngineReader({
  provider,
  address: engine
})
