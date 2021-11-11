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

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MULT = new _bn.default(100 * 100);
const COLORS_POINTS = [undefined, '#acacac'];

function extractPrefs(prefs = []) {
  const labels = [];
  const avgSet = [];
  const idxSet = [];
  let avgCount = 0;
  let total = 0;
  prefs.forEach(({
    era,
    validatorPrefs
  }) => {
    const comm = validatorPrefs.commission.unwrap().mul(MULT).div(_util.BN_BILLION).toNumber() / 100;
    total += comm;
    labels.push(era.toHuman());

    if (comm !== 0) {
      avgCount++;
    }

    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    idxSet.push(comm);
  });
  return {
    chart: [idxSet, avgSet],
    labels
  };
}

function ChartPrefs({
  validatorId
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const params = (0, _react.useMemo)(() => [validatorId, false], [validatorId]);
  const stakerPrefs = (0, _reactHooks.useCall)(api.derive.staking.stakerPrefs, params);
  const {
    chart,
    labels
  } = (0, _react.useMemo)(() => extractPrefs(stakerPrefs), [stakerPrefs]);
  const legendsRef = (0, _react.useRef)([t('commission'), t('average')]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "staking--Chart",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: t('commission')
    }), labels.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Chart.Line, {
      colors: COLORS_POINTS,
      labels: labels,
      legends: legendsRef.current,
      values: chart
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {})]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ChartPrefs);

exports.default = _default;