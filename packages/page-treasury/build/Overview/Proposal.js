// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressMini, AddressSmall, LinkExternal } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Council from "./Council.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ProposalDisplay({
  className = '',
  isMember,
  members,
  proposal: {
    council,
    id,
    proposal
  },
  withSend
}) {
  const {
    t
  } = useTranslation();
  const hasProposals = useMemo(() => !!council.map(({
    votes
  }) => votes ? votes.index.toNumber() : -1).filter(index => index !== -1).length, [council]);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(id)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address all",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: proposal.proposer
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressMini, {
        value: proposal.beneficiary
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: proposal.value
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: proposal.bond
      })
    }), /*#__PURE__*/_jsx("td", {
      className: hasProposals ? 'middle' : 'button',
      children: hasProposals ? /*#__PURE__*/_jsx("a", {
        href: "#/council/motions",
        children: t('Voting')
      }) : withSend && /*#__PURE__*/_jsx(Council, {
        id: id,
        isDisabled: !isMember,
        members: members
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "links",
      children: /*#__PURE__*/_jsx(LinkExternal, {
        data: id,
        isLogo: true,
        type: "treasury"
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(ProposalDisplay);