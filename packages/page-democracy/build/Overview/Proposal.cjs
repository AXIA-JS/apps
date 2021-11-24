"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _PreImageButton = _interopRequireDefault(require("./PreImageButton.cjs"));

var _ProposalCell = _interopRequireDefault(require("./ProposalCell.cjs"));

var _Seconding = _interopRequireDefault(require("./Seconding.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Proposal(_ref) {
  let {
    className = '',
    value: {
      balance,
      image,
      imageHash,
      index,
      proposer,
      seconds
    }
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const seconding = seconds.filter((_address, index) => index !== 0);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(index)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposalCell.default, {
      imageHash: imageHash,
      proposal: image === null || image === void 0 ? void 0 : image.proposal
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: proposer
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together media--1200",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: balance
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "expand",
      children: seconding.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        summary: t('Seconds ({{count}})', {
          replace: {
            count: seconding.length
          }
        }),
        children: seconding.map((address, count) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
          className: "identityIcon",
          value: address,
          withBalance: false,
          withShrink: true
        }, `${count}:${address.toHex()}`))
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
        children: [!(image !== null && image !== void 0 && image.proposal) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreImageButton.default, {
          imageHash: imageHash
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Seconding.default, {
          deposit: balance,
          depositors: seconds || [],
          image: image,
          proposalId: index
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "links media--1000",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
        data: index,
        isLogo: true,
        type: "proposal"
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Proposal).withConfig({
  displayName: "Proposal",
  componentId: "sc-cc9hac-0"
})([".identityIcon{&:first-child{padding-top:0;}&:last-child{margin-bottom:4px;}}"]));

exports.default = _default;