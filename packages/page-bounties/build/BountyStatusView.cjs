"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _index = require("./helpers/index.cjs");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BountyStatusView({
  bountyStatus,
  className = ''
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const statusHelpMessages = (0, _react.useRef)({
    Active: t('This bounty has received approval and is currently being implemented.'),
    Approved: t('This bounty was approved by the council. When the next spend period starts, it will be funded.'),
    CuratorProposed: t('Curator has been proposed by council. The bounty is waiting for curator to accept the role.'),
    Funded: t('This bounty is funded.'),
    PendingPayout: t('This bounty was completed and the beneficiary was rewarded by the curator. Claiming the payout will be possible after the delay period is over.'),
    Proposed: t('After a bounty was proposed the council decides whether to fund it or not.')
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    "data-testid": 'bountyStatus',
    children: [(0, _index.insertSpaceBeforeCapitalLetter)(bountyStatus), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LabelHelp, {
      help: statusHelpMessages.current[bountyStatus]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(BountyStatusView).withConfig({
  displayName: "BountyStatusView",
  componentId: "sc-z0r7sb-0"
})(["display:flex;align-items:center;"]));

exports.default = _default;