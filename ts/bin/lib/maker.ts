import { Uu } from 'pollenium-uvaursi'
import { Bytes32 } from 'pollenium-buttercup'
import { Keypair } from 'pollenium-ilex'
import { ethers } from 'ethers'
import { provider } from './provider'
import { EngineWriter } from 'pollenium-alchemilla'
import { TokenWriter } from 'pollenium-toadflax'
import { engine, dai } from 'pollenium-xanthoceras'
import dotenv from 'dotenv-safe'

dotenv.config()

export const makerPrivateKey = new Bytes32(
  Uu.fromHexish(process.env.PRIVATE_KEY_HEX)
)

export const makerKeypair = new Keypair(makerPrivateKey)

export const maker = makerKeypair.getAddress()

export const makerSigner = new ethers.Wallet(makerPrivateKey.u, provider)

export const makerEngineWriter = new EngineWriter({
  signer: makerSigner,
  address: engine
})

export const makerDaiWriter = new TokenWriter({
  signer: makerSigner,
  address: dai
})
