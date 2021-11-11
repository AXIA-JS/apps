// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { AddressMini, Button, Expander, LinkExternal } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import PreImageButton from "./PreImageButton.js";
import ProposalCell from "./ProposalCell.js";
import Seconding from "./Seconding.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Proposal({
  className = '',
  value: {
    balance,
    image,
    imageHash,
    index,
    proposer,
    seconds
  }
}) {
  const {
    t
  } = useTranslation();
  const seconding = seconds.filter((_address, index) => index !== 0);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(index)
      })
    }), /*#__PURE__*/_jsx(ProposalCell, {
      imageHash: imageHash,
      proposal: image === null || image === void 0 ? void 0 : image.proposal
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressMini, {
        value: proposer
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number together media--1200",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: balance
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "expand",
      children: seconding.length !== 0 && /*#__PURE__*/_jsx(Expander, {
        summary: t('Seconds ({{count}})', {
          replace: {
            count: seconding.length
          }
        }),
        children: seconding.map((address, count) => /*#__PURE__*/_jsx(AddressMini, {
          className: "identityIcon",
          value: address,
          withBalance: false,
          withShrink: true
        }, `${count}:${address.toHex()}`))
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: /*#__PURE__*/_jsxs(Button.Group, {
        children: [!(image !== null && image !== void 0 && image.proposal) && /*#__PURE__*/_jsx(PreImageButton, {
          imageHash: imageHash
        }), /*#__PURE__*/_jsx(Seconding, {
          deposit: balance,
          depositors: seconds || [],
          image: image,
          proposalId: index
        })]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "links media--1000",
      children: /*#__PURE__*/_jsx(LinkExternal, {
        data: index,
        isLogo: true,
        type: "proposal"
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Proposal).withConfig({
  displayName: "Proposal",
  componentId: "sc-91ur01-0"
})([".identityIcon{&:first-child{padding-top:0;}&:last-child{margin-bottom:4px;}}"]));