"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "useCounter", {
  enumerable: true,
  get: function () {
    return _useCounter.default;
  }
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _index = _interopRequireDefault(require("./Candidates/index.cjs"));

var _index2 = _interopRequireDefault(require("./Overview/index.cjs"));

var _index3 = _interopRequireDefault(require("./Suspended/index.cjs"));

var _translate = require("./translate.cjs");

var _useCounter = _interopRequireDefault(require("./useCounter.cjs"));

var _useMembers = _interopRequireDefault(require("./useMembers.cjs"));

var _useVoters = _interopRequireDefault(require("./useVoters.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
// head -> founder -> skeptics -> votes -> suspended -> strikes -> strikes -> payouts
function sortMembers(a, b) {
  const isVoterA = a.isCandidateVoter || a.isDefenderVoter;
  return a.isHead !== b.isHead ? a.isHead ? -1 : 1 : a.isFounder !== b.isFounder ? a.isFounder ? -1 : 1 : a.isSkeptic !== b.isSkeptic ? a.isSkeptic ? -1 : 1 : isVoterA !== (b.isCandidateVoter || b.isDefenderVoter) ? isVoterA ? -1 : 1 : a.isSuspended !== b.isSuspended ? a.isSuspended ? -1 : 1 : a.isWarned !== b.isWarned ? a.isWarned ? -1 : 1 : b.strikes.cmp(a.strikes) || b.payouts.length - a.payouts.length;
}

function getMapMembers(members, skeptics, voters, {
  defender,
  founder,
  hasDefender,
  head
}, warnStrikes) {
  const mapMembers = members.filter(member => !hasDefender || !member.accountId.eq(defender)).map(({
    accountId,
    isDefenderVoter,
    isSuspended,
    payouts,
    strikes
  }) => {
    const key = accountId.toString();
    return {
      accountId,
      isCandidateVoter: voters.includes(key),
      isDefenderVoter,
      isFounder: !!(founder !== null && founder !== void 0 && founder.eq(accountId)),
      isHead: !!(head !== null && head !== void 0 && head.eq(accountId)),
      isSkeptic: skeptics.includes(key),
      isSuspended,
      isWarned: !isSuspended && strikes.gt(warnStrikes),
      key,
      payouts,
      strikes
    };
  }).sort(sortMembers);
  return [mapMembers, mapMembers.reduce((total, {
    payouts
  }) => payouts.reduce((total, [, balance]) => total.iadd(balance), total), new _bn.default(0))];
}

function SocietyApp({
  basePath,
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const candidateCount = (0, _useCounter.default)();
  const {
    allMembers,
    isMember,
    ownMembers
  } = (0, _useMembers.default)();
  const info = (0, _reactHooks.useCall)(api.derive.society.info);
  const members = (0, _reactHooks.useCall)(api.derive.society.members);
  const {
    candidates,
    skeptics,
    voters
  } = (0, _useVoters.default)();
  const [mapMembers, payoutTotal] = (0, _react.useMemo)(() => members && info && skeptics && voters ? getMapMembers(members, skeptics, voters, info, api.consts.society.maxStrikes.mul(_util.BN_TWO).div(_util.BN_THREE)) : [undefined, undefined], [api, info, members, skeptics, voters]);
  const items = (0, _react.useMemo)(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    count: candidateCount,
    name: 'candidates',
    text: t('Candidates')
  }, {
    name: 'suspended',
    text: t('Suspended')
  }], [candidateCount, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: items
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/candidates`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
          allMembers: allMembers,
          candidates: candidates,
          isMember: isMember,
          ownMembers: ownMembers
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/suspended`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
          info: info,
          isMember: isMember,
          mapMembers: mapMembers,
          ownMembers: ownMembers,
          payoutTotal: payoutTotal
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SocietyApp);

exports.default = _default;