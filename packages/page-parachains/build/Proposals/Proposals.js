// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Proposal from "./Proposal.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Proposals({
  proposals
}) {
  const {
    t
  } = useTranslation();
  const sortedIds = useMemo(() => proposals && proposals.proposalIds.sort((a, b) => a.cmp(b)), [proposals]);
  const headerRef = useRef([[t('proposals'), 'start', 3], [], [], [t('proposer'), 'address'], [t('balance'), 'media--1100'], [t('initial state'), 'start media--1400'], []]);
  return /*#__PURE__*/_jsx(Table, {
    empty: proposals && sortedIds && t('There are no pending proposals'),
    header: headerRef.current,
    children: proposals && (sortedIds === null || sortedIds === void 0 ? void 0 : sortedIds.map(id => /*#__PURE__*/_jsx(Proposal, {
      approvedIds: proposals.approvedIds,
      id: id,
      scheduled: proposals.scheduled
    }, id.toString())))
  });
}

export default /*#__PURE__*/React.memo(Proposals);