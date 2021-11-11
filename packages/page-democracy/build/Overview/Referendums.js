// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Referendum from "./Referendum.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Referendums({
  className = '',
  referendums
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('referenda'), 'start', 2], [t('remaining'), 'media--1200'], [t('activate'), 'media--1400'], [t('turnout'), 'media--1400'], [undefined, 'badge'], [t('votes'), 'expand'], [undefined, undefined, 2], [undefined, 'media--1000']]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: referendums && t('No active referendums'),
    header: headerRef.current,
    children: referendums === null || referendums === void 0 ? void 0 : referendums.map(referendum => /*#__PURE__*/_jsx(Referendum, {
      value: referendum
    }, referendum.index.toString()))
  });
}

export default /*#__PURE__*/React.memo(Referendums);