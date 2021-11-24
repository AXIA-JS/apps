// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Proposal from "./Proposal.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ProposalsBase({
  className = '',
  isApprovals,
  isMember,
  members,
  proposals
}) {
  const {
    t
  } = useTranslation();
  const header = useMemo(() => [[isApprovals ? t('Approved') : t('Proposals'), 'start', 2], [t('beneficiary'), 'address'], [t('payment')], [t('bond')], [], []], [isApprovals, t]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: proposals && (isApprovals ? t('No approved proposals') : t('No pending proposals')),
    header: header,
    children: proposals === null || proposals === void 0 ? void 0 : proposals.map(proposal => /*#__PURE__*/_jsx(Proposal, {
      isMember: isMember,
      members: members,
      proposal: proposal,
      withSend: !isApprovals
    }, proposal.id.toString()))
  });
}

export default /*#__PURE__*/React.memo(ProposalsBase);