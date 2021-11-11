// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { BlockToTime } from '@axia-js/react-query';
import { BN_ONE, bnToBn } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";

function LeaseBlocks({
  children,
  className,
  leasePeriod,
  value
}) {
  const blocks = useMemo(() => leasePeriod && value && bnToBn(value).sub(BN_ONE).imul(leasePeriod.length).iadd(leasePeriod.remainder), [leasePeriod, value]);

  if (!leasePeriod || !blocks) {
    return null;
  }

  return /*#__PURE__*/_jsx(BlockToTime, {
    className: className,
    value: blocks,
    children: children
  });
}

export default /*#__PURE__*/React.memo(LeaseBlocks);