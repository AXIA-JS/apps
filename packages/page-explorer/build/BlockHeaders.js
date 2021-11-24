// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import BlockHeader from "./BlockHeader.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function BlockHeaders({
  headers
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('recent blocks'), 'start', 3]]);
  return /*#__PURE__*/_jsx(Table, {
    empty: t('No blocks available'),
    header: headerRef.current,
    children: headers.filter(header => !!header).map(header => /*#__PURE__*/_jsx(BlockHeader, {
      value: header
    }, header.number.toString()))
  });
}

export default /*#__PURE__*/React.memo(BlockHeaders);