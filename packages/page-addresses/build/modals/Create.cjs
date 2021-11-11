"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Create({
  onClose,
  onStatusChange
}) {
  var _info$accountId;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    isEthereum
  } = (0, _reactHooks.useApi)();
  const [{
    isNameValid,
    name
  }, setName] = (0, _react.useState)({
    isNameValid: false,
    name: ''
  });
  const [{
    address,
    addressInput,
    isAddressExisting,
    isAddressValid
  }, setAddress] = (0, _react.useState)({
    address: '',
    addressInput: '',
    isAddressExisting: false,
    isAddressValid: false,
    isPublicKey: false
  });
  const info = (0, _reactHooks.useCall)(!!address && isAddressValid && api.derive.accounts.info, [address]);
  const isValid = isAddressValid && isNameValid && !!(info !== null && info !== void 0 && info.accountId);

  const _onChangeAddress = (0, _react.useCallback)(addressInput => {
    let address = '';
    let isAddressValid = true;
    let isAddressExisting = false;
    let isPublicKey = false;

    try {
      if (isEthereum) {
        const rawAddress = (0, _util.hexToU8a)(addressInput);
        address = (0, _utilCrypto.ethereumEncode)(rawAddress);
        isPublicKey = rawAddress.length === 20;
      } else {
        const publicKey = _uiKeyring.keyring.decodeAddress(addressInput);

        address = _uiKeyring.keyring.encodeAddress(publicKey);
        isPublicKey = publicKey.length === 32;
      }

      if (!isAddressValid) {
        const old = _uiKeyring.keyring.getAddress(address);

        if (old) {
          const newName = old.meta.name || name;
          isAddressExisting = true;
          isAddressValid = true;
          setName({
            isNameValid: !!(newName || '').trim(),
            name: newName
          });
        }
      }
    } catch (error) {
      isAddressValid = false;
    }

    setAddress({
      address: isAddressValid ? address : '',
      addressInput,
      isAddressExisting,
      isAddressValid,
      isPublicKey
    });
  }, [isEthereum, name]);

  const _onChangeName = (0, _react.useCallback)(name => setName({
    isNameValid: !!name.trim(),
    name
  }), []);

  const _onCommit = (0, _react.useCallback)(() => {
    const status = {
      action: 'create'
    };

    if (!isValid || !(info !== null && info !== void 0 && info.accountId)) {
      return;
    }

    try {
      const address = info.accountId.toString();

      _uiKeyring.keyring.saveAddress(address, {
        genesisHash: _uiKeyring.keyring.genesisHash,
        name: name.trim(),
        tags: []
      });

      status.account = address;
      status.status = address ? 'success' : 'error';
      status.message = isAddressExisting ? t('address edited') : t('address created');

      _reactComponents.InputAddress.setLastValue('address', address);
    } catch (error) {
      status.status = 'error';
      status.message = error.message;
    }

    onStatusChange(status);
    onClose();
  }, [info, isAddressExisting, isValid, name, onClose, onStatusChange, t]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Add an address'),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.AddressRow, {
        defaultName: name,
        noDefaultNameOpacity: true,
        value: isAddressValid ? info === null || info === void 0 ? void 0 : (_info$accountId = info.accountId) === null || _info$accountId === void 0 ? void 0 : _info$accountId.toString() : undefined,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          className: "full",
          help: t('Paste here the address of the contact you want to add to your address book.'),
          isError: !isAddressValid,
          label: t('address'),
          onChange: _onChangeAddress,
          onEnter: _onCommit,
          placeholder: t('new address'),
          value: addressInput
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          className: "full",
          help: t('Type the name of your contact. This name will be used across all the apps. It can be edited later on.'),
          isError: !isNameValid,
          label: t('name'),
          onChange: _onChangeName,
          onEnter: _onCommit,
          value: name
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "save",
        isDisabled: !isValid,
        label: t('Save'),
        onClick: _onCommit
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Create);

exports.default = _default;