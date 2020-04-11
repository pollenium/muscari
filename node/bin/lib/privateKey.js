"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1["default"].config();
exports.privateKey = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.fromHexish(process.env.PRIVATE_KEY_HEX));
