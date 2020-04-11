import { Uint256, Address } from 'pollenium-buttercup'
import { engineReader } from './engineReader'
import { daiReader } from './daiReader'
import { dai, engine } from 'pollenium-xanthoceras'
import { maker } from './maker'

export interface State {
  maker: Address
  engineBalance: Uint256,
  nativeBalance: Uint256,
  allowance: Uint256
}

export async function fetchState(): Promise<State> {
  const engineBalance = await engineReader.fetchBalance({
    token: dai,
    holder: maker
  })

  const nativeBalance = await daiReader.fetchBalance(maker)

  const allowance = await daiReader.fetchAllowance({
    holder: maker,
    spender: engine
  })

  return {
    maker,
    engineBalance,
    nativeBalance,
    allowance
  }
}

export async function logState(): Promise<void> {
  const state = await fetchState()
  console.log('================')
  console.log(`maker:`, state.maker.uu.toHex())
  console.log('engine balance:', state.engineBalance.toNumberString(10))
  console.log('native balance:', state.nativeBalance.toNumberString(10))
  console.log('allowance:', state.allowance.toNumberString(10))
  console.log('================')

}
