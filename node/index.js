"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var ethers_1 = require("ethers");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_orchid_1 = require("pollenium-orchid");
var pollenium_ilex_1 = require("pollenium-ilex");
var pollenium_anemone_1 = require("pollenium-anemone");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var infuraId = 'd2f248c0dbf64edc9a11447262bfe239';
var daiHex = '6B175474E89094C44Da98b954EedeAC495271d0F';
var usdcHex = 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
var keypair = pollenium_ilex_1.Keypair.generate();
var applicationId = pollenium_uvaursi_1.Uu.fromUtf8('alchemilla.orders.v0').genPaddedLeft(32);
var client = new pollenium_anemone_1.Client(__assign(__assign({}, pollenium_anemone_1.clientDefaults), { signalingServerUrls: [
        ' wss://begonia-us-1.herokuapp.com',
        ' wss://begonia-us-1.herokuapp.com'
    ] }));
function run(struct) {
    return __awaiter(this, void 0, void 0, function () {
        var infuraId, quotToken, variToken, provider, bellflower;
        var _this = this;
        return __generator(this, function (_a) {
            infuraId = struct.infuraId, quotToken = struct.quotToken, variToken = struct.variToken;
            provider = new ethers_1.ethers.providers.InfuraProvider('homestead', infuraId);
            bellflower = new pollenium_bellflower_1.Bellflower(provider);
            bellflower.blockSnowdrop.addHandle(function (block) { return __awaiter(_this, void 0, void 0, function () {
                var orderStruct, order, signedOrder, ligma, missiveGenerator, missive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            orderStruct = {
                                type: pollenium_orchid_1.ORDER_TYPE.BUYY,
                                prevBlockHash: block.hash,
                                quotToken: quotToken,
                                variToken: variToken,
                                priceNumer: pollenium_buttercup_1.Uint256.fromNumber(1),
                                priceDenom: pollenium_buttercup_1.Uint256.fromNumber(1),
                                tokenLimit: pollenium_buttercup_1.Uint256.fromNumber(1)
                            };
                            order = new pollenium_orchid_1.Order(orderStruct);
                            signedOrder = new pollenium_orchid_1.SignedOrder(order, keypair.getSignature(order.getSugmaHash()));
                            ligma = signedOrder.getLigma();
                            missiveGenerator = new pollenium_anemone_1.MissiveGenerator({
                                applicationId: applicationId,
                                applicationData: ligma,
                                difficulty: 1,
                                ttl: 30,
                                hashcashWorkerUrl: require.resolve('pollenium-anemone/node/src/hashcash-worker.js')
                            });
                            return [4 /*yield*/, missiveGenerator.fetchMissive()];
                        case 1:
                            missive = _a.sent();
                            client.broadcastMissive(missive);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.run = run;
run({
    infuraId: infuraId,
    quotToken: new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.fromHexish(daiHex)),
    variToken: new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.fromHexish(usdcHex))
})["catch"](function (error) {
    console.error(error);
});
