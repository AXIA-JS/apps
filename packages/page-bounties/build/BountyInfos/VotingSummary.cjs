"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _VotingDescriptionInfo = _interopRequireDefault(require("@axia-js/app-bounties/BountyInfos/VotingDescriptionInfo"));

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _VotingLink = _interopRequireDefault(require("./VotingLink.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function VotingSummary(_ref) {
  let {
    className,
    proposal,
    status
  } = _ref;
  const {
    members
  } = (0, _reactHooks.useCollectiveMembers)('council');
  const {
    t
  } = (0, _translate.useTranslation)();
  const ayes = (0, _react.useMemo)(() => {
    var _proposal$votes, _proposal$votes$ayes;

    return proposal === null || proposal === void 0 ? void 0 : (_proposal$votes = proposal.votes) === null || _proposal$votes === void 0 ? void 0 : (_proposal$votes$ayes = _proposal$votes.ayes) === null || _proposal$votes$ayes === void 0 ? void 0 : _proposal$votes$ayes.length;
  }, [proposal]);
  const nays = (0, _react.useMemo)(() => {
    var _proposal$votes2, _proposal$votes2$nays;

    return proposal === null || proposal === void 0 ? void 0 : (_proposal$votes2 = proposal.votes) === null || _proposal$votes2 === void 0 ? void 0 : (_proposal$votes2$nays = _proposal$votes2.nays) === null || _proposal$votes2$nays === void 0 ? void 0 : _proposal$votes2$nays.length;
  }, [proposal]);
  const threshold = (0, _react.useMemo)(() => {
    var _proposal$votes3;

    return proposal === null || proposal === void 0 ? void 0 : (_proposal$votes3 = proposal.votes) === null || _proposal$votes3 === void 0 ? void 0 : _proposal$votes3.threshold.toNumber();
  }, [proposal]);
  const nayThreshold = (0, _react.useMemo)(() => members !== null && members !== void 0 && members.length && threshold ? members.length - threshold + 1 : 0, [members, threshold]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: proposal && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      "data-testid": "voting-summary",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "voting-summary-text",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Aye')
        }), " ", /*#__PURE__*/(0, _jsxRuntime.jsxs)("b", {
          children: [ayes, "/", threshold]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "voting-summary-text",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: t('Nay')
        }), " ", /*#__PURE__*/(0, _jsxRuntime.jsxs)("b", {
          children: [nays, "/", nayThreshold]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "link-info",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_VotingLink.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_VotingDescriptionInfo.default, {
          proposal: proposal,
          status: status
        })]
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(VotingSummary).withConfig({
  displayName: "VotingSummary",
  componentId: "sc-llfdbw-0"
})([".voting-summary-text{font-size:0.85rem;line-height:1.5rem;color:var(--color-label);span{min-width:0.5rem;margin-right:0.5rem;}}.link-info{display:flex;justify-content:space-between;align-items:center;line-height:1.5rem;}"]));

exports.default = _default;