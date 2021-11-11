// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Candidate from "./Candidate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Candidates({
  allMembers,
  candidates,
  className = '',
  isMember,
  ownMembers
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('candidates'), 'start'], [t('bid kind'), 'start', 2], [t('value')], [undefined, 'expand'], []]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: candidates && t('No candidates'),
    header: headerRef.current,
    children: candidates === null || candidates === void 0 ? void 0 : candidates.map(candidate => /*#__PURE__*/_jsx(Candidate, {
      allMembers: allMembers,
      isMember: isMember,
      ownMembers: ownMembers,
      value: candidate
    }, candidate.accountId.toString()))
  });
}

export default /*#__PURE__*/React.memo(Candidates);