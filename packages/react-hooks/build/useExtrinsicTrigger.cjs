"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExtrinsicTrigger = useExtrinsicTrigger;

var _react = require("react");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useExtrinsicTrigger(checks) {
  const {
    api
  } = (0, _useApi.useApi)();
  const [trigger, setTrigger] = (0, _react.useState)('0');
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const block = (0, _useCall.useCall)(api.derive.chain.subscribeNewBlocks);
  (0, _react.useEffect)(() => {
    mountedRef.current && block && block.extrinsics && block.extrinsics.filter(_ref => {
      let {
        extrinsic
      } = _ref;
      return extrinsic && checks.some(c => c && c.is(extrinsic));
    }).length && setTrigger(() => {
      var _block$createdAtHash;

      return ((_block$createdAtHash = block.createdAtHash) === null || _block$createdAtHash === void 0 ? void 0 : _block$createdAtHash.toHex()) || '';
    });
  }, [block, checks, mountedRef]);
  return trigger;
}