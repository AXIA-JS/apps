"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _SetKey = _interopRequireDefault(require("./SetKey.cjs"));

var _Sudo = _interopRequireDefault(require("./Sudo.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SudoApp({
  basePath
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    allAccounts,
    hasSudoKey,
    sudoKey
  } = (0, _reactHooks.useSudo)();
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'index',
    text: t('Sudo access')
  }, {
    name: 'key',
    text: t('Set sudo key')
  }]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), hasSudoKey ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/key`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SetKey.default, {
          allAccounts: allAccounts,
          isMine: hasSudoKey,
          sudoKey: sudoKey
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sudo.default, {
          allAccounts: allAccounts,
          isMine: hasSudoKey,
          sudoKey: sudoKey
        })
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("article", {
      className: "error padded",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
          icon: "ban"
        }), t('You do not have access to the current sudo key')]
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SudoApp);

exports.default = _default;