"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWeight = useWeight;

var _react = require("react");

var _util = require("@axia-js/util");

var _useApi = require("./useApi.cjs");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// a random address that we are using for our queries
const ZERO_ACCOUNT = '5CAUdnwecHGxxyr5vABevAfZ34Fi4AaraDRMwfDQXQ52PXqg';
const EMPTY_STATE = [_util.BN_ZERO, 0]; // for a given call, calculate the weight

function useWeight(call) {
  const {
    api
  } = (0, _useApi.useApi)();
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [state, setState] = (0, _react.useState)(EMPTY_STATE);
  (0, _react.useEffect)(() => {
    var _api$rpc$payment;

    if (call && (0, _util.isFunction)((_api$rpc$payment = api.rpc.payment) === null || _api$rpc$payment === void 0 ? void 0 : _api$rpc$payment.queryInfo)) {
      api.tx(call).paymentInfo(ZERO_ACCOUNT).then(({
        weight
      }) => mountedRef.current && setState([weight, call.encodedLength])).catch(console.error);
    } else {
      setState(EMPTY_STATE);
    }
  }, [api, call, mountedRef]);
  return state;
}