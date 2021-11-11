"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function WarnBond({
  minBond,
  stakingInfo
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const isBelow = (0, _react.useMemo)(() => minBond && stakingInfo && stakingInfo.stakingLedger.active.unwrap().lt(minBond), [minBond, stakingInfo]);
  return isBelow ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
    content: t('Your bonded amount is below the on-chain minimum threshold of {{minBond}} and may be chilled. Bond extra funds to increase the bonded amount.', {
      replace: {
        minBond: (0, _util.formatBalance)(minBond)
      }
    })
  }) : null;
}

var _default = /*#__PURE__*/_react.default.memo(WarnBond);

exports.default = _default;