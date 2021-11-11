"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _Tooltip = _interopRequireDefault(require("./Tooltip.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractTotals(stakingInfo, progress) {
  if (!(stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.unlocking) || !progress) {
    return [[], _util.BN_ZERO];
  }

  const mapped = stakingInfo.unlocking.filter(({
    remainingEras,
    value
  }) => value.gt(_util.BN_ZERO) && remainingEras.gt(_util.BN_ZERO)).map(unlock => [unlock, unlock.remainingEras, unlock.remainingEras.sub(_util.BN_ONE).imul(progress.eraLength).iadd(progress.eraLength).isub(progress.eraProgress)]);
  const total = mapped.reduce((total, [{
    value
  }]) => total.iadd(value), new _bn.default(0));
  return [mapped, total];
}

function StakingUnbonding({
  className = '',
  iconPosition = 'left',
  stakingInfo
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const progress = (0, _reactHooks.useCall)(api.derive.session.progress);
  const {
    t
  } = (0, _translate.useTranslation)();
  const [mapped, total] = (0, _react.useMemo)(() => extractTotals(stakingInfo, progress), [progress, stakingInfo]);

  if (!stakingInfo || !mapped.length) {
    return null;
  }

  const trigger = `${stakingInfo.accountId.toString()}-unlocking-trigger`;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [iconPosition === 'left' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      className: "left",
      icon: "clock",
      tooltip: trigger
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      value: total
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
      text: mapped.map(([{
        value
      }, eras, blocks], index) => {
        var _api$consts$babe;

        return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: t('Unbonding {{value}}', {
              replace: {
                value: (0, _util.formatBalance)(value, {
                  forceUnit: '-'
                })
              }
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "faded",
            children: (_api$consts$babe = api.consts.babe) !== null && _api$consts$babe !== void 0 && _api$consts$babe.epochDuration ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
              label: `${t('{{blocks}} blocks', {
                replace: {
                  blocks: (0, _util.formatNumber)(blocks)
                }
              })}, `,
              value: blocks
            }) : t('{{eras}} eras remaining', {
              replace: {
                eras: (0, _util.formatNumber)(eras)
              }
            })
          })]
        }, index);
      }),
      trigger: trigger
    }), iconPosition === 'right' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      className: "right",
      icon: "clock",
      tooltip: trigger
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(StakingUnbonding).withConfig({
  displayName: "StakingUnbonding",
  componentId: "sc-aleiav-0"
})(["white-space:nowrap;.ui--Icon.left{margin-left:0;margin-right:0.25rem;}.ui--Icon.right{margin-left:0.25rem;margin-right:0;}.ui--FormatBalance{display:inline-block;}"]));

exports.default = _default;