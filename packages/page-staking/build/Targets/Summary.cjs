"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
const transformReward = {
  transform: optBalance => optBalance.unwrapOrDefault()
};
const transformEra = {
  transform: ({
    activeEra
  }) => activeEra.gt(_util.BN_ZERO) ? activeEra.sub(_util.BN_ONE) : undefined
};

function Summary({
  avgStaked,
  lowStaked,
  minNominated,
  minNominatorBond,
  stakedReturn,
  totalIssuance,
  totalStaked
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const lastEra = (0, _reactHooks.useCall)(api.derive.session.indexes, undefined, transformEra);
  const lastReward = (0, _reactHooks.useCall)(lastEra && api.query.staking.erasValidatorReward, [lastEra], transformReward);
  const progressStake = (0, _react.useMemo)(() => totalIssuance && totalStaked && totalStaked.gtn(0) ? {
    hideValue: true,
    total: totalIssuance,
    value: totalStaked
  } : undefined, [totalIssuance, totalStaked]);
  const progressAvg = (0, _react.useMemo)(() => avgStaked && lowStaked && avgStaked.gtn(0) ? {
    hideValue: true,
    total: avgStaked,
    value: lowStaked
  } : undefined, [avgStaked, lowStaked]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--800",
      children: totalIssuance && (totalStaked === null || totalStaked === void 0 ? void 0 : totalStaked.gt(_util.BN_ZERO)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('total staked'),
        progress: progressStake,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: totalStaked,
          withSi: true
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--800",
      children: totalIssuance && stakedReturn > 0 && Number.isFinite(stakedReturn) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        label: t('returns'),
        children: [stakedReturn.toFixed(1), "%"]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--1000",
      children: (avgStaked === null || avgStaked === void 0 ? void 0 : avgStaked.gtn(0)) && (lowStaked === null || lowStaked === void 0 ? void 0 : lowStaked.gtn(0)) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        label: `${t('lowest / avg staked')}`,
        progress: progressAvg,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: lowStaked,
          withCurrency: false,
          withSi: true
        }), "\xA0/\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: avgStaked,
          withSi: true
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--1600",
      children: (minNominated === null || minNominated === void 0 ? void 0 : minNominated.gt(_util.BN_ZERO)) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        className: "media--1600",
        label: minNominatorBond ? t('min nominated / threshold') : t('min nominated'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: minNominated,
          withCurrency: !minNominatorBond,
          withSi: true
        }), minNominatorBond && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: ["\xA0/\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
            value: minNominatorBond,
            withSi: true
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: (lastReward === null || lastReward === void 0 ? void 0 : lastReward.gtn(0)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('last reward'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: lastReward,
          withSi: true
        })
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;