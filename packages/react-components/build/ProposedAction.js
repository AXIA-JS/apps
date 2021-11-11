import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { formatNumber, isString } from '@axia-js/util';
import Call from "./Call.js";
import Expander from "./Expander.js";
import { useTranslation } from "./translate.js";
import TreasuryProposal from "./TreasuryProposal.js";
import { isTreasuryProposalVote } from "./util/index.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function ProposedAction({
  className = '',
  expandNested,
  idNumber,
  proposal,
  withLinks
}) {
  const {
    t
  } = useTranslation();
  const stringId = isString(idNumber) ? idNumber : formatNumber(idNumber);

  if (!proposal) {
    return /*#__PURE__*/_jsxs("h3", {
      children: ["#", stringId, "\xA0", t('No execution details available for this proposal')]
    });
  }

  const {
    meta,
    method,
    section
  } = proposal.registry.findMetaCall(proposal.callIndex);
  const header = `#${stringId}: ${section}.${method}`;
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--ProposedAction ${className}`,
    children: [/*#__PURE__*/_jsx("h3", {
      children: header
    }), /*#__PURE__*/_jsx(Expander, {
      summaryMeta: meta,
      children: isTreasuryProposalVote(proposal) && expandNested ? /*#__PURE__*/_jsx(TreasuryProposal, {
        asInset: withLinks,
        insetProps: _objectSpread({
          withBottomMargin: true,
          withTopMargin: true
        }, withLinks ? {
          href: '/treasury'
        } : {}),
        proposalId: proposal.args[0].toString()
      }) : /*#__PURE__*/_jsx(Call, {
        value: proposal
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(ProposedAction).withConfig({
  displayName: "ProposedAction",
  componentId: "sc-x2hu0e-0"
})(["margin-left:2rem;.ui--ProposedAction-extrinsic{.ui--Params-Content{padding-left:0;}}.ui--ProposedAction-header{margin-bottom:1rem;}"]));