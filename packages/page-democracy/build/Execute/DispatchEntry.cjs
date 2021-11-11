"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _PreImageButton = _interopRequireDefault(require("../Overview/PreImageButton.cjs"));

var _ProposalCell = _interopRequireDefault(require("../Overview/ProposalCell.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function DispatchEntry({
  value: {
    at,
    image,
    imageHash,
    index
  }
}) {
  const bestNumber = (0, _reactHooks.useBestNumber)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(index)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposalCell.default, {
      imageHash: imageHash,
      proposal: image === null || image === void 0 ? void 0 : image.proposal
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: bestNumber && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: at.sub(bestNumber)
        }), "#", (0, _util.formatNumber)(at)]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: !(image !== null && image !== void 0 && image.proposal) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreImageButton.default, {
        imageHash: imageHash,
        isImminent: true
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "links media--1000",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
        data: index,
        isLogo: true,
        type: "referendum"
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(DispatchEntry);

exports.default = _default;