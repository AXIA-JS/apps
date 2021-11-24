// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown, Table } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Account from "./Account.js";
import useBalances from "./useBalances.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Balances({
  className,
  infos = []
}) {
  const {
    t
  } = useTranslation();
  const [infoIndex, setInfoIndex] = useState(0);
  const [info, setInfo] = useState(null);
  const balances = useBalances(info === null || info === void 0 ? void 0 : info.id);
  const headerRef = useRef([[t('accounts'), 'start'], [t('frozen'), 'start'], [t('sufficient'), 'start'], [], []]);
  const completeInfos = useMemo(() => infos.filter(i => !!(i.details && i.metadata) && !i.details.supply.isZero()).sort((a, b) => a.id.cmp(b.id)), [infos]);
  const assetOptions = useMemo(() => completeInfos.map(({
    id,
    metadata
  }, index) => ({
    text: `${metadata.name.toUtf8()} (${formatNumber(id)})`,
    value: index
  })), [completeInfos]);
  const siFormat = useMemo(() => info ? [info.metadata.decimals.toNumber(), info.metadata.symbol.toUtf8().toUpperCase()] : [0, 'NONE'], [info]);
  useEffect(() => {
    setInfo(() => infoIndex >= 0 && infoIndex < completeInfos.length ? completeInfos[infoIndex] : null);
  }, [completeInfos, infoIndex]);
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Table, {
      empty: info && balances && t('No accounts with balances found for the asset'),
      filter: assetOptions.length ? /*#__PURE__*/_jsx(Dropdown, {
        isFull: true,
        label: t('the asset to query for balances'),
        onChange: setInfoIndex,
        options: assetOptions,
        value: infoIndex
      }) : undefined,
      header: headerRef.current,
      children: info && (balances === null || balances === void 0 ? void 0 : balances.map(({
        accountId,
        balance
      }) => /*#__PURE__*/_jsx(Account, {
        accountId: accountId,
        assetId: info.id,
        balance: balance,
        minBalance: info.details.minBalance,
        siFormat: siFormat
      }, accountId)))
    })
  });
}

export default /*#__PURE__*/React.memo(Balances);