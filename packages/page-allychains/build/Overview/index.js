// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Allychains from "./Allychains.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Overview({
  actionsQueue,
  className,
  leasePeriod,
  paraIds,
  proposals,
  threadIds
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      leasePeriod: leasePeriod,
      allychainCount: paraIds === null || paraIds === void 0 ? void 0 : paraIds.length,
      proposalCount: proposals === null || proposals === void 0 ? void 0 : proposals.proposalIds.length,
      upcomingCount: threadIds === null || threadIds === void 0 ? void 0 : threadIds.length
    }), /*#__PURE__*/_jsx(Allychains, {
      actionsQueue: actionsQueue,
      ids: paraIds,
      leasePeriod: leasePeriod,
      scheduled: proposals === null || proposals === void 0 ? void 0 : proposals.scheduled
    })]
  });
}

export default /*#__PURE__*/React.memo(Overview);