import { logState, fetchState } from './lib/state'
import { Uint256 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { engine } from 'pollenium-xanthoceras'
import { makerDaiWriter } from './lib/maker'

const uint256Max = new Uint256(Uu.genFill({ fill: 255, length: 32 }))

async function run() {
  await logState()
  const state = await fetchState()
  if (!state.allowance.compEq(0)) {
    console.log('Already allowed')
    return
  }
  await makerDaiWriter.setAllowance({
    spender: engine,
    amount: uint256Max
  })
}

run()
