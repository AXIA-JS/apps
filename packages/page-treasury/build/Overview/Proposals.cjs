"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Proposal = _interopRequireDefault(require("./Proposal.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ProposalsBase(_ref) {
  let {
    className = '',
    isApprovals,
    isMember,
    members,
    proposals
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const header = (0, _react.useMemo)(() => [[isApprovals ? t('Approved') : t('Proposals'), 'start', 2], [t('beneficiary'), 'address'], [t('payment')], [t('bond')], [], []], [isApprovals, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: proposals && (isApprovals ? t('No approved proposals') : t('No pending proposals')),
    header: header,
    children: proposals === null || proposals === void 0 ? void 0 : proposals.map(proposal => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Proposal.default, {
      isMember: isMember,
      members: members,
      proposal: proposal,
      withSend: !isApprovals
    }, proposal.id.toString()))
  });
}

var _default = /*#__PURE__*/_react.default.memo(ProposalsBase);

exports.default = _default;