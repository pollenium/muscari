import { Client, MissiveGenerator, clientDefaults, FRIENDSHIP_STATUS } from 'pollenium-anemone'
import { Uu } from 'pollenium-uvaursi'
import { applicationId, clientStruct } from '../params'
import { SignedOrder } from 'pollenium-orchid'

const client = new Client(clientStruct)

client.missiveSnowdrop.addHandle((missive) => {
  console.log('missive')
  console.log(missive.applicationId.uu.toUtf8())
  if(!missive.applicationId.uu.getIsEqual(applicationId)) {
    return
  }
  const signedOrder = SignedOrder.fromLigma(Uu.wrap(missive.applicationData))
  console.log('=========')
  console.log(signedOrder.quotToken.uu.toHex())
  console.log(signedOrder.variToken.uu.toHex())
  console.log(signedOrder.priceNumer.toNumber())
  console.log(signedOrder.priceDenom.toNumber())
  console.log(signedOrder.tokenLimit.toNumber())

})

setInterval(() => {
  const connectedFriendshipsCount = client.getSummary().struct.partySummary.getFriendshipsCountByStatus(FRIENDSHIP_STATUS.CONNECTED)
  console.log('connected friendships:', connectedFriendshipsCount)
}, 1000)
