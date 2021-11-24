// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useApi, useCallMulti } from '@axia-js/react-hooks';
const optionsMulti = {
  transform: ([numAuctions, optInfo]) => {
    const [leasePeriod, endBlock] = optInfo.unwrapOr([null, null]);
    return {
      endBlock,
      leasePeriod,
      numAuctions
    };
  }
};
export default function useAuctionInfo() {
  var _api$query$auctions, _api$query$auctions2;

  const {
    api
  } = useApi();
  return useCallMulti([(_api$query$auctions = api.query.auctions) === null || _api$query$auctions === void 0 ? void 0 : _api$query$auctions.auctionCounter, (_api$query$auctions2 = api.query.auctions) === null || _api$query$auctions2 === void 0 ? void 0 : _api$query$auctions2.auctionInfo], optionsMulti);
}