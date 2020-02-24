export interface PredictitPrices {
    buy: number | null;
    sell: number | null;
}
export interface PredictitPairPrices {
    yes: PredictitPrices;
    no: PredictitPrices;
}
export interface PredictitContract {
    shortName: string;
    pairPrices: PredictitPairPrices;
}
export interface PredictitMarket {
    contracts: PredictitContract[];
}
export declare function fetchPredictitMarket(id: string): Promise<PredictitMarket>;
