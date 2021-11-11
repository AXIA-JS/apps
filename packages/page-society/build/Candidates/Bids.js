// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import BidRow from "./Bid.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Bids({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bids = useCall(api.query.society.bids);
  const headerRef = useRef([[t('bids'), 'start'], [t('bid kind'), 'start', 2], [t('value')], []]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: bids && t('No bids'),
    header: headerRef.current,
    children: bids === null || bids === void 0 ? void 0 : bids.map((bid, index) => /*#__PURE__*/_jsx(BidRow, {
      index: index,
      value: bid
    }, bid.who.toString()))
  });
}

export default /*#__PURE__*/React.memo(Bids);