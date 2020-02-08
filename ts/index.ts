import { Bellflower, Block } from 'pollenium-bellflower'
import { ethers } from 'ethers'
import { Address, Uint256, Bytes32 } from 'pollenium-buttercup'
import { Order, SignedOrder, ORDER_TYPE } from 'pollenium-orchid'
import { Keypair } from 'pollenium-ilex'
import { Client, MissiveGenerator, clientDefaults, FRIENDSHIP_STATUS } from 'pollenium-anemone'
import { Uu } from 'pollenium-uvaursi'
import { applicationId, clientStruct } from './params'
import delay from 'delay'

const infuraId = 'd2f248c0dbf64edc9a11447262bfe239'
const daiHex = '6B175474E89094C44Da98b954EedeAC495271d0F'
const usdcHex = 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

const keypair = Keypair.generate()
const dai = new Address(Uu.fromHexish(daiHex))
const usdc = new Address(Uu.fromHexish(usdcHex))

const client = new Client(clientStruct)

const provider = new ethers.providers.InfuraProvider('homestead', infuraId)
const bellflower = new Bellflower(provider)

let block: Block | null = null
bellflower.blockSnowdrop.addHandle(async (_block) => {
  block = _block
})

export async function broadcast() {

  await delay(1000)

  if (block === null) {
    console.log('no block')
    return
  }

  const orderStruct = {
    type: ORDER_TYPE.BUYY,
    prevBlockHash: block.hash,
    quotToken: dai,
    variToken: usdc,
    priceNumer: Uint256.fromNumber(1),
    priceDenom: Uint256.fromNumber(1),
    tokenLimit: Uint256.fromNumber(1)
  }

  const order = new Order(orderStruct)
  const signedOrder = new SignedOrder({
    order,
    signature: keypair.getSignature(order.getSugmaHash())
  })
  const ligma = signedOrder.getLigma()
  const missiveGenerator = new MissiveGenerator({
    applicationId,
    applicationData: ligma,
    difficulty: 1,
    ttl: 30,
    hashcashWorkerUrl: require.resolve('pollenium-anemone/node/src/hashcash-worker.js')
  })

  console.log('generate missive')
  const missive = await missiveGenerator.fetchMissive()

  console.log('broadcast')
  client.broadcastMissive(missive)

  await delay(1000)

  await broadcast()
}

broadcast()

setInterval(() => {
  const connectedFriendshipsCount = client.getSummary().struct.partySummary.getFriendshipsCountByStatus(FRIENDSHIP_STATUS.CONNECTED)
  console.log('connected friendships:', connectedFriendshipsCount)
}, 1000)
