"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _translate = require("../translate.cjs");

var _PasswordInput = _interopRequireDefault(require("./PasswordInput.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function QrModal(_ref) {
  let {
    className = '',
    onClose,
    onStatusChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    isEthereum
  } = (0, _reactHooks.useApi)();
  const {
    isIpfs
  } = (0, _reactHooks.useIpfs)();
  const [{
    isNameValid,
    name
  }, setName] = (0, _react.useState)({
    isNameValid: false,
    name: ''
  });
  const [{
    address,
    isAddress,
    scanned,
    warning
  }, setAddress] = (0, _react.useState)({
    address: '',
    isAddress: false,
    scanned: null
  });
  const [{
    isPasswordValid,
    password
  }, setPassword] = (0, _react.useState)({
    isPasswordValid: false,
    password: ''
  });
  const isValid = !!address && isNameValid && (isAddress || isPasswordValid);

  const _onNameChange = (0, _react.useCallback)(name => setName({
    isNameValid: !!name.trim(),
    name
  }), []);

  const _onPasswordChange = (0, _react.useCallback)((password, isPasswordValid) => setPassword({
    isPasswordValid,
    password
  }), []);

  const _onScan = (0, _react.useCallback)(scanned => {
    setAddress({
      address: scanned.isAddress ? scanned.content : _uiKeyring.keyring.createFromUri(scanned.content, {}, 'sr25519').address,
      isAddress: scanned.isAddress,
      scanned
    });

    if (scanned.name) {
      _onNameChange(scanned.name);
    }
  }, [_onNameChange]);

  const _onError = (0, _react.useCallback)(err => {
    setAddress({
      address: '',
      isAddress: false,
      scanned: null,
      warning: err.message
    });
  }, []);

  const _onSave = (0, _react.useCallback)(() => {
    if (!scanned || !isValid) {
      return;
    }

    const {
      content,
      isAddress
    } = scanned;
    const meta = {
      genesisHash: scanned.genesisHash || api.genesisHash.toHex(),
      name: name.trim()
    };
    const account = isAddress ? isEthereum ? _uiKeyring.keyring.addExternal(content).pair.address : _uiKeyring.keyring.addExternal(content, meta).pair.address : _uiKeyring.keyring.addUri(content, password, meta, 'sr25519').pair.address;

    _reactComponents.InputAddress.setLastValue('account', account);

    onStatusChange({
      account,
      action: 'create',
      message: t('created account'),
      status: 'success'
    });
    onClose();
  }, [api, isValid, name, onClose, onStatusChange, password, scanned, isEthereum, t]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Add account via Qr'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: scanned ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressRow, {
            defaultName: name,
            noDefaultNameOpacity: true,
            value: scanned.content
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The local name for this account. Changing this does not affect your on-line identity, so this is only used to indicate the name of the account locally.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            autoFocus: true,
            className: "full",
            help: t('Name given to this account. You can change it at any point in the future.'),
            isError: !isNameValid,
            label: t('name'),
            onChange: _onNameChange,
            onEnter: _onSave,
            value: name
          })
        }), !isAddress && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PasswordInput.default, {
          onChange: _onPasswordChange,
          onEnter: _onSave
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('Provide the account QR from the module/external application for scanning. Once detected as valid, you will be taken to the next step to add the account to your list.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "qr-wrapper",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.QrScanAddress, {
            isEthereum: isEthereum,
            onError: _onError,
            onScan: _onScan
          })
        }), warning && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: warning
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        isDisabled: !scanned || !isValid || !isAddress && isIpfs,
        label: t('Save'),
        onClick: _onSave
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(QrModal).withConfig({
  displayName: "Qr",
  componentId: "sc-38hcdt-0"
})([".qr-wrapper{margin:0 auto;max-width:30rem;}"]));

exports.default = _default;