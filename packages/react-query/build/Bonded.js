// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import FormatBalance from "./FormatBalance.js";
import { jsx as _jsx } from "react/jsx-runtime";
const transformController = {
  transform: value => value.unwrapOr(null)
};
const transformLedger = {
  transform: value => value.unwrapOr(null)
};

function BondedDisplay({
  children,
  className = '',
  label,
  params
}) {
  var _api$query$staking, _api$query$staking2;

  const {
    api
  } = useApi();
  const controllerId = useCall((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.bonded, [params], transformController);
  const stakingLedger = useCall(controllerId && ((_api$query$staking2 = api.query.staking) === null || _api$query$staking2 === void 0 ? void 0 : _api$query$staking2.ledger), [controllerId], transformLedger);
  return /*#__PURE__*/_jsx(FormatBalance, {
    className: className,
    label: label,
    value: stakingLedger === null || stakingLedger === void 0 ? void 0 : stakingLedger.active,
    children: children
  });
}

export default /*#__PURE__*/React.memo(BondedDisplay);