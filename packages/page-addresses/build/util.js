// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Menu } from '@axia-js/react-components';
import { keyring } from '@axia-js/ui-keyring';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function createMenuGroup(items) {
  const filtered = items.filter(item => !!item);
  return filtered.length ? /*#__PURE__*/_jsxs(_Fragment, {
    children: [filtered, /*#__PURE__*/_jsx(Menu.Divider, {})]
  }) : null;
}

function expandList(mapped, entry) {
  mapped.push(entry);
  entry.children.forEach(entry => {
    expandList(mapped, entry);
  });
  return mapped;
}

export function sortAccounts(addresses, favorites) {
  const mapped = addresses.map(address => keyring.getAccount(address)).filter(account => !!account).map(account => ({
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