"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMembers;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_MEMBERS = {
  allMembers: [],
  isMember: false,
  ownMembers: []
};

function transform(allAccounts, members) {
  const allMembers = members.filter(_ref => {
    let {
      isSuspended
    } = _ref;
    return !isSuspended;
  }).map(_ref2 => {
    let {
      accountId
    } = _ref2;
    return accountId.toString();
  });
  const ownMembers = allMembers.filter(a => allAccounts.includes(a));
  return {
    allMembers,
    isMember: ownMembers.length !== 0,
    ownMembers
  };
}

function useMembers() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const [state, setState] = (0, _react.useState)(EMPTY_MEMBERS);
  const members = (0, _reactHooks.useCall)(api.derive.society.members);
  (0, _react.useEffect)(() => {
    allAccounts && members && setState(transform(allAccounts, members));
  }, [allAccounts, members]);
  return state;
}