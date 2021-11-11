// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_THREE, BN_TWO } from '@axia-js/util';
import Candidates from "./Candidates/index.js";
import Overview from "./Overview/index.js";
import Suspended from "./Suspended/index.js";
import { useTranslation } from "./translate.js";
import useCounter from "./useCounter.js";
import useMembers from "./useMembers.js";
import useVoters from "./useVoters.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { useCounter }; // head -> founder -> skeptics -> votes -> suspended -> strikes -> strikes -> payouts

function sortMembers(a, b) {
  const isVoterA = a.isCandidateVoter || a.isDefenderVoter;
  return a.isHead !== b.isHead ? a.isHead ? -1 : 1 : a.isFounder !== b.isFounder ? a.isFounder ? -1 : 1 : a.isSkeptic !== b.isSkeptic ? a.isSkeptic ? -1 : 1 : isVoterA !== (b.isCandidateVoter || b.isDefenderVoter) ? isVoterA ? -1 : 1 : a.isSuspended !== b.isSuspended ? a.isSuspended ? -1 : 1 : a.isWarned !== b.isWarned ? a.isWarned ? -1 : 1 : b.strikes.cmp(a.strikes) || b.payouts.length - a.payouts.length;
}

function getMapMembers(members, skeptics, voters, {
  defender,
  founder,
  hasDefender,
  head
}, warnStrikes) {
  const mapMembers = members.filter(member => !hasDefender || !member.accountId.eq(defender)).map(({
    accountId,
    isDefenderVoter,
    isSuspended,
    payouts,
    strikes
  }) => {
    const key = accountId.toString();
    return {
      accountId,
      isCandidateVoter: voters.includes(key),
      isDefenderVoter,
      isFounder: !!(founder !== null && founder !== void 0 && founder.eq(accountId)),
      isHead: !!(head !== null && head !== void 0 && head.eq(accountId)),
      isSkeptic: skeptics.includes(key),
      isSuspended,
      isWarned: !isSuspended && strikes.gt(warnStrikes),
      key,
      payouts,
      strikes
    };
  }).sort(sortMembers);
  return [mapMembers, mapMembers.reduce((total, {
    payouts
  }) => payouts.reduce((total, [, balance]) => total.iadd(balance), total), new BN(0))];
}

function SocietyApp({
  basePath,
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const candidateCount = useCounter();
  const {
    allMembers,
    isMember,
    ownMembers
  } = useMembers();
  const info = useCall(api.derive.society.info);
  const members = useCall(api.derive.society.members);
  const {
    candidates,
    skeptics,
    voters
  } = useVoters();
  const [mapMembers, payoutTotal] = useMemo(() => members && info && skeptics && voters ? getMapMembers(members, skeptics, voters, info, api.consts.society.maxStrikes.mul(BN_TWO).div(BN_THREE)) : [undefined, undefined], [api, info, members, skeptics, voters]);
  const items = useMemo(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    count: candidateCount,
    name: 'candidates',
    text: t('Candidates')
  }, {
    name: 'suspended',
    text: t('Suspended')
  }], [candidateCount, t]);
  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: items
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/candidates`,
        children: /*#__PURE__*/_jsx(Candidates, {
          allMembers: allMembers,
          candidates: candidates,
          isMember: isMember,
          ownMembers: ownMembers
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/suspended`,
        children: /*#__PURE__*/_jsx(Suspended, {})
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Overview, {
          info: info,
          isMember: isMember,
          mapMembers: mapMembers,
          ownMembers: ownMembers,
          payoutTotal: payoutTotal
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(SocietyApp);