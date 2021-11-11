"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
// 0x, <enum byte>, hex data
const VALID_LENGTHS = [2 + 2 + 64 * 2, 2 + 2 + 65 * 2];

function verifySignature(api, signature) {
  if ((0, _util.isHex)(signature) && VALID_LENGTHS.includes(signature.length)) {
    try {
      api.createType('MultiSignature', signature);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  return false;
}

function Contribute({
  cap,
  className,
  needsSignature,
  paraId,
  raised
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [amount, setAmount] = (0, _react.useState)();
  const [signature, setSignature] = (0, _react.useState)(null);
  const isSignatureError = (0, _react.useMemo)(() => needsSignature && !verifySignature(api, signature), [api, needsSignature, signature]);
  const remaining = cap.sub(raised);
  const isAmountBelow = !amount || amount.lt(api.consts.crowdloan.minContribution);
  const isAmountOver = !!(amount && amount.gt(remaining));
  const isAmountError = isAmountBelow || isAmountOver;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !hasAccounts,
      label: t('Contribute'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('Contribute to fund'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('This account will contribute to the crowdloan.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            label: t('contribute from'),
            onChange: setAccountId,
            type: "account",
            value: accountId
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('The amount to contribute from this account.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            autoFocus: true,
            defaultValue: api.consts.crowdloan.minContribution,
            isError: isAmountError,
            isZeroable: false,
            label: t('contribution'),
            onChange: setAmount
          }), isAmountBelow && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
            content: t('The amount is less than the minimum allowed contribution of {{value}}', {
              replace: {
                value: (0, _util.formatBalance)(api.consts.crowdloan.minContribution)
              }
            })
          }), isAmountOver && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
            content: t('The amount is more than the remaining contribution needed {{value}}', {
              replace: {
                value: (0, _util.formatBalance)(remaining)
              }
            })
          })]
        }), needsSignature && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('The verifier signature that is to be associated with this contribution.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            isError: isSignatureError,
            label: t('verifier signature'),
            onChange: setSignature,
            placeholder: t('0x...')
          }), isSignatureError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
            content: t('The hex-encoded verifier signature should be provided to you by the team running the crowdloan (based on the information you provide).')
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('The above contribution should more than minimum contribution amount and less than the remaining value.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: api.consts.crowdloan.minContribution,
            isDisabled: true,
            label: t('minimum allowed')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: remaining,
            isDisabled: true,
            label: t('remaining till cap')
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: isAmountError || isSignatureError,
          label: t('Contribute'),
          onStart: toggleOpen,
          params: [paraId, amount, signature],
          tx: api.tx.crowdloan.contribute
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Contribute);

exports.default = _default;