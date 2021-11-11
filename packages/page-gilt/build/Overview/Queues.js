// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Queue from "./Queue.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Queues({
  className,
  queueTotals
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('queues'), 'start'], [t('participants'), 'number'], [t('balance'), 'number']]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: queueTotals && t('No active gilt queues found.'),
    header: headerRef.current,
    children: queueTotals === null || queueTotals === void 0 ? void 0 : queueTotals.map(value => /*#__PURE__*/_jsx(Queue, {
      value: value
    }, value.index))
  });
}

export default /*#__PURE__*/React.memo(Queues);