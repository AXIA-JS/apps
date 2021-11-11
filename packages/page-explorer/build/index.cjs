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

var _reactQuery = require("@axia-js/react-query");

var _index = _interopRequireDefault(require("./BlockInfo/index.cjs"));

var _Forks = _interopRequireDefault(require("./Forks.cjs"));

var _Main = _interopRequireDefault(require("./Main.cjs"));

var _index2 = _interopRequireDefault(require("./NodeInfo/index.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ExplorerApp({
  basePath,
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    lastHeaders
  } = (0, _react.useContext)(_reactQuery.BlockAuthorsContext);
  const {
    eventCount,
    events
  } = (0, _react.useContext)(_reactQuery.EventsContext);
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'chain',
    text: t('Chain info')
  }, {
    hasParams: true,
    name: 'query',
    text: t('Block details')
  }, {
    name: 'forks',
    text: t('Forks')
  }, {
    name: 'node',
    text: t('Node info')
  }]);
  const hidden = (0, _react.useMemo)(() => api.query.babe ? [] : ['forks'], [api]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      hidden: hidden,
      items: itemsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/forks`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Forks.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/query/:value`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/query`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/node`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Main.default, {
          eventCount: eventCount,
          events: events,
          headers: lastHeaders
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ExplorerApp);

exports.default = _default;