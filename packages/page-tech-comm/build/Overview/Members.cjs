"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Members({
  className = '',
  members,
  prime
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const headerRef = (0, _react.useRef)([[t('members'), 'start', 3]]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: members && t('No members found'),
    header: headerRef.current,
    children: members === null || members === void 0 ? void 0 : members.map(accountId => /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "address",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
          value: accountId
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: (prime === null || prime === void 0 ? void 0 : prime.eq(accountId)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
          color: "green",
          hover: t('Committee prime member, default voting'),
          label: t('prime member')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "all",
        children: "\xA0"
      })]
    }, accountId.toString()))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Members);

exports.default = _default;