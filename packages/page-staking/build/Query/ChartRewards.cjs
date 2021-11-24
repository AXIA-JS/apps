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
const COLORS_REWARD = ['#8c2200', '#008c22', '#acacac'];

function extractRewards() {
  let erasRewards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let ownSlashes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let allPoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  let divisor = arguments.length > 3 ? arguments[3] : undefined;
  const labels = [];
  const slashSet = [];
  const rewardSet = [];
  const avgSet = [];
  let avgCount = 0;
  let total = 0;
  erasRewards.forEach(_ref => {
    let {
      era,
      eraReward
    } = _ref;
    const points = allPoints.find(points => points.era.eq(era));
    const slashed = ownSlashes.find(slash => slash.era.eq(era));
    const reward = points !== null && points !== void 0 && points.eraPoints.gtn(0) ? (0, _util2.balanceToNumber)(points.points.mul(eraReward).div(points.eraPoints), divisor) : 0;
    const slash = slashed ? (0, _util2.balanceToNumber)(slashed.total, divisor) : 0;
    total += reward;

    if (reward > 0) {
      avgCount++;
    }

    labels.push(era.toHuman());
    rewardSet.push(reward);
    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    slashSet.push(slash);
  });
  return {
    chart: [slashSet, rewardSet, avgSet],
    labels
  };
}

function ChartRewards(_ref2) {
  let {
    validatorId
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const params = (0, _react.useMemo)(() => [validatorId, false], [validatorId]);
  const ownSlashes = (0, _reactHooks.useCall)(api.derive.staking.ownSlashes, params);
  const erasRewards = (0, _reactHooks.useCall)(api.derive.staking.erasRewards);
  const stakerPoints = (0, _reactHooks.useCall)(api.derive.staking.stakerPoints, params);
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
  } = (0, _react.useMemo)(() => extractRewards(erasRewards, ownSlashes, stakerPoints, divisor), [divisor, erasRewards, ownSlashes, stakerPoints]);
  const legends = (0, _react.useMemo)(() => [t('{{currency}} slashed', {
    replace: {
      currency
    }
  }), t('{{currency}} rewards', {
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
      children: t('rewards & slashes')
    }), labels.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Chart.Line, {
      colors: COLORS_REWARD,
      labels: labels,
      legends: legends,
      values: chart
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {})]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ChartRewards);

exports.default = _default;