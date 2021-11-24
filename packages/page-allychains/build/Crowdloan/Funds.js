// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef } from 'react';
import { MarkWarning, Table } from '@axia-js/react-components';
import { useBestHash, useIsParasLinked } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import Fund from "./Fund.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractLists(value, leasePeriod) {
  const currentPeriod = leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod;
  let active = null;
  let ended = null;
  let allIds = null;

  if (value && currentPeriod) {
    active = value.filter(({
      firstSlot,
      isCapped,
      isEnded,
      isWinner
    }) => !(isCapped || isEnded || isWinner) && currentPeriod.lte(firstSlot));
    ended = value.filter(({
      firstSlot,
      isCapped,
      isEnded,
      isWinner
    }) => isCapped || isEnded || isWinner || currentPeriod.gt(firstSlot));
    allIds = value.map(({
      paraId
    }) => paraId);
  }

  return [active, ended, allIds];
}

function sortList(hasLinksMap, list) {
  return list === null || list === void 0 ? void 0 : list.sort(({
    key: a
  }, {
    key: b
  }) => {
    const aKnown = hasLinksMap[a] || false;
    const bKnown = hasLinksMap[b] || false;
    return aKnown === bKnown ? 0 : aKnown ? -1 : 1;
  });
}

function Funds({
  bestNumber,
  className,
  leasePeriod,
  value
}) {
  const {
    t
  } = useTranslation();
  const bestHash = useBestHash();
  const [active, ended, allIds] = useMemo(() => extractLists(value, leasePeriod), [leasePeriod, value]);
  const hasLinksMap = useIsParasLinked(allIds);
  const [activeSorted, endedSorted] = useMemo(() => [sortList(hasLinksMap, active), sortList(hasLinksMap, ended)], [active, ended, hasLinksMap]);
  const headerActiveRef = useRef([[t('ongoing'), 'start', 2], [undefined, 'media--800'], [undefined, 'media--1400'], [t('ending'), 'media--1200'], [t('leases')], [t('raised')], [t('count'), 'media--1100'], [undefined, 'media--1000']]);
  const headedEndedRef = useRef([[t('completed'), 'start', 2], [undefined, 'media--800'], [undefined, 'media--1400'], [t('ending'), 'media--1200'], [t('leases')], [t('raised')], [t('count'), 'media--1100'], [undefined, 'media--1000']]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(MarkWarning, {
      className: "warning centered",
      content: t('Do not transfer any funds directly to a specific account that is associated with a loan or a team. Use the "Contribute" action to record the contribution on-chain using the crowdloan runtime module. When the fund is dissolved, after either the allychain lease expires or the loan ending without winning, the full value will be returned to your account by the runtime. Funds sent directly to an account, without using the crowdloan functionality, may not be returned by the receiving account.')
    }), /*#__PURE__*/_jsx(Table, {
      className: className,
      empty: value && activeSorted && t('No active campaigns found'),
      header: headerActiveRef.current,
      children: activeSorted === null || activeSorted === void 0 ? void 0 : activeSorted.map(fund => /*#__PURE__*/_jsx(Fund, {
        bestHash: bestHash,
        bestNumber: bestNumber,
        isOngoing: true,
        value: fund
      }, fund.accountId))
    }), /*#__PURE__*/_jsx(Table, {
      className: className,
      empty: value && endedSorted && t('No completed campaigns found'),
      header: headedEndedRef.current,
      children: endedSorted === null || endedSorted === void 0 ? void 0 : endedSorted.map(fund => /*#__PURE__*/_jsx(Fund, {
        bestNumber: bestNumber,
        leasePeriod: leasePeriod,
        value: fund
      }, fund.accountId))
    })]
  });
}

export default /*#__PURE__*/React.memo(Funds);