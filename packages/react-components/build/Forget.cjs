"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getContent(mode, t) {
  switch (mode) {
    case 'account':
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('You are about to remove this account from your list of available accounts. Once completed, should you need to access it again, you will have to re-create the account either via seed or via a backup file.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('This operation does not remove the history of the account from the chain, nor any associated funds from the account. The forget operation only limits your access to the account on this browser.')
        })]
      });

    case 'address':
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('You are about to remove this address from your address book. Once completed, should you need to access it again, you will have to re-add the address.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('This operation does not remove the history of the account from the chain, nor any associated funds from the account. The forget operation only limits your access to the address on this browser.')
        })]
      });

    case 'contract':
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('You are about to remove this contract from your list of available contracts. Once completed, should you need to access it again, you will have to manually add the contract\'s address in the Instantiate tab.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('This operation does not remove the history of the contract from the chain, nor any associated funds from its account. The forget operation only limits your access to the contract on this browser.')
        })]
      });

    default:
      return null;
  }
}

function getHeaderText(mode, t) {
  switch (mode) {
    case 'account':
      return t('Confirm account removal');

    case 'address':
      return t('Confirm address removal');

    case 'contract':
      return t('Confirm contract removal');

    case 'code':
      return t('Confirm code removal');
  }
}

function renderContent(props, t) {
  const {
    address,
    mode = 'account'
  } = props;

  switch (mode) {
    case 'account':
    case 'address':
    case 'contract':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressRow, {
        isInline: true,
        value: address || '',
        children: getContent(mode, t)
      });

    default:
      return null;
  }
}

function Forget(props) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    children,
    mode = 'account',
    onClose,
    onForget
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: "app--accounts-Modal",
    header: getHeaderText(mode, t),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: children || renderContent(props, t)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "trash",
        label: t('Forget'),
        onClick: onForget
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Forget);

exports.default = _default;