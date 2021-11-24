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

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Proposals(_ref) {
  let {
    proposals
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const sortedIds = (0, _react.useMemo)(() => proposals && proposals.proposalIds.sort((a, b) => a.cmp(b)), [proposals]);
  const headerRef = (0, _react.useRef)([[t('proposals'), 'start', 3], [], [], [t('proposer'), 'address'], [t('balance'), 'media--1100'], [t('initial state'), 'start media--1400'], []]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    empty: proposals && sortedIds && t('There are no pending proposals'),
    header: headerRef.current,
    children: proposals && (sortedIds === null || sortedIds === void 0 ? void 0 : sortedIds.map(id => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Proposal.default, {
      approvedIds: proposals.approvedIds,
      id: id,
      scheduled: proposals.scheduled
    }, id.toString())))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Proposals);

exports.default = _default;