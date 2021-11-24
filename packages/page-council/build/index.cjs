"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "useCounter", {
  enumerable: true,
  get: function () {
    return _useCounter.default;
  }
});

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = _interopRequireDefault(require("./Motions/index.cjs"));

var _index2 = _interopRequireDefault(require("./Overview/index.cjs"));

var _translate = require("./translate.cjs");

var _useCounter = _interopRequireDefault(require("./useCounter.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function CouncilApp(_ref) {
  let {
    basePath,
    className
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const numMotions = (0, _useCounter.default)();
  const prime = (0, _reactHooks.useCall)(api.derive.council.prime);
  const motions = (0, _reactHooks.useCall)(api.derive.council.proposals);
  const items = (0, _react.useMemo)(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    count: numMotions,
    name: 'motions',
    text: t('Motions')
  }], [numMotions, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: items
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Switch, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/motions`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
          motions: motions,
          prime: prime
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
      className: [basePath, `${basePath}/candidates`].includes(pathname) ? '' : 'council--hidden',
      prime: prime
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(CouncilApp).withConfig({
  displayName: "src",
  componentId: "sc-gp94ja-0"
})([".council--hidden{display:none;}"]));

exports.default = _default;