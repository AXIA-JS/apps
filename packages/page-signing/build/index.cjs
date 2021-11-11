"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _Hash = _interopRequireDefault(require("./Hash.cjs"));

var _Sign = _interopRequireDefault(require("./Sign.cjs"));

var _translate = require("./translate.cjs");

var _Verify = _interopRequireDefault(require("./Verify.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SigningApp({
  basePath
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'sign',
    text: t('Sign message')
  }, {
    name: 'verify',
    text: t('Verify signature')
  }, {
    name: 'hash',
    text: t('Hash data')
  }]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: "toolbox--App",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/hash`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Hash.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/verify`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Verify.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sign.default, {})
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SigningApp);

exports.default = _default;