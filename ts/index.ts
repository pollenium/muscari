import { Bellflower } from 'pollenium-bellflower'
import { ethers } from 'ethers'
import { Address, Uint256, Bytes32 } from 'pollenium-buttercup'
import { Order, SignedOrder, ORDER_TYPE } from 'pollenium-orchid'
import { Keypair } from 'pollenium-ilex'
import { Client, MissiveGenerator, clientDefaults } from 'pollenium-anemone'
import { Uu } from 'pollenium-uvaursi'

const infuraId = 'd2f248c0dbf64edc9a11447262bfe239'
const daiHex = '6B175474E89094C44Da98b954EedeAC495271d0F'
const usdcHex = 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

const keypair = Keypair.generate()
const applicationId = Uu.fromUtf8('alchemilla.orders.v0').genPaddedLeft(32)

const client = new Client({
  ...clientDefaults,
  signalingServerUrls: [
    ' wss://begonia-us-1.herokuapp.com',
    ' wss://begonia-us-1.herokuapp.com'
  ],
})

export async function run(struct: {
  infuraId: string,
  quotToken: Address,
  variToken: Address
}) {
  const { infuraId, quotToken, variToken } = struct
  const provider = new ethers.providers.InfuraProvider('homestead', infuraId)
  const bellflower = new Bellflower(provider)
  bellflower.blockSnowdrop.addHandle(async (block) => {

    const orderStruct = {
      type: ORDER_TYPE.BUYY,
      prevBlockHash: block.hash,
      quotToken: quotToken,
      variToken: variToken,
      priceNumer: Uint256.fromNumber(1),
      priceDenom: Uint256.fromNumber(1),
      tokenLimit: Uint256.fromNumber(1)
    }

    const order = new Order(orderStruct)
    const signedOrder = new SignedOrder(
      order,
      keypair.getSignature(order.getSugmaHash())
    )
    const ligma = signedOrder.getLigma()
    const missiveGenerator = new MissiveGenerator({
      applicationId,
      applicationData: ligma,
      difficulty: 1,
      ttl: 30,
      hashcashWorkerUrl: require.resolve('pollenium-anemone/node/src/hashcash-worker.js')
    })

    const missive = await missiveGenerator.fetchMissive()

    client.broadcastMissive(missive)

  })
}


run({
  infuraId: infuraId,
  quotToken: new Address(Uu.fromHexish(daiHex)),
  variToken: new Address(Uu.fromHexish(usdcHex)),
}).catch((error) => {
  console.error(error)
})
