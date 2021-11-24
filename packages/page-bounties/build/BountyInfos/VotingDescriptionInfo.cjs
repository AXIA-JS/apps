"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _extendedStatuses = require("../helpers/extendedStatuses.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function VotingDescriptionInfo(_ref) {
  let {
    className,
    proposal,
    status
  } = _ref;
  const bestProposalName = (0, _extendedStatuses.proposalNameToDisplay)(proposal, status);
  const {
    t
  } = (0, _translate.useTranslation)();
  const votingDescriptions = (0, _react.useRef)({
    approveBounty: t('Bounty approval under voting'),
    closeBounty: t('Bounty rejection under voting'),
    proposeCurator: t('Curator proposal under voting'),
    slashCurator: t('Curator slash under voting'),
    unassignCurator: t('Unassign curator under voting')
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    "data-testid": "voting-description",
    children: bestProposalName && votingDescriptions.current[bestProposalName] && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LabelHelp, {
      help: votingDescriptions.current[bestProposalName]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(VotingDescriptionInfo).withConfig({
  displayName: "VotingDescriptionInfo",
  componentId: "sc-12vpfdd-0"
})(["margin-left:0.2rem;"]));

exports.default = _default;