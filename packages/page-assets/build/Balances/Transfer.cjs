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

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Transfer(_ref) {
  let {
    accountId,
    assetId,
    className,
    minBalance,
    siFormat: [siDecimals, siSymbol]
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [amount, setAmount] = (0, _react.useState)(null);
  const [recipientId, setRecipientId] = (0, _react.useState)(null);
  const [isProtected, setIsProtected] = (0, _react.useState)(true);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "paper-plane",
      label: t('send'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('transfer asset'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The account to transfer from. This account should have sufficient assets for this transfer.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            defaultValue: accountId,
            isDisabled: true,
            label: t('send from')
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The beneficiary will have access to the transferred asset when the transaction is included in a block.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            label: t('send to address'),
            onChange: setRecipientId,
            type: "allPlus"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The amount of tokens to transfer to the account.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            autoFocus: true,
            label: t('amount to transfer'),
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
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('With the keep-alive option set, the account is protected against removal due to low balances.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
            className: "typeToggle",
            label: isProtected ? t('Transfer with account keep-alive checks') : t('Normal transfer without keep-alive checks'),
            onChange: setIsProtected,
            value: isProtected
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "paper-plane",
          isDisabled: !recipientId || !amount,
          label: t('Send'),
          onStart: toggleOpen,
          params: [assetId, recipientId, amount],
          tx: isProtected ? api.tx.assets.transferKeepAlive : api.tx.assets.transfer
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Transfer);

exports.default = _default;