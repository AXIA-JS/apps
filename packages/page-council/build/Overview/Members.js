// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Candidate from "./Candidate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Members({
  allVotes = {},
  className = '',
  electionsInfo,
  hasElections,
  prime
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('members'), 'start', 2], [hasElections ? t('backing') : undefined, 'expand'], [hasElections ? t('votes') : undefined]]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: electionsInfo && t('No members found'),
    header: headerRef.current,
    children: electionsInfo === null || electionsInfo === void 0 ? void 0 : electionsInfo.members.map(([accountId, balance]) => /*#__PURE__*/_jsx(Candidate, {
      address: accountId,
      balance: balance,
      isPrime: prime === null || prime === void 0 ? void 0 : prime.eq(accountId),
      voters: allVotes[accountId.toString()]
    }, accountId.toString()))
  });
}

export default /*#__PURE__*/React.memo(Members);