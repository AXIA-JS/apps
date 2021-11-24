"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSudo = useSudo;

var _react = require("react");

var _useAccounts = require("./useAccounts.cjs");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformSudo = {
  transform: key => key.toString()
};

function useSudo() {
  var _api$query$sudo;

  const {
    api
  } = (0, _useApi.useApi)();
  const {
    allAccounts,
    hasAccounts
  } = (0, _useAccounts.useAccounts)();
  const sudoKey = (0, _useCall.useCall)(hasAccounts && ((_api$query$sudo = api.query.sudo) === null || _api$query$sudo === void 0 ? void 0 : _api$query$sudo.key), undefined, transformSudo);
  const [hasSudoKey, setHasSudoKey] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setHasSudoKey(!!sudoKey && !!allAccounts && allAccounts.some(key => key === sudoKey));
  }, [allAccounts, sudoKey]);
  return {
    allAccounts,
    hasSudoKey,
    sudoKey
  };
}