"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtrinsicsApp = ExtrinsicsApp;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _Decoder = _interopRequireDefault(require("./Decoder.cjs"));

var _Submission = _interopRequireDefault(require("./Submission.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ExtrinsicsApp({
  basePath
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'create',
    text: t('Submission')
  }, {
    name: 'decode',
    text: t('Decode')
  }]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: "extrinsics--App",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/decode`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Decoder.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Submission.default, {})
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ExtrinsicsApp);

exports.default = _default;