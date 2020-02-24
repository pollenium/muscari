import { fetchPredictitMarket } from '../bin/lib/fetchPredictitMarket'

async function run() {
  const predictitMarket = await fetchPredictitMarket('3698')
  console.log(JSON.stringify(predictitMarket, null, 2))
}

run()
