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

var _basic = _interopRequireDefault(require("./md/basic.md"));

var _index = _interopRequireDefault(require("./Accounts/index.cjs"));

var _translate = require("./translate.cjs");

var _useCounter = _interopRequireDefault(require("./useCounter.cjs"));

var _index2 = _interopRequireDefault(require("./Vanity/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const HIDDEN_ACC = ['vanity'];

function AccountsApp({
  basePath,
  onStatusChange
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    isIpfs
  } = (0, _reactHooks.useIpfs)();
  const tabsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'overview',
    text: t('My accounts')
  }, {
    name: 'vanity',
    text: t('Vanity generator')
  }]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: "accounts--App",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.HelpOverlay, {
      md: _basic.default
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      hidden: hasAccounts && !isIpfs ? undefined : HIDDEN_ACC,
      items: tabsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/vanity`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
          basePath: basePath,
          onStatusChange: onStatusChange
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
          basePath: basePath,
          onStatusChange: onStatusChange
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(AccountsApp);

exports.default = _default;