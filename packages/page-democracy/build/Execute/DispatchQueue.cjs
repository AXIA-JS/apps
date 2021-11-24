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

var _DispatchEntry = _interopRequireDefault(require("./DispatchEntry.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function DispatchQueue(_ref) {
  let {
    className
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const queued = (0, _reactHooks.useCall)(api.derive.democracy.dispatchQueue);
  const filtered = (0, _react.useMemo)(() => bestNumber && queued && queued.filter(_ref2 => {
    let {
      at
    } = _ref2;
    return at.gte(bestNumber);
  }), [bestNumber, queued]);
  const headerRef = (0, _react.useRef)([[t('dispatch queue'), 'start', 2], [t('enact')], [], [undefined, 'media--1000']]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: filtered && t('Nothing queued for execution'),
    header: headerRef.current,
    children: filtered === null || filtered === void 0 ? void 0 : filtered.map(entry => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DispatchEntry.default, {
      value: entry
    }, entry.index.toString()))
  });
}

var _default = /*#__PURE__*/_react.default.memo(DispatchQueue);

exports.default = _default;