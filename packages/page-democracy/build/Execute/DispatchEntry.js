// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { LinkExternal } from '@axia-js/react-components';
import { useBestNumber } from '@axia-js/react-hooks';
import { BlockToTime } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import PreImageButton from "../Overview/PreImageButton.js";
import ProposalCell from "../Overview/ProposalCell.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function DispatchEntry({
  value: {
    at,
    image,
    imageHash,
    index
  }
}) {
  const bestNumber = useBestNumber();
  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(index)
      })
    }), /*#__PURE__*/_jsx(ProposalCell, {
      imageHash: imageHash,
      proposal: image === null || image === void 0 ? void 0 : image.proposal
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: bestNumber && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(BlockToTime, {
          value: at.sub(bestNumber)
        }), "#", formatNumber(at)]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: !(image !== null && image !== void 0 && image.proposal) && /*#__PURE__*/_jsx(PreImageButton, {
        imageHash: imageHash,
        isImminent: true
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "links media--1000",
      children: /*#__PURE__*/_jsx(LinkExternal, {
        data: index,
        isLogo: true,
        type: "referendum"
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(DispatchEntry);