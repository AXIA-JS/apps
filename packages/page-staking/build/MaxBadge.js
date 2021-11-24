// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Badge } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { jsx as _jsx } from "react/jsx-runtime";

function MaxBadge({
  numNominators
}) {
  var _api$consts$staking;

  const {
    api
  } = useApi();
  const max = (_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : _api$consts$staking.maxNominatorRewardedPerValidator;

  if (!numNominators || !max || max.gten(numNominators)) {
    return null;
  }

  return /*#__PURE__*/_jsx(Badge, {
    color: "red",
    icon: "balance-scale-right"
  });
}

export default /*#__PURE__*/React.memo(MaxBadge);