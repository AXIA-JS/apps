// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CallExpander } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import ExternalCell from "./ExternalCell.js";
import TreasuryCell from "./TreasuryCell.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const METHOD_EXTE = ['externalPropose', 'externalProposeDefault', 'externalProposeMajority'];
const METHOD_TREA = ['approveProposal', 'rejectProposal'];

function ProposalCell({
  className = '',
  imageHash,
  proposal
}) {
  const {
    t
  } = useTranslation();

  if (!proposal) {
    const textHash = imageHash.toString();
    return /*#__PURE__*/_jsx("td", {
      className: `${className} all`,
      children: t('preimage {{hash}}', {
        replace: {
          hash: `${textHash.slice(0, 8)}…${textHash.slice(-8)}`
        }
      })
    });
  }

  const {
    method,
    section
  } = proposal.registry.findMetaCall(proposal.callIndex);
  const isTreasury = section === 'treasury' && METHOD_TREA.includes(method);
  const isExternal = section === 'democracy' && METHOD_EXTE.includes(method);
  return /*#__PURE__*/_jsx("td", {
    className: `${className} all`,
    children: /*#__PURE__*/_jsxs(CallExpander, {
      labelHash: t('proposal hash'),
      value: proposal,
      withHash: !isTreasury && !isExternal,
      children: [isExternal && /*#__PURE__*/_jsx(ExternalCell, {
        value: proposal.args[0]
      }), isTreasury && /*#__PURE__*/_jsx(TreasuryCell, {
        value: proposal.args[0]
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(ProposalCell);