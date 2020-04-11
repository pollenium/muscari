"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var privateKey_1 = require("./privateKey");
var provider_1 = require("./provider");
exports.signer = new ethers_1.ethers.Wallet(privateKey_1.privateKey.u, provider_1.provider);
