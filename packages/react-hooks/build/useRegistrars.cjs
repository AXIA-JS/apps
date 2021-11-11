"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRegistrars = useRegistrars;

var _react = require("react");

var _useAccounts = require("./useAccounts.cjs");

var _useApi = require("./useApi.cjs");

var _useCall = require("./useCall.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useRegistrars(skipQuery) {
  var _api$query$identity;

  const {
    api
  } = (0, _useApi.useApi)();
  const {
    allAccounts,
    hasAccounts
  } = (0, _useAccounts.useAccounts)();
  const query = (0, _useCall.useCall)(!skipQuery && hasAccounts && ((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.registrars)); // determine if we have a registrar or not - registrars are allowed to approve

  return (0, _react.useMemo)(() => {
    const registrars = (query || []).map((registrar, index) => ({
      address: registrar.isSome ? registrar.unwrap().account.toString() : null,
      index
    })).filter(registrar => !!registrar.address);
    return {
      isRegistrar: registrars.some(({
        address
      }) => allAccounts.includes(address)),
      registrars
    };
  }, [allAccounts, query]);
}