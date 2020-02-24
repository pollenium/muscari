"use strict";
exports.__esModule = true;
var pollenium_anemone_1 = require("pollenium-anemone");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var params_1 = require("../bin/lib/params");
var pollenium_orchid_1 = require("pollenium-orchid");
var client = new pollenium_anemone_1.Client(params_1.clientStruct);
client.missiveSnowdrop.addHandle(function (missive) {
    console.log('missive');
    console.log(missive.applicationId.uu.toUtf8());
    if (!missive.applicationId.uu.getIsEqual(params_1.applicationId)) {
        return;
    }
    var signedOrder = pollenium_orchid_1.SignedOrder.fromLigma(pollenium_uvaursi_1.Uu.wrap(missive.applicationData));
    console.log('=========');
    console.log(signedOrder.quotToken.uu.toHex());
    console.log(signedOrder.variToken.uu.toHex());
    console.log(signedOrder.priceNumer.toNumber());
    console.log(signedOrder.priceDenom.toNumber());
    console.log(signedOrder.tokenLimit.toNumber());
});
setInterval(function () {
    var connectedFriendshipsCount = client.getSummary().struct.partySummary.getFriendshipsCountByStatus(pollenium_anemone_1.FRIENDSHIP_STATUS.CONNECTED);
    console.log('connected friendships:', connectedFriendshipsCount);
}, 1000);
