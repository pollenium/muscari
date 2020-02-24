import { Uu } from 'pollenium-uvaursi'
import { clientDefaults } from 'pollenium-anemone'

export const applicationId = Uu.fromUtf8('alchemilla.orders.v0').genPaddedLeft(32)

export const clientStruct = {
  ...clientDefaults,
  signalingServerUrls: [
    'wss://begonia-us-1.herokuapp.com',
    'wss://begonia-us-1.herokuapp.com'
  ],
  sdpTimeout: 20,
  connectionTimeout: 20
}
