"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Asset = _interopRequireDefault(require("./Asset.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Assets({
  className,
  infos
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const headerRef = (0, _react.useRef)([[t('assets'), 'start', 2], [t('owner'), 'address media--1000'], [t('admin'), 'address media--1200'], [t('issuer'), 'address media--1300'], [t('freezer'), 'address media--1400'], [t('supply')], []]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: infos && t('No assets found'),
    header: headerRef.current,
    children: infos === null || infos === void 0 ? void 0 : infos.map(info => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Asset.default, {
      value: info
    }, info.key))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Assets);

exports.default = _default;