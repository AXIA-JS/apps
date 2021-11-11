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

var _util = require("@axia-js/util");

var _index = _interopRequireDefault(require("./Balances/index.cjs"));

var _index2 = _interopRequireDefault(require("./Overview/index.cjs"));

var _translate = require("./translate.cjs");

var _useAssetIds = _interopRequireDefault(require("./useAssetIds.cjs"));

var _useAssetInfos = _interopRequireDefault(require("./useAssetInfos.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function findOpenId(ids) {
  if (!ids || !ids.length) {
    return _util.BN_ONE;
  }

  const lastTaken = ids.find((id, index) => index === 0 ? !id.eq(_util.BN_ONE) : !id.sub(_util.BN_ONE).eq(ids[index - 1]));
  return lastTaken ? lastTaken.sub(_util.BN_ONE) : ids[ids.length - 1].add(_util.BN_ONE);
}

function AssetApp({
  basePath,
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const ids = (0, _useAssetIds.default)();
  const infos = (0, _useAssetInfos.default)(ids);
  const tabsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    name: 'balances',
    text: t('Balances')
  }]);
  const hidden = (0, _react.useMemo)(() => hasAccounts && infos && infos.some(({
    details,
    metadata
  }) => !!(details && metadata)) ? [] : ['balances'], [hasAccounts, infos]);
  const openId = (0, _react.useMemo)(() => findOpenId(ids), [ids]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      hidden: hidden,
      items: tabsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/balances`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
          infos: infos
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
          ids: ids,
          infos: infos,
          openId: openId
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(AssetApp);

exports.default = _default;