"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _Suspension = _interopRequireDefault(require("./Suspension.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optExtractCandidates = {
  transform: entries => entries.filter(_ref => {
    let [{
      args: [accountId]
    }, opt] = _ref;
    return opt.isSome && accountId;
  }).map(_ref2 => {
    let [{
      args: [accountId]
    }, opt] = _ref2;
    const [balance, bid] = opt.unwrap();
    return {
      accountId,
      balance,
      bid
    };
  }).sort((a, b) => a.balance.cmp(b.balance))
};
const optExtractAccounts = {
  transform: keys => keys.map(_ref3 => {
    let {
      args: [accountId]
    } = _ref3;
    return accountId;
  }).filter(a => !!a)
};

function Suspended(_ref4) {
  let {
    className
  } = _ref4;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const candidates = (0, _reactHooks.useCall)(api.query.society.suspendedCandidates.entries, undefined, optExtractCandidates);
  const members = (0, _reactHooks.useCall)(api.query.society.suspendedMembers.keys, undefined, optExtractAccounts);
  const headerRef = (0, _react.useRef)({
    candidates: [[t('candidates'), 'start'], [t('bid kind'), 'start', 2], [t('value')]],
    members: [[t('members'), 'start']]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      className: className,
      empty: members && t('No suspended members'),
      header: headerRef.current.members,
      children: members === null || members === void 0 ? void 0 : members.map(accountId => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Suspension.default, {
        value: accountId
      }, accountId.toString()))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      className: className,
      empty: candidates && t('No suspended candidates'),
      header: headerRef.current.candidates,
      children: candidates === null || candidates === void 0 ? void 0 : candidates.map(_ref5 => {
        let {
          accountId,
          balance,
          bid
        } = _ref5;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Suspension.default, {
          balance: balance,
          bid: bid,
          value: accountId
        }, accountId.toString());
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Suspended);

exports.default = _default;