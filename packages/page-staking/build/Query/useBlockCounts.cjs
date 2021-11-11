"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useBlockCounts;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useBlockCounts(accountId, sessionRewards) {
  var _api$derive$session, _api$query$imOnline;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const indexes = (0, _reactHooks.useCall)((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.indexes);
  const current = (0, _reactHooks.useCall)((_api$query$imOnline = api.query.imOnline) === null || _api$query$imOnline === void 0 ? void 0 : _api$query$imOnline.authoredBlocks, [indexes === null || indexes === void 0 ? void 0 : indexes.currentIndex, accountId]);
  const [counts, setCounts] = (0, _react.useState)([]);
  const [historic, setHistoric] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    var _api$query$imOnline2;

    if ((0, _util.isFunction)((_api$query$imOnline2 = api.query.imOnline) === null || _api$query$imOnline2 === void 0 ? void 0 : _api$query$imOnline2.authoredBlocks) && sessionRewards && sessionRewards.length) {
      const filtered = sessionRewards.filter(({
        sessionIndex
      }) => sessionIndex.gt(_util.BN_ZERO));

      if (filtered.length) {
        Promise.all(filtered.map(({
          parentHash,
          sessionIndex
        }) => api.query.imOnline.authoredBlocks.at(parentHash, sessionIndex.sub(_util.BN_ONE), accountId))).then(historic => {
          mountedRef.current && setHistoric(historic);
        }).catch(console.error);
      }
    }
  }, [accountId, api, mountedRef, sessionRewards]);
  (0, _react.useEffect)(() => {
    setCounts([...historic, current || api.createType('u32')].slice(1));
  }, [api, current, historic]);
  return counts;
}