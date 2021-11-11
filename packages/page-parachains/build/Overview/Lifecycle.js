// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { SessionToTime } from '@axia-js/react-query';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Lifecycle({
  lifecycle,
  nextAction
}) {
  return lifecycle && /*#__PURE__*/_jsxs(_Fragment, {
    children: [lifecycle.toString(), nextAction && /*#__PURE__*/_jsx(SessionToTime, {
      value: nextAction.sessionIndex
    })]
  });
}

export default /*#__PURE__*/React.memo(Lifecycle);