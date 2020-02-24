import request from 'request-promise'

export interface PredictitPrices {
  buy: number | null,
  sell: number | null
}

export interface PredictitPairPrices {
  yes: PredictitPrices,
  no: PredictitPrices
}

export interface PredictitContract {
  shortName: string,
  pairPrices: PredictitPairPrices
}

export interface PredictitMarket {
  contracts: PredictitContract[]
}

export async function fetchPredictitMarket (id: string): Promise<PredictitMarket> {
  const apiUrl = `https://www.predictit.org/api/marketdata/markets/${id}`
  const responseJson: string = await request(apiUrl)

  const response = JSON.parse(responseJson)

  const predictitMarket: PredictitMarket = {
    contracts: []
  }

  response.contracts.forEach((contract) => {
    predictitMarket.contracts.push({
      shortName: contract.shortName,
      pairPrices: {
        yes: {
          buy: contract.bestBuyYesCost,
          sell: contract.bestSellYesCost
        },
        no: {
          buy: contract.bestBuyNoCost,
          sell: contract.bestSellNoCost
        }
      }
    })
  })

  return predictitMarket
}
