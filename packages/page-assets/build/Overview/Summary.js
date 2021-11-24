// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Summary({
  className,
  numAssets
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsx(SummaryBox, {
    className: className,
    children: /*#__PURE__*/_jsx(CardSummary, {
      label: t('assets'),
      children: formatNumber(numAssets)
    })
  });
}

export default /*#__PURE__*/React.memo(Summary);