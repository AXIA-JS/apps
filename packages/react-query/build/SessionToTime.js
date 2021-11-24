// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import BlockToTime from "./BlockToTime.js";
import { jsx as _jsx } from "react/jsx-runtime";

function SessionToTime({
  children,
  className,
  isInline,
  label,
  value
}) {
  const {
    api
  } = useApi();
  const sessionInfo = useCall(api.derive.session.progress);
  const blocks = useMemo(() => sessionInfo && value && sessionInfo.currentIndex.lt(value) ? value.sub(sessionInfo.currentIndex).imul(sessionInfo.sessionLength).isub(sessionInfo.sessionProgress) : BN_ZERO, [sessionInfo, value]);
  return /*#__PURE__*/_jsx(BlockToTime, {
    className: className,
    isInline: isInline,
    label: label,
    value: blocks,
    children: children
  });
}

export default /*#__PURE__*/React.memo(SessionToTime);