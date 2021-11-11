// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressSmall, ParaLink, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useCallMulti } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import Lifecycle from "../Overview/Lifecycle.js"; // import ParachainInfo from '../Overview/ParachainInfo';

import Periods from "../Overview/Periods.js";
import { useTranslation } from "../translate.js";
import { sliceHex } from "../util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const optMulti = {
  defaultValue: {
    headHex: null,
    lifecycle: null,
    manager: null
  },
  transform: ([optHead, optGenesis, optLifecycle, optInfo]) => ({
    headHex: optHead.isSome ? sliceHex(optHead.unwrap()) : optGenesis.isSome ? sliceHex(optGenesis.unwrap().genesisHead) : null,
    lifecycle: optLifecycle.unwrapOr(null),
    manager: optInfo.isSome ? optInfo.unwrap().manager : null
  })
};

function Upcoming({
  id,
  leasePeriod,
  leases,
  nextAction
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    isAccount
  } = useAccounts();
  const {
    headHex,
    lifecycle,
    manager
  } = useCallMulti([[api.query.paras.heads, id], [api.query.paras.upcomingParasGenesis, id], [api.query.paras.paraLifecycles, id], [api.query.registrar.paras, id]], optMulti);
  const periods = useMemo(() => (leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod) && leases && leases.map(({
    period
  }) => period), [leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod, leases]);
  const isManager = isAccount(manager === null || manager === void 0 ? void 0 : manager.toString());
  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(id)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "badge",
      children: /*#__PURE__*/_jsx(ParaLink, {
        id: id
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address media--1100",
      children: manager && /*#__PURE__*/_jsx(AddressSmall, {
        value: manager
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "start together hash media--1500",
      children: headHex
    }), /*#__PURE__*/_jsx("td", {
      className: "start",
      children: /*#__PURE__*/_jsx(Lifecycle, {
        lifecycle: lifecycle,
        nextAction: nextAction
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "all"
    }), /*#__PURE__*/_jsx("td", {
      className: "number no-pad-left"
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: leasePeriod && leases && periods && (leases.length ? /*#__PURE__*/_jsx(Periods, {
        fromFirst: true,
        leasePeriod: leasePeriod,
        periods: periods
      }) : t('None'))
    }), /*#__PURE__*/_jsx("td", {
      className: "button media--900",
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: manager,
        icon: "times",
        isDisabled: !isManager,
        label: t('Deregister'),
        params: [id],
        tx: api.tx.registrar.deregister
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Upcoming);