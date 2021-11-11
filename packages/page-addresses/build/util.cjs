"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMenuGroup = createMenuGroup;
exports.sortAccounts = sortAccounts;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _uiKeyring = require("@axia-js/ui-keyring");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createMenuGroup(items) {
  const filtered = items.filter(item => !!item);
  return filtered.length ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [filtered, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Divider, {})]
  }) : null;
}

function expandList(mapped, entry) {
  mapped.push(entry);
  entry.children.forEach(entry => {
    expandList(mapped, entry);
  });
  return mapped;
}

function sortAccounts(addresses, favorites) {
  const mapped = addresses.map(address => _uiKeyring.keyring.getAccount(address)).filter(account => !!account).map(account => ({
    account,
    children: [],
    isFavorite: favorites.includes(account.address)
  })).sort((a, b) => (a.account.meta.whenCreated || 0) - (b.account.meta.whenCreated || 0));
  return mapped.filter(entry => {
    const parentAddress = entry.account.meta.parentAddress;

    if (parentAddress) {
      const parent = mapped.find(({
        account: {
          address
        }
      }) => address === parentAddress);

      if (parent) {
        parent.children.push(entry);
        return false;
      }
    }

    return true;
  }).reduce(expandList, []).sort((a, b) => a.isFavorite === b.isFavorite ? 0 : b.isFavorite ? 1 : -1);
}