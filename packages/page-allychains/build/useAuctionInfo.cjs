"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAuctionInfo;

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optionsMulti = {
  transform: _ref => {
    let [numAuctions, optInfo] = _ref;
    const [leasePeriod, endBlock] = optInfo.unwrapOr([null, null]);
    return {
      endBlock,
      leasePeriod,
      numAuctions
    };
  }
};

function useAuctionInfo() {
  var _api$query$auctions, _api$query$auctions2;

  const {
    api
  } = (0, _reactHooks.useApi)();
  return (0, _reactHooks.useCallMulti)([(_api$query$auctions = api.query.auctions) === null || _api$query$auctions === void 0 ? void 0 : _api$query$auctions.auctionCounter, (_api$query$auctions2 = api.query.auctions) === null || _api$query$auctions2 === void 0 ? void 0 : _api$query$auctions2.auctionInfo], optionsMulti);
}