// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Summary({
  className = '',
  members,
  proposalHashes,
  type
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const proposalCount = useCall(api.derive[type].proposalCount);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    className: className,
    children: [/*#__PURE__*/_jsx(CardSummary, {
      label: t('members'),
      children: formatNumber(members.length)
    }), proposalCount && /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('proposals'),
        children: formatNumber(proposalHashes === null || proposalHashes === void 0 ? void 0 : proposalHashes.length)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('total'),
        children: formatNumber(proposalCount)
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);