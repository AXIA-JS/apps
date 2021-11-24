"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _BlockToTime = _interopRequireDefault(require("./BlockToTime.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SessionToTime(_ref) {
  let {
    children,
    className,
    isInline,
    label,
    value
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const sessionInfo = (0, _reactHooks.useCall)(api.derive.session.progress);
  const blocks = (0, _react.useMemo)(() => sessionInfo && value && sessionInfo.currentIndex.lt(value) ? value.sub(sessionInfo.currentIndex).imul(sessionInfo.sessionLength).isub(sessionInfo.sessionProgress) : _util.BN_ZERO, [sessionInfo, value]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BlockToTime.default, {
    className: className,
    isInline: isInline,
    label: label,
    value: blocks,
    children: children
  });
}

var _default = /*#__PURE__*/_react.default.memo(SessionToTime);

exports.default = _default;