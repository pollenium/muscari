import { logState, fetchState } from './lib/state'
import { Uint256 } from 'pollenium-buttercup'
import { Uu } from 'pollenium-uvaursi'
import { dai } from 'pollenium-xanthoceras'
import { maker, makerEngineWriter } from './lib/maker'

async function run() {
  await logState()
  const state = await fetchState()
  if (state.nativeBalance.compEq(0)) {
    console.log('0 native balance')
    return
  }
  await makerEngineWriter.depositViaNative({
    to: maker,
    token: dai,
    amount: state.nativeBalance
  })
}

run()
