// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import Suspension from "./Suspension.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const optExtractCandidates = {
  transform: entries => entries.filter(([{
    args: [accountId]
  }, opt]) => opt.isSome && accountId).map(([{
    args: [accountId]
  }, opt]) => {
    const [balance, bid] = opt.unwrap();
    return {
      accountId,
      balance,
      bid
    };
  }).sort((a, b) => a.balance.cmp(b.balance))
};
const optExtractAccounts = {
  transform: keys => keys.map(({
    args: [accountId]
  }) => accountId).filter(a => !!a)
};

function Suspended({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const candidates = useCall(api.query.society.suspendedCandidates.entries, undefined, optExtractCandidates);
  const members = useCall(api.query.society.suspendedMembers.keys, undefined, optExtractAccounts);
  const headerRef = useRef({
    candidates: [[t('candidates'), 'start'], [t('bid kind'), 'start', 2], [t('value')]],
    members: [[t('members'), 'start']]
  });
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Table, {
      className: className,
      empty: members && t('No suspended members'),
      header: headerRef.current.members,
      children: members === null || members === void 0 ? void 0 : members.map(accountId => /*#__PURE__*/_jsx(Suspension, {
        value: accountId
      }, accountId.toString()))
    }), /*#__PURE__*/_jsx(Table, {
      className: className,
      empty: candidates && t('No suspended candidates'),
      header: headerRef.current.candidates,
      children: candidates === null || candidates === void 0 ? void 0 : candidates.map(({
        accountId,
        balance,
        bid
      }) => /*#__PURE__*/_jsx(Suspension, {
        balance: balance,
        bid: bid,
        value: accountId
      }, accountId.toString()))
    })]
  });
}

export default /*#__PURE__*/React.memo(Suspended);