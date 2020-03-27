"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pollenium_bellflower_1 = require("pollenium-bellflower");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var pollenium_ilex_1 = require("pollenium-ilex");
var pollenium_anemone_1 = require("pollenium-anemone");
var params_1 = require("./lib/params");
var fetchPredictitMarket_1 = require("./lib/fetchPredictitMarket");
var fetchBopPair_1 = require("./lib/fetchBopPair");
var provider_1 = require("./lib/provider");
var dai_1 = require("./lib/dai");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
var e18 = new pollenium_buttercup_1.Uint256(10).opPow(18);
var keypair = pollenium_ilex_1.Keypair.generate();
var client = new pollenium_anemone_1.Client(params_1.clientStruct);
var bellflower = new pollenium_bellflower_1.Bellflower(provider_1.provider);
var engineReader = new pollenium_alchemilla_1.EngineReader({
    provider: provider_1.provider,
    address: pollenium_xanthoceras_1.engine
});
var predictitMarket = null;
var bopPair = null;
var orderSalt = null;
function usdToDai(usd) {
    var usc = Math.round(usd * 100);
    return e18.opMul(usc).opDiv(100);
}
engineReader.fetchOrderSalt().then(function (_orderSalt) {
    orderSalt = _orderSalt;
});
bellflower.blockSnowdrop.addHandle(function (block) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, step, yesBuyUsd, yesSellUsd, noBuyUsd, noSellUsd, orderStructs, i, orderStruct, order, signedOrder, ligma, missiveGenerator, missive;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('block', block.number.toNumberString(10));
                if (orderSalt === null) {
                    console.log('no order salt');
                    return [2 /*return*/];
                }
                if (predictitMarket === null) {
                    console.log('no predictitMarket');
                    return [2 /*return*/];
                }
                if (bopPair === null) {
                    console.log('no bops');
                    return [2 /*return*/];
                }
                contract = predictitMarket.contracts.find(function (contract) {
                    return contract.shortName === 'Trump';
                });
                step = 0;
                _a.label = 1;
            case 1:
                if (!(step < 5)) return [3 /*break*/, 6];
                yesBuyUsd = contract.pairPrices.yes.buy - (.01 * step);
                yesSellUsd = contract.pairPrices.yes.sell + (.01 * step);
                noBuyUsd = contract.pairPrices.no.buy - (.01 * step);
                noSellUsd = contract.pairPrices.no.sell + (.01 * step);
                orderStructs = [
                    {
                        salt: orderSalt,
                        direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                        expiration: block.number.opAdd(2),
                        quotToken: dai_1.dai,
                        variToken: bopPair.agree,
                        priceNumer: usdToDai(yesBuyUsd),
                        priceDenom: 1,
                        tokenLimit: e18
                    },
                    {
                        salt: orderSalt,
                        direction: pollenium_alchemilla_1.OrderDirection.BUYY,
                        expiration: block.number.opAdd(2),
                        quotToken: dai_1.dai,
                        variToken: bopPair.disagree,
                        priceNumer: usdToDai(noBuyUsd),
                        priceDenom: 1,
                        tokenLimit: e18
                    },
                    {
                        salt: orderSalt,
                        direction: pollenium_alchemilla_1.OrderDirection.SELL,
                        expiration: block.number.opAdd(2),
                        quotToken: dai_1.dai,
                        variToken: bopPair.agree,
                        priceNumer: usdToDai(yesSellUsd),
                        priceDenom: 1,
                        tokenLimit: 1
                    },
                    {
                        salt: orderSalt,
                        direction: pollenium_alchemilla_1.OrderDirection.SELL,
                        expiration: block.number.opAdd(2),
                        quotToken: dai_1.dai,
                        variToken: bopPair.disagree,
                        priceNumer: usdToDai(noSellUsd),
                        priceDenom: 1,
                        tokenLimit: 1
                    }
                ];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < orderStructs.length)) return [3 /*break*/, 5];
                orderStruct = orderStructs[i];
                order = new pollenium_alchemilla_1.Order(orderStruct);
                signedOrder = new pollenium_alchemilla_1.SignedOrder({
                    order: order,
                    signature: keypair.getSignature(order.getSugmaHash())
                });
                ligma = signedOrder.getLigma();
                missiveGenerator = new pollenium_anemone_1.MissiveGenerator({
                    applicationId: params_1.applicationId,
                    applicationData: ligma,
                    difficulty: 1,
                    ttl: 30,
                    hashcashWorkerUrl: require.resolve('pollenium-anemone/node/src/hashcash-worker.js')
                });
                return [4 /*yield*/, missiveGenerator.fetchMissive()];
            case 3:
                missive = _a.sent();
                console.log('broadcast');
                client.broadcastMissive(missive);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                step++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); });
function setPredictitMarket() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchPredictitMarket_1.fetchPredictitMarket('3698')];
                case 1:
                    predictitMarket = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    predictitMarket = null;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
fetchBopPair_1.fetchBopPair(pollenium_xanthoceras_1.overseers.trump2020).then(function (_bopPair) {
    bopPair = _bopPair;
});
setPredictitMarket();
setInterval(setPredictitMarket, 10000);
setInterval(function () {
    var connectedFriendshipsCount = client.getSummary().struct.partySummary.getFriendshipsCountByStatus(pollenium_anemone_1.FRIENDSHIP_STATUS.CONNECTED);
    console.log('connected friendships:', connectedFriendshipsCount);
}, 1000);
