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

var _DefenderVoting = _interopRequireDefault(require("./DefenderVoting.cjs"));

var _Votes = _interopRequireDefault(require("./Votes.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformVotes = {
  transform: members => members.filter(({
    vote
  }) => !!vote).map(({
    accountId,
    vote
  }) => [accountId.toString(), vote])
};

function Defender({
  className = '',
  info,
  isMember,
  ownMembers
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const votes = (0, _reactHooks.useCall)(api.derive.society.members, undefined, transformVotes);
  const headerRef = (0, _react.useRef)([[t('defender'), 'start'], [undefined, 'expand'], []]);

  if (!info || !info.hasDefender || !info.defender) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    header: headerRef.current,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "address all",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
          value: info.defender
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Votes.default, {
        votes: votes
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "button",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DefenderVoting.default, {
          isMember: isMember,
          ownMembers: ownMembers
        })
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Defender);

exports.default = _default;