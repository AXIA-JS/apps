"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const COLORS_POINTS = [undefined, '#acacac'];

function extractPoints() {
  let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const labels = [];
  const avgSet = [];
  const idxSet = [];
  let avgCount = 0;
  let total = 0;
  points.forEach(_ref => {
    let {
      era,
      points
    } = _ref;
    total += points.toNumber();
    labels.push(era.toHuman());

    if (points.gtn(0)) {
      avgCount++;
    }

    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    idxSet.push(points);
  });
  return {
    chart: [idxSet, avgSet],
    labels
  };
}

function ChartPoints(_ref2) {
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
  const stakerPoints = (0, _reactHooks.useCall)(api.derive.staking.stakerPoints, params);
  const {
    chart,
    labels
  } = (0, _react.useMemo)(() => extractPoints(stakerPoints), [stakerPoints]);
  const legendsRef = (0, _react.useRef)([t('points'), t('average')]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "staking--Chart",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: t('era points')
    }), labels.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Chart.Line, {
      colors: COLORS_POINTS,
      labels: labels,
      legends: legendsRef.current,
      values: chart
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {})]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ChartPoints);

exports.default = _default;