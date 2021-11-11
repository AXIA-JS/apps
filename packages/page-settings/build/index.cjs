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

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _basics = _interopRequireDefault(require("./md/basics.md"));

var _Developer = _interopRequireDefault(require("./Developer.cjs"));

var _General = _interopRequireDefault(require("./General.cjs"));

var _index = _interopRequireDefault(require("./I18n/index.cjs"));

var _index2 = _interopRequireDefault(require("./Metadata/index.cjs"));

var _translate = require("./translate.cjs");

var _useCounter = _interopRequireDefault(require("./useCounter.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SettingsApp({
  basePath,
  onStatusChange
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    isApiConnected,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const numExtensions = (0, _useCounter.default)();
  const items = (0, _react.useMemo)(() => [{
    isRoot: true,
    name: 'general',
    text: t('General')
  }, {
    count: numExtensions,
    name: 'metadata',
    text: t('Metadata')
  }, {
    name: 'developer',
    text: t('Developer')
  }, {
    name: 'i18n',
    text: t('Translate')
  }], [numExtensions, t]);
  const hidden = (0, _react.useMemo)(() => isApiConnected && isApiReady ? [] : ['metadata', 'i18n'], [isApiConnected, isApiReady]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: "settings--App",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.HelpOverlay, {
      md: _basics.default
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      hidden: hidden,
      items: items
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/developer`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Developer.default, {
          basePath: basePath,
          onStatusChange: onStatusChange
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/i18n`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/metadata`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_General.default, {})
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SettingsApp);

exports.default = _default;