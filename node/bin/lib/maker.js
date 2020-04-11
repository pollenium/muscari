"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_ilex_1 = require("pollenium-ilex");
var ethers_1 = require("ethers");
var provider_1 = require("./provider");
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var pollenium_toadflax_1 = require("pollenium-toadflax");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1["default"].config();
exports.makerPrivateKey = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.fromHexish(process.env.PRIVATE_KEY_HEX));
exports.makerKeypair = new pollenium_ilex_1.Keypair(exports.makerPrivateKey);
exports.maker = exports.makerKeypair.getAddress();
exports.makerSigner = new ethers_1.ethers.Wallet(exports.makerPrivateKey.u, provider_1.provider);
exports.makerEngineWriter = new pollenium_alchemilla_1.EngineWriter({
    signer: exports.makerSigner,
    address: pollenium_xanthoceras_1.engine
});
exports.makerDaiWriter = new pollenium_toadflax_1.TokenWriter({
    signer: exports.makerSigner,
    address: pollenium_xanthoceras_1.dai
});
