"use strict";
exports.__esModule = true;
var pollenium_toadflax_1 = require("pollenium-toadflax");
var provider_1 = require("./provider");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
exports.daiReader = new pollenium_toadflax_1.TokenReader({
    provider: provider_1.provider,
    address: pollenium_xanthoceras_1.dai
});
