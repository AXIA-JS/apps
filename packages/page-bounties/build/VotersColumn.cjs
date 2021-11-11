"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _extendedStatuses = require("./helpers/extendedStatuses.cjs");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
const icons = {
  ayes: 'check',
  nays: 'times'
};

function VotersColumn({
  className,
  option,
  proposals,
  status
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const proposal = (0, _react.useMemo)(() => (0, _extendedStatuses.getProposalToDisplay)(proposals, status), [proposals, status]);
  const votes = (0, _react.useMemo)(() => {
    var _proposal$votes, _proposal$votes2;

    return option === 'ayes' ? proposal === null || proposal === void 0 ? void 0 : (_proposal$votes = proposal.votes) === null || _proposal$votes === void 0 ? void 0 : _proposal$votes.ayes : proposal === null || proposal === void 0 ? void 0 : (_proposal$votes2 = proposal.votes) === null || _proposal$votes2 === void 0 ? void 0 : _proposal$votes2.nays;
  }, [proposal, option]);
  const voters = (0, _react.useMemo)(() => votes === null || votes === void 0 ? void 0 : votes.map(accountId => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "voter",
    "data-testid": `voters_${option}_${accountId.toString()}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
      value: accountId
    })
  }, accountId.toString())), [option, votes]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: proposal && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "vote-numbers",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "vote-numbers-icon",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
            icon: icons[option]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: "vote-numbers-label",
          children: [option === 'ayes' && t('Aye: {{count}}', {
            replace: {
              count: votes ? votes.length : 0
            }
          }), option === 'nays' && t('Nay: {{count}}', {
            replace: {
              count: votes ? votes.length : 0
            }
          })]
        })]
      }), voters]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(VotersColumn).withConfig({
  displayName: "VotersColumn",
  componentId: "sc-j2kfgn-0"
})(["width:50%;.vote-numbers{display:flex;align-items:center;margin-bottom:0.85rem;}.vote-numbers-icon svg{max-width:10px;color:var(--color-label);}.vote-numbers-label{margin-left:0.75rem;font-weight:bold;font-size:0.7rem;line-height:0.85rem;text-transform:uppercase;color:var(--color-label);}"]));

exports.default = _default;