"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Mint({
  className,
  details: {
    issuer,
    minBalance
  },
  id,
  metadata,
  onClose
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [amount, setAmount] = (0, _react.useState)(null);
  const [recipientId, setRecipientId] = (0, _react.useState)(null);
  const isAmountValid = (0, _react.useMemo)(() => amount && amount.gte(minBalance), [amount, minBalance]);
  const [siDecimals, siSymbol] = (0, _react.useMemo)(() => [metadata.decimals.toNumber(), metadata.symbol.toUtf8().toUpperCase()], [metadata]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('mint asset'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The recipient account for this minting operation.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          defaultValue: issuer,
          isDisabled: true,
          label: t('issuer account')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The recipient account for this minting operation.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          label: t('mint to address'),
          onChange: setRecipientId,
          type: "allPlus"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The amount of tokens to issue to the account.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          autoFocus: true,
          isError: !isAmountValid,
          isZeroable: false,
          label: t('amount to issue'),
          onChange: setAmount,
          siDecimals: siDecimals,
          siSymbol: siSymbol
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The minimum balance allowed for the asset.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          defaultValue: minBalance,
          isDisabled: true,
          label: t('minimum balance'),
          siDecimals: siDecimals,
          siSymbol: siSymbol
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: issuer,
        icon: "plus",
        isDisabled: !recipientId || !isAmountValid,
        label: t('Mint'),
        onStart: onClose,
        params: [id, recipientId, amount],
        tx: api.tx.assets.mint
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Mint);

exports.default = _default;