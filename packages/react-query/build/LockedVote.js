// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import FormatBalance from "./FormatBalance.js";
import { jsx as _jsx } from "react/jsx-runtime";

function LockedVote({
  children,
  className = '',
  label,
  params
}) {
  const {
    api
  } = useApi();
  const info = useCall(api.derive.council.votesOf, [params]);

  if (!(info !== null && info !== void 0 && info.stake.gtn(0))) {
    return null;
  }

  return /*#__PURE__*/_jsx(FormatBalance, {
    className: className,
    label: label,
    value: info === null || info === void 0 ? void 0 : info.stake,
    children: children
  });
}

export default /*#__PURE__*/React.memo(LockedVote);