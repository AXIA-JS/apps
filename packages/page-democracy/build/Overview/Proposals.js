// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import ProposalDisplay from "./Proposal.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Proposals({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const proposals = useCall(api.derive.democracy.proposals);
  const headerRef = useRef([[t('proposals'), 'start', 2], [t('proposer'), 'address'], [t('locked'), 'media--1200'], [undefined, undefined, 2], [undefined, 'media--1000']]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: proposals && t('No active proposals'),
    header: headerRef.current,
    children: proposals === null || proposals === void 0 ? void 0 : proposals.map(proposal => /*#__PURE__*/_jsx(ProposalDisplay, {
      value: proposal
    }, proposal.index.toString()))
  });
}

export default /*#__PURE__*/React.memo(Proposals);