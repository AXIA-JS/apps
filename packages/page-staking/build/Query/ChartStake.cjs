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

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const COLORS_STAKE = [undefined, '#8c2200', '#acacac'];

function extractStake(exposures = [], divisor) {
  const labels = [];
  const cliSet = [];
  const expSet = [];
  const avgSet = [];
  let avgCount = 0;
  let total = 0;
  exposures.forEach(({
    clipped,
    era,
    exposure
  }) => {
    var _clipped$total, _exposure$total;

    // Darwinia Crab doesn't have the total field
    const cli = (0, _util2.balanceToNumber)((_clipped$total = clipped.total) === null || _clipped$total === void 0 ? void 0 : _clipped$total.unwrap(), divisor);
    const exp = (0, _util2.balanceToNumber)((_exposure$total = exposure.total) === null || _exposure$total === void 0 ? void 0 : _exposure$total.unwrap(), divisor);
    total += cli;

    if (cli > 0) {
      avgCount++;
    }

    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    labels.push(era.toHuman());
    cliSet.push(cli);
    expSet.push(exp);
  });
  return {
    chart: [cliSet, expSet, avgSet],
    labels
  };
}

function ChartStake({
  validatorId
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const params = (0, _react.useMemo)(() => [validatorId, false], [validatorId]);
  const ownExposures = (0, _reactHooks.useCall)(api.derive.staking.ownExposures, params);
  const {
    currency,
    divisor
  } = (0, _react.useMemo)(() => ({
    currency: _util.formatBalance.getDefaults().unit,
    divisor: new _bn.default('1'.padEnd(_util.formatBalance.getDefaults().decimals + 1, '0'))
  }), []);
  const {
    chart,
    labels
  } = (0, _react.useMemo)(() => extractStake(ownExposures, divisor), [divisor, ownExposures]);
  const legends = (0, _react.useMemo)(() => [t('{{currency}} clipped', {
    replace: {
      currency
    }
  }), t('{{currency}} total', {
    replace: {
      currency
    }
  }), t('{{currency}} average', {
    replace: {
      currency
    }
  })], [currency, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "staking--Chart",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: t('elected stake')
    }), labels.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Chart.Line, {
      colors: COLORS_STAKE,
      labels: labels,
      legends: legends,
      values: chart
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {})]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ChartStake);

exports.default = _default;