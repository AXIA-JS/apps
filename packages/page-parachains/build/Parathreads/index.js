// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useCall, useIsParasLinked } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import Actions from "./Actions.js";
import Parathread from "./Parathread.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractParaMap(hasLinksMap, paraIds, leases) {
  return paraIds.reduce((all, id, index) => {
    all.push([id, leases[index].map((optLease, period) => {
      if (optLease.isNone) {
        return null;
      }

      const [accountId, balance] = optLease.unwrap();
      return {
        accountId,
        balance,
        period
      };
    }).filter(item => !!item)]);
    return all;
  }, []).sort(([aId, aLeases], [bId, bLeases]) => {
    const aKnown = hasLinksMap[aId.toString()] || false;
    const bKnown = hasLinksMap[bId.toString()] || false;
    return aLeases.length && bLeases.length ? aLeases[0].period - bLeases[0].period || aId.cmp(bId) : aLeases.length ? -1 : bLeases.length ? 1 : aKnown === bKnown ? aId.cmp(bId) : aKnown ? -1 : 1;
  });
}

function Parathreads({
  actionsQueue,
  className,
  ids,
  leasePeriod,
  ownedIds
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const hasLinksMap = useIsParasLinked(ids);
  const leaseMap = useCall(ids && api.query.slots.leases.multi, [ids], {
    transform: useCallback(([[paraIds], leases]) => extractParaMap(hasLinksMap, paraIds, leases), [hasLinksMap]),
    withParamsTransform: true
  });
  const headerRef = useRef([[t('parathreads'), 'start', 2], ['', 'media--1100'], [t('head'), 'start media--1500'], [t('lifecycle'), 'start'], [], [], // [t('chain'), 'no-pad-left'],
  [t('leases')], ['', 'media--900']]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Actions, {
      ownedIds: ownedIds
    }), /*#__PURE__*/_jsx(Table, {
      empty: leasePeriod && ids && (ids.length === 0 || leaseMap) && t('There are no available parathreads'),
      header: headerRef.current,
      children: leasePeriod && (leaseMap === null || leaseMap === void 0 ? void 0 : leaseMap.map(([id, leases]) => /*#__PURE__*/_jsx(Parathread, {
        id: id,
        leasePeriod: leasePeriod,
        leases: leases,
        nextAction: actionsQueue.find(({
          paraIds
        }) => paraIds.some(p => p.eq(id)))
      }, id.toString())))
    })]
  });
}

export default /*#__PURE__*/React.memo(Parathreads);