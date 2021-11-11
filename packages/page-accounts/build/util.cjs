"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMenuGroup = createMenuGroup;
exports.downloadAccount = downloadAccount;
exports.tryCreateAccount = tryCreateAccount;
exports.sortAccounts = sortAccounts;
exports.sortCategory = void 0;

var _fileSaver = _interopRequireDefault(require("file-saver"));

var _react = _interopRequireDefault(require("react"));

var _util = require("@axia-js/react-api/util");

var _reactComponents = require("@axia-js/react-components");

var _util2 = require("@axia-js/react-components/util");

var _util3 = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createMenuGroup(key, items, header) {
  const filtered = items.filter(item => !!item);
  return filtered.length ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Divider, {}), header ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Header, {
      children: header
    }) : null, filtered]
  }, key) : null;
}

function downloadAccount({
  json,
  pair
}) {
  _fileSaver.default.saveAs(new Blob([JSON.stringify(json)], {
    type: 'application/json; charset=utf-8'
  }), `${pair.address}.json`);
}

function tryCreateAccount(commitAccount, success) {
  const status = {
    action: 'create',
    message: success,
    status: 'success'
  };

  try {
    const result = commitAccount();
    const address = result.pair.address;
    status.account = address;

    if ((0, _util.getEnvironment)() === 'web') {
      downloadAccount(result);
    }

    downloadAccount(result);

    _reactComponents.InputAddress.setLastValue('account', address);
  } catch (error) {
    status.status = 'error';
    status.message = error.message;
  }

  return status;
}

const sortCategory = ['parent', 'name', 'date', 'balances', 'type'];
exports.sortCategory = sortCategory;

const comparator = (accounts, balances, category, fromMax) => {
  function accountQualifiedName(account) {
    if (account) {
      var _account$account;

      const parent = ((_account$account = account.account) === null || _account$account === void 0 ? void 0 : _account$account.meta.parentAddress) || '';
      return accountQualifiedName(accounts[parent]) + account.address;
    } else {
      return '';
    }
  }

  function make(getValue, compare) {
    const mult = fromMax ? 1 : -1;
    return (a, b) => mult * compare(getValue(a), getValue(b));
  }

  switch (category) {
    case 'parent':
      // We need to ensure that parent will be adjacent to its children
      // so we use format '...<grand-parent-addr><parent-addr><account-addr>'
      return make(accountQualifiedName, (a, b) => a.localeCompare(b));

    case 'name':
      return make(acc => {
        var _getAddressMeta$name;

        return (_getAddressMeta$name = (0, _util2.getAddressMeta)(acc.address).name) !== null && _getAddressMeta$name !== void 0 ? _getAddressMeta$name : '';
      }, (a, b) => a.localeCompare(b));

    case 'date':
      return make(acc => {
        var _acc$account$meta$whe, _acc$account;

        return (_acc$account$meta$whe = (_acc$account = acc.account) === null || _acc$account === void 0 ? void 0 : _acc$account.meta.whenCreated) !== null && _acc$account$meta$whe !== void 0 ? _acc$account$meta$whe : 0;
      }, (a, b) => a - b);

    case 'balances':
      return make(acc => {
        var _balances$acc$address, _balances$acc$address2;

        return (_balances$acc$address = (_balances$acc$address2 = balances[acc.address]) === null || _balances$acc$address2 === void 0 ? void 0 : _balances$acc$address2.total) !== null && _balances$acc$address !== void 0 ? _balances$acc$address : _util3.BN_ZERO;
      }, (a, b) => a.cmp(b));

    case 'type':
      return make(acc => (0, _util2.getAccountCryptoType)(acc.address), (a, b) => a.localeCompare(b));
  }
};

function sortAccounts(accountsList, accountsMap, balances, by, fromMax) {
  return [...accountsList].sort(comparator(accountsMap, balances, by, fromMax)).sort((a, b) => a.isFavorite === b.isFavorite ? 0 : b.isFavorite ? 1 : -1);
}