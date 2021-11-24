"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "useCounter", {
  enumerable: true,
  get: function () {
    return _useCounter2.default;
  }
});

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _useCounter = _interopRequireDefault(require("./Execute/useCounter.cjs"));

var _basic = _interopRequireDefault(require("./md/basic.md"));

var _index = _interopRequireDefault(require("./Execute/index.cjs"));

var _index2 = _interopRequireDefault(require("./Overview/index.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

var _useCounter2 = _interopRequireDefault(require("./useCounter.cjs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function DemocracyApp(_ref) {
  let {
    basePath
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const dispatchCount = (0, _useCounter.default)();
  const items = (0, _react.useMemo)(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    count: dispatchCount,
    name: 'dispatch',
    text: t('Dispatch')
  }], [dispatchCount, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: "democracy--App",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.HelpOverlay, {
      md: _basic.default
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: items
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/dispatch`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {})
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(DemocracyApp);

exports.default = _default;