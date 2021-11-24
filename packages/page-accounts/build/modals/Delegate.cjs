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

var _translate = require("../translate.cjs");

var _InputValidateAmount = _interopRequireDefault(require("./InputValidateAmount.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Delegate(_ref) {
  let {
    onClose,
    previousAmount,
    previousConviction,
    previousDelegatedAccount,
    previousDelegatingAccount
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [amountError, setAmountError] = (0, _react.useState)(null);
  const [maxBalance] = (0, _react.useState)();
  const [amount, setAmount] = (0, _react.useState)(previousAmount);
  const [delegatingAccount, setDelegatingAccount] = (0, _react.useState)(previousDelegatingAccount || null);
  const [delegatedAccount, setDelegatedAccount] = (0, _react.useState)(previousDelegatedAccount || null);
  const defaultConviction = previousConviction === undefined ? 0 : previousConviction.toNumber();
  const [conviction, setConviction] = (0, _react.useState)(defaultConviction);
  const isDirty = (amount === null || amount === void 0 ? void 0 : amount.toString()) !== (previousAmount === null || previousAmount === void 0 ? void 0 : previousAmount.toString()) || delegatedAccount !== previousDelegatedAccount || delegatingAccount !== previousDelegatingAccount || conviction !== (previousConviction === null || previousConviction === void 0 ? void 0 : previousConviction.toNumber());
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: "staking--Delegate",
    header: previousDelegatedAccount ? t('democracy vote delegation') : t('delegate democracy vote'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('Any democracy vote performed by the delegated account will result in an additional vote from the delegating account')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('If the delegated account is currently voting in a referendum, the delegating vote and conviction will be added.')
          })]
        }),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          label: t('delegating account'),
          onChange: setDelegatingAccount,
          type: "account",
          value: delegatingAccount
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          label: t('delegated account'),
          onChange: setDelegatedAccount,
          type: "account",
          value: delegatedAccount
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The amount to allocate and the conviction that will be applied to all votes made on a referendum.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          autoFocus: true,
          help: t('Amount to delegate for any democracy vote. This is adjusted using the available funds on the account.'),
          isError: !!(amountError !== null && amountError !== void 0 && amountError.error),
          isZeroable: false,
          label: t('delegating amount'),
          labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BalanceFree, {
            label: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "label",
              children: t('balance')
            }),
            params: delegatingAccount
          }),
          maxValue: maxBalance,
          onChange: setAmount,
          value: amount
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputValidateAmount.default, {
          amount: amount,
          delegatingAccount: delegatingAccount,
          onError: setAmountError
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ConvictionDropdown, {
          help: t('The conviction that will be used for each delegated vote.'),
          label: t('conviction'),
          onChange: setConviction,
          value: conviction
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
      children: [previousDelegatedAccount && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: delegatingAccount,
        icon: "trash-alt",
        label: t('Undelegate'),
        onStart: onClose,
        tx: api.tx.democracy.undelegate
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: delegatingAccount,
        icon: "sign-in-alt",
        isDisabled: !(amount !== null && amount !== void 0 && amount.gt(_util.BN_ZERO)) || !!(amountError !== null && amountError !== void 0 && amountError.error) || !isDirty,
        label: previousDelegatedAccount ? t('Save delegation') : t('Delegate'),
        onStart: onClose,
        params: [delegatedAccount, conviction, amount],
        tx: api.tx.democracy.delegate
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Delegate);

exports.default = _default;