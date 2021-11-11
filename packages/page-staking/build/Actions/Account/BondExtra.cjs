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

var _translate = require("../../translate.cjs");

var _InputValidateAmount = _interopRequireDefault(require("./InputValidateAmount.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function calcBalance(api, stakingInfo, stashBalance) {
  if (stakingInfo && stakingInfo.stakingLedger && stashBalance) {
    var _stakingInfo$stakingL;

    const sumUnlocking = (stakingInfo.unlocking || []).reduce((acc, {
      value
    }) => acc.iadd(value), new _bn.default(0));
    const redeemable = stakingInfo.redeemable || _util.BN_ZERO;
    const available = stashBalance.freeBalance.sub(((_stakingInfo$stakingL = stakingInfo.stakingLedger.active) === null || _stakingInfo$stakingL === void 0 ? void 0 : _stakingInfo$stakingL.unwrap()) || _util.BN_ZERO).sub(sumUnlocking).sub(redeemable);
    return available.gt(api.consts.balances.existentialDeposit) ? available.sub(api.consts.balances.existentialDeposit) : _util.BN_ZERO;
  }

  return null;
}

function BondExtra({
  controllerId,
  onClose,
  stakingInfo,
  stashId
}) {
  var _api$derive$balances;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [amountError, setAmountError] = (0, _react.useState)(null);
  const [maxAdditional, setMaxAdditional] = (0, _react.useState)();
  const stashBalance = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [stashId]);
  const currentAmount = (0, _react.useMemo)(() => {
    var _stakingInfo$stakingL2, _stakingInfo$stakingL3;

    return stakingInfo && ((_stakingInfo$stakingL2 = stakingInfo.stakingLedger) === null || _stakingInfo$stakingL2 === void 0 ? void 0 : (_stakingInfo$stakingL3 = _stakingInfo$stakingL2.active) === null || _stakingInfo$stakingL3 === void 0 ? void 0 : _stakingInfo$stakingL3.unwrap());
  }, [stakingInfo]);
  const startBalance = (0, _react.useMemo)(() => calcBalance(api, stakingInfo, stashBalance), [api, stakingInfo, stashBalance]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: "staking--BondExtra",
    header: t('Bond more funds'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('Since this transaction deals with funding, the stash account will be used.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          defaultValue: stashId,
          isDisabled: true,
          label: t('stash account')
        })
      }), startBalance && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The amount placed at-stake should allow some free funds for future transactions.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          autoFocus: true,
          defaultValue: startBalance,
          help: t('Amount to add to the currently bonded funds. This is adjusted using the available funds on the account.'),
          isError: !!(amountError !== null && amountError !== void 0 && amountError.error) || !maxAdditional || maxAdditional.eqn(0),
          label: t('additional bonded funds'),
          labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BalanceFree, {
            label: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "label",
              children: t('balance')
            }),
            params: stashId
          }),
          onChange: setMaxAdditional
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputValidateAmount.default, {
          controllerId: controllerId,
          currentAmount: currentAmount,
          onError: setAmountError,
          stashId: stashId,
          value: maxAdditional
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: stashId,
        icon: "sign-in-alt",
        isDisabled: !(maxAdditional !== null && maxAdditional !== void 0 && maxAdditional.gt(_util.BN_ZERO)) || !!(amountError !== null && amountError !== void 0 && amountError.error),
        label: t('Bond more'),
        onStart: onClose,
        params: [maxAdditional],
        tx: api.tx.staking.bondExtra
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BondExtra);

exports.default = _default;