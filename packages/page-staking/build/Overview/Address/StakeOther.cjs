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

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractFunction(all) {
  return all.length ? [all.length, () => all.map(_ref => {
    let {
      nominatorId,
      value
    } = _ref;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
      bonded: value,
      value: nominatorId,
      withBonded: true
    }, nominatorId);
  })] : null;
}

function extractTotals(maxPaid, nominators, stakeOther) {
  const sorted = nominators.sort((a, b) => b.value.cmp(a.value));

  if (!maxPaid || maxPaid.gtn(sorted.length)) {
    return [extractFunction(sorted), stakeOther || _util.BN_ZERO, null, _util.BN_ZERO];
  }

  const max = maxPaid.toNumber();
  const rewarded = sorted.slice(0, max);
  const rewardedTotal = rewarded.reduce((total, _ref2) => {
    let {
      value
    } = _ref2;
    return total.iadd(value);
  }, new _bn.default(0));
  const unrewarded = sorted.slice(max);
  const unrewardedTotal = unrewarded.reduce((total, _ref3) => {
    let {
      value
    } = _ref3;
    return total.iadd(value);
  }, new _bn.default(0));
  return [extractFunction(rewarded), rewardedTotal, extractFunction(unrewarded), unrewardedTotal];
}

function StakeOther(_ref4) {
  let {
    nominators,
    stakeOther
  } = _ref4;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [rewarded, rewardedTotal, unrewarded, unrewardedTotal] = (0, _react.useMemo)(() => {
    var _api$consts$staking;

    return extractTotals((_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : _api$consts$staking.maxNominatorRewardedPerValidator, nominators, stakeOther);
  }, [api, nominators, stakeOther]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
    className: "expand all",
    children: rewarded && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        renderChildren: rewarded[1],
        summary: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          labelPost: ` (${rewarded[0]})`,
          value: rewardedTotal
        })
      }), unrewarded && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        className: "stakeOver",
        renderChildren: unrewarded[1],
        summary: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          labelPost: ` (${unrewarded[0]})`,
          value: unrewardedTotal
        })
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(StakeOther);

exports.default = _default;