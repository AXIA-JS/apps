"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _Lifecycle = _interopRequireDefault(require("../Overview/Lifecycle.cjs"));

var _Periods = _interopRequireDefault(require("../Overview/Periods.cjs"));

var _translate = require("../translate.cjs");

var _util2 = require("../util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
// import ParachainInfo from '../Overview/ParachainInfo';
const optMulti = {
  defaultValue: {
    headHex: null,
    lifecycle: null,
    manager: null
  },
  transform: ([optHead, optGenesis, optLifecycle, optInfo]) => ({
    headHex: optHead.isSome ? (0, _util2.sliceHex)(optHead.unwrap()) : optGenesis.isSome ? (0, _util2.sliceHex)(optGenesis.unwrap().genesisHead) : null,
    lifecycle: optLifecycle.unwrapOr(null),
    manager: optInfo.isSome ? optInfo.unwrap().manager : null
  })
};

function Upcoming({
  id,
  leasePeriod,
  leases,
  nextAction
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    isAccount
  } = (0, _reactHooks.useAccounts)();
  const {
    headHex,
    lifecycle,
    manager
  } = (0, _reactHooks.useCallMulti)([[api.query.paras.heads, id], [api.query.paras.upcomingParasGenesis, id], [api.query.paras.paraLifecycles, id], [api.query.registrar.paras, id]], optMulti);
  const periods = (0, _react.useMemo)(() => (leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod) && leases && leases.map(({
    period
  }) => period), [leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod, leases]);
  const isManager = isAccount(manager === null || manager === void 0 ? void 0 : manager.toString());
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(id)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ParaLink, {
        id: id
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address media--1100",
      children: manager && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: manager
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start together hash media--1500",
      children: headHex
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Lifecycle.default, {
        lifecycle: lifecycle,
        nextAction: nextAction
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number no-pad-left"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: leasePeriod && leases && periods && (leases.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Periods.default, {
        fromFirst: true,
        leasePeriod: leasePeriod,
        periods: periods
      }) : t('None'))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button media--900",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: manager,
        icon: "times",
        isDisabled: !isManager,
        label: t('Deregister'),
        params: [id],
        tx: api.tx.registrar.deregister
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Upcoming);

exports.default = _default;