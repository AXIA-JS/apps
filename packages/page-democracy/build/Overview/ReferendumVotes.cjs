"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _ReferendumVote = _interopRequireDefault(require("./ReferendumVote.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const LOCKS = [1, 10, 20, 30, 40, 50, 60];

function ReferendumVotes(_ref) {
  let {
    change,
    className,
    count,
    isAye,
    isWinning,
    total,
    votes
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const sorted = (0, _react.useMemo)(() => votes.sort((a, b) => {
    const ta = a.balance.muln(LOCKS[a.vote.conviction.toNumber()]).div(_util.BN_TEN);
    const tb = b.balance.muln(LOCKS[b.vote.conviction.toNumber()]).div(_util.BN_TEN);
    return tb.cmp(ta);
  }), [votes]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
    className: className,
    help: change.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: change
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: isWinning ? t('The amount this total can be reduced by to change the referendum outcome. This assumes changes to the convictions of the existing votes, with no additional turnout.') : t('The amount this total should be increased by to change the referendum outcome. This assumes additional turnout with new votes at 1x conviction.')
      })]
    }),
    helpIcon: isWinning ? 'arrow-circle-down' : 'arrow-circle-up',
    summary: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [isAye ? t('Aye {{count}}', {
        replace: {
          count: count ? ` (${(0, _util.formatNumber)(count)})` : ''
        }
      }) : t('Nay {{count}}', {
        replace: {
          count: count ? ` (${(0, _util.formatNumber)(count)})` : ''
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: total
        })
      })]
    }),
    children: sorted.map(vote => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ReferendumVote.default, {
      vote: vote
    }, vote.accountId.toString()))
  });
}

var _default = /*#__PURE__*/_react.default.memo(ReferendumVotes);

exports.default = _default;