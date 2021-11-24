// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Candidate from "./Candidate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Candidates({
  allVotes = {},
  electionsInfo
}) {
  const {
    t
  } = useTranslation();
  const headerCandidatesRef = useRef([[t('candidates'), 'start', 2], [], []]);
  const headerRunnersRef = useRef([[t('runners up'), 'start', 2], [t('backing'), 'expand'], [t('votes')]]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Table, {
      empty: electionsInfo && t('No runners up found'),
      header: headerRunnersRef.current,
      children: electionsInfo === null || electionsInfo === void 0 ? void 0 : electionsInfo.runnersUp.map(([accountId, balance]) => /*#__PURE__*/_jsx(Candidate, {
        address: accountId,
        balance: balance,
        voters: allVotes[accountId.toString()]
      }, accountId.toString()))
    }), /*#__PURE__*/_jsx(Table, {
      empty: electionsInfo && t('No candidates found'),
      header: headerCandidatesRef.current,
      children: electionsInfo === null || electionsInfo === void 0 ? void 0 : electionsInfo.candidates.map(accountId => /*#__PURE__*/_jsx(Candidate, {
        address: accountId,
        voters: allVotes[accountId.toString()]
      }, accountId.toString()))
    })]
  });
}

export default /*#__PURE__*/React.memo(Candidates);