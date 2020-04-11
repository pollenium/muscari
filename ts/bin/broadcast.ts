import { Bellflower, Block } from 'pollenium-bellflower'
import { Address, Uint256, Bytes32 } from 'pollenium-buttercup'
import { Order, SignedOrder, OrderDirection, OrderStruct, EngineReader } from 'pollenium-alchemilla'
import { Keypair } from 'pollenium-ilex'
import { Client, MissiveGenerator, clientDefaults, FRIENDSHIP_STATUS } from 'pollenium-anemone'
import { Uu } from 'pollenium-uvaursi'
import { applicationId, clientStruct } from './lib/params'
import delay from 'delay'
import { fetchPredictitMarket, PredictitMarket } from './lib/fetchPredictitMarket'
import { fetchBopPair, BopPair } from './lib/fetchBopPair'
import { provider } from './lib/provider'
import { makerKeypair } from './lib/maker'
import { engine, overseers, dai } from 'pollenium-xanthoceras'
import { engineReader } from './lib/engineReader'
import ethers from 'ethers'

const e18 = new Uint256(10).opPow(18)
const uint256Max = new Uint256(Uu.genFill({ length: 32, fill: 255 }))

const client = new Client(clientStruct)

const bellflower = new Bellflower(provider)


let predictitMarket: PredictitMarket | null = null
let bopPair: BopPair | null = null
let orderSalt: Bytes32 | null = null


engineReader.fetchOrderSalt().then((_orderSalt) => {
  orderSalt = _orderSalt
})

bellflower.blockSnowdrop.addHandle(async (block) => {
  console.log('block', block.number.toNumberString(10))

  if (orderSalt === null) {
    console.log('no order salt')
    return
  }

  if (predictitMarket === null) {
    console.log('no predictitMarket')
    return
  }

  if (bopPair === null) {
    console.log('no bops')
    return
  }

  const contract = predictitMarket.contracts.find((contract) => {
    return contract.shortName === 'Trump'
  })

  for (let step = 0; step < 5; step ++) {

    const yesBuyUsd = contract.pairPrices.yes.buy - (.01 * step)
    const yesSellUsd = contract.pairPrices.yes.sell + (.01 * step)

    const noBuyUsd = contract.pairPrices.no.buy - (.01 * step)
    const noSellUsd = contract.pairPrices.no.sell + (.01 * step)

    const orderStructs: Array<OrderStruct> = [
      {
        salt: orderSalt,
        direction: OrderDirection.BUYY,
        expiration: block.number.opAdd(2),
        quotToken: dai,
        variToken: bopPair.agree,
        priceNumer: usdToDai(yesBuyUsd),
        priceDenom: 1,
        tokenLimit: e18
      },
      {
        salt: orderSalt,
        direction: OrderDirection.BUYY,
        expiration: block.number.opAdd(2),
        quotToken: dai,
        variToken: bopPair.disagree,
        priceNumer: usdToDai(noBuyUsd),
        priceDenom: 1,
        tokenLimit: e18
      },
      {
        salt: orderSalt,
        direction: OrderDirection.SELL,
        expiration: block.number.opAdd(2),
        quotToken: dai,
        variToken: bopPair.agree,
        priceNumer: usdToDai(yesSellUsd),
        priceDenom: 1,
        tokenLimit: 1
      },
      {
        salt: orderSalt,
        direction: OrderDirection.SELL,
        expiration: block.number.opAdd(2),
        quotToken: dai,
        variToken: bopPair.disagree,
        priceNumer: usdToDai(noSellUsd),
        priceDenom: 1,
        tokenLimit: 1
      }
    ]

    for (let i = 0; i < orderStructs.length; i++) {
      const orderStruct = orderStructs[i]
      const order = new Order(orderStruct)

      const signedOrder = new SignedOrder({
        order,
        signature: makerKeypair.getSignature(order.getSugmaHash())
      })

      const ligma = signedOrder.getLigma()

      const missiveGenerator = new MissiveGenerator({
        applicationId,
        applicationData: ligma,
        difficulty: 1,
        ttl: 30,
        hashcashWorkerUrl: require.resolve('pollenium-anemone/node/src/hashcash-worker.js')
      })

      const missive = await missiveGenerator.fetchMissive()
      console.log('broadcast')
      client.broadcastMissive(missive)

    }
  }

})

async function setPredictitMarket() {
  try {
    predictitMarket = await fetchPredictitMarket('3698')
  } catch {
    predictitMarket = null
  }
}

function usdToDai(usd: number): Uint256 {
  const usc = Math.round(usd * 100)
  return e18.opMul(usc).opDiv(100)
}

fetchBopPair(overseers.trump2020).then((_bopPair) => {
  bopPair = _bopPair
})

setPredictitMarket()
setInterval(setPredictitMarket, 10000)

setInterval(() => {
  const connectedFriendshipsCount = client.getSummary().struct.partySummary.getFriendshipsCountByStatus(FRIENDSHIP_STATUS.CONNECTED)
  console.log('connected friendships:', connectedFriendshipsCount)
}, 1000)
