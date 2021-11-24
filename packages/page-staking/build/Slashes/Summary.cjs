"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Header(_ref) {
  var _api$derive$session;

  let {
    slash: {
      era,
      nominators,
      reporters,
      total,
      validators
    }
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const sessionInfo = (0, _reactHooks.useCall)((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.progress);
  const [blockProgress, blockEnd] = (0, _react.useMemo)(() => sessionInfo ? [sessionInfo.activeEra.sub(era).isub(_util.BN_ONE).imul(sessionInfo.eraLength).iadd(sessionInfo.eraProgress), api.consts.staking.slashDeferDuration.mul(sessionInfo.eraLength)] : [new _bn.default(0), new _bn.default(0)], [api, era, sessionInfo]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('validators'),
        children: (0, _util.formatNumber)(validators.length)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('nominators'),
        children: (0, _util.formatNumber)(nominators.length)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('reporters'),
        children: (0, _util.formatNumber)(reporters.length)
      })]
    }), blockProgress.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
      label: t('defer'),
      progress: {
        total: blockEnd,
        value: blockProgress,
        withTime: true
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
      label: t('total'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: total
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Header);

exports.default = _default;