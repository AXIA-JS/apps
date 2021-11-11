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

var _Fasttrack = _interopRequireDefault(require("./Fasttrack.cjs"));

var _PreImageButton = _interopRequireDefault(require("./PreImageButton.cjs"));

var _ProposalCell = _interopRequireDefault(require("./ProposalCell.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function External({
  className = '',
  value: {
    image,
    imageHash,
    threshold
  }
}) {
  const {
    isMember,
    members
  } = (0, _reactHooks.useCollectiveMembers)('technicalCommittee');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposalCell.default, {
      imageHash: imageHash,
      proposal: image === null || image === void 0 ? void 0 : image.proposal
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: image && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: image.proposer
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: image && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: image.balance
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
        children: [!(image !== null && image !== void 0 && image.proposal) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreImageButton.default, {
          imageHash: imageHash
        }), threshold && isMember && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Fasttrack.default, {
          imageHash: imageHash,
          members: members,
          threshold: threshold
        })]
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(External);

exports.default = _default;