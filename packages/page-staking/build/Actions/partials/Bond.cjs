"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../../translate.cjs");

var _InputValidateAmount = _interopRequireDefault(require("../Account/InputValidateAmount.cjs"));

var _InputValidationController = _interopRequireDefault(require("../Account/InputValidationController.cjs"));

var _destOptions = require("../destOptions.cjs");

var _useUnbondDuration = _interopRequireDefault(require("../useUnbondDuration.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_INFO = {
  bondOwnTx: null,
  bondTx: null,
  controllerId: null,
  controllerTx: null,
  stashId: null
};

function Bond(_ref) {
  var _api$derive$balances, _api$derive$balances2;

  let {
    className = '',
    isNominating,
    minNominated,
    minNominatorBond,
    minValidatorBond,
    onChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [amount, setAmount] = (0, _react.useState)();
  const [amountError, setAmountError] = (0, _react.useState)(null);
  const [controllerError, setControllerError] = (0, _react.useState)(false);
  const [controllerId, setControllerId] = (0, _react.useState)(null);
  const [destination, setDestination] = (0, _react.useState)('Staked');
  const [destAccount, setDestAccount] = (0, _react.useState)(null);
  const [stashId, setStashId] = (0, _react.useState)(null);
  const [startBalance, setStartBalance] = (0, _react.useState)(null);
  const stashBalance = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [stashId]);
  const destBalance = (0, _reactHooks.useCall)((_api$derive$balances2 = api.derive.balances) === null || _api$derive$balances2 === void 0 ? void 0 : _api$derive$balances2.all, [destAccount]);
  const bondedBlocks = (0, _useUnbondDuration.default)();
  const options = (0, _react.useMemo)(() => (0, _destOptions.createDestCurr)(t), [t]);

  const _setError = (0, _react.useCallback)((_, isFatal) => setControllerError(isFatal), []);

  (0, _react.useEffect)(() => {
    stashBalance && setStartBalance(stashBalance.freeBalance.gt(api.consts.balances.existentialDeposit) ? stashBalance.freeBalance.sub(api.consts.balances.existentialDeposit) : _util.BN_ZERO);
  }, [api, stashBalance]);
  (0, _react.useEffect)(() => {
    setStartBalance(null);
  }, [stashId]);
  (0, _react.useEffect)(() => {
    const bondDest = destination === 'Account' ? {
      Account: destAccount
    } : destination;
    onChange(amount && amount.gtn(0) && !(amountError !== null && amountError !== void 0 && amountError.error) && !controllerError && controllerId && stashId ? {
      bondOwnTx: api.tx.staking.bond(stashId, amount, bondDest),
      bondTx: api.tx.staking.bond(controllerId, amount, bondDest),
      controllerId,
      controllerTx: api.tx.staking.setController(controllerId),
      stashId
    } : EMPTY_INFO);
  }, [api, amount, amountError, controllerError, controllerId, destination, destAccount, stashId, onChange]);
  const hasValue = !!(amount !== null && amount !== void 0 && amount.gtn(0));
  const isAccount = destination === 'Account';
  const isDestError = isAccount && destBalance && destBalance.accountId.eq(destAccount) && destBalance.freeBalance.isZero();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
      hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('Think of the stash as your cold wallet and the controller as your hot wallet. Funding operations are controlled by the stash, any other non-funding actions by the controller itself.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('To ensure optimal fund security using the same stash/controller is strongly discouraged, but not forbidden.')
        })]
      }),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        label: t('stash account'),
        onChange: setStashId,
        type: "account",
        value: stashId
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        help: t('The controller is the account that will be used to control any nominating or validating actions. Should not match another stash or controller.'),
        label: t('controller account'),
        onChange: setControllerId,
        type: "account",
        value: controllerId
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputValidationController.default, {
        accountId: stashId,
        controllerId: controllerId,
        onError: _setError
      })]
    }), startBalance && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
      hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('The amount placed at-stake should not be your full available available amount to allow for transaction fees.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('Once bonded, it will need to be unlocked/withdrawn and will be locked for at least the bonding duration.')
        })]
      }),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
        autoFocus: true,
        defaultValue: startBalance,
        help: t('The total amount of the stash balance that will be at stake in any forthcoming rounds (should be less than the free amount available)'),
        isError: !hasValue || !!(amountError !== null && amountError !== void 0 && amountError.error),
        label: t('value bonded'),
        labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BalanceFree, {
          label: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "label",
            children: t('balance')
          }),
          params: stashId
        }),
        onChange: setAmount
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputValidateAmount.default, {
        controllerId: controllerId,
        isNominating: isNominating,
        minNominated: minNominated,
        minNominatorBond: minNominatorBond,
        minValidatorBond: minValidatorBond,
        onError: setAmountError,
        stashId: stashId,
        value: amount
      }), (bondedBlocks === null || bondedBlocks === void 0 ? void 0 : bondedBlocks.gtn(0)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
        help: t('The bonding duration for any staked funds. Needs to be unlocked and withdrawn to become available.'),
        label: t('on-chain bonding duration'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: bondedBlocks
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
      hint: t('Rewards (once paid) can be deposited to either the stash or controller, with different effects.'),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        defaultValue: 0,
        help: t('The destination account for any payments as either a nominator or validator'),
        label: t('payment destination'),
        onChange: setDestination,
        options: options,
        value: destination
      }), isAccount && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        help: t('An account that is to receive the rewards'),
        label: t('the payment account'),
        onChange: setDestAccount,
        type: "account",
        value: destAccount
      }), isDestError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
        content: t('The selected destination account does not exist and cannot be used to receive rewards')
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Bond);

exports.default = _default;