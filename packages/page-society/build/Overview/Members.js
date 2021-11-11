// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useBestNumber } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import Member from "./Member.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Members({
  className = '',
  mapMembers
}) {
  const {
    t
  } = useTranslation();
  const bestNumber = useBestNumber();
  const headerRef = useRef([[t('members'), 'start', 3], [t('voted on'), 'start'], [t('strikes')], []]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: mapMembers && t('No active members'),
    header: headerRef.current,
    children: mapMembers === null || mapMembers === void 0 ? void 0 : mapMembers.map(value => /*#__PURE__*/_jsx(Member, {
      bestNumber: bestNumber,
      value: value
    }, value.key))
  });
}

export default /*#__PURE__*/React.memo(Members);