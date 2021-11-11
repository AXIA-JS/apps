"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _index = require("../shared/index.cjs");

var _translate = require("../translate.cjs");

var _useAbi = _interopRequireDefault(require("../useAbi.cjs"));

var _ValidateAddr = _interopRequireDefault(require("./ValidateAddr.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Add({
  onClose
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [address, setAddress] = (0, _react.useState)(null);
  const [isAddressValid, setIsAddressValid] = (0, _react.useState)(false);
  const [name, isNameValid, setName] = (0, _reactHooks.useNonEmptyString)('New Contract');
  const {
    abi,
    contractAbi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi
  } = (0, _useAbi.default)([null, null], null, true);

  const _onAdd = (0, _react.useCallback)(() => {
    const status = {
      action: 'create'
    };

    if (!address || !abi || !name) {
      return;
    }

    try {
      const json = {
        contract: {
          abi,
          genesisHash: api.genesisHash.toHex()
        },
        name,
        tags: []
      };

      _uiKeyring.keyring.saveContract(address, json);

      status.account = address;
      status.status = address ? 'success' : 'error';
      status.message = 'contract added';
      onClose();
    } catch (error) {
      console.error(error);
      status.status = 'error';
      status.message = error.message;
    }
  }, [abi, address, api, name, onClose]);

  const isValid = isAddressValid && isNameValid && isAbiValid;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Add an existing contract'),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.AddressRow, {
        defaultName: name,
        isValid: true,
        value: address || null,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          help: t('The address for the deployed contract instance.'),
          isError: !isAddressValid,
          label: t('contract address'),
          onChange: setAddress,
          value: address || ''
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidateAddr.default, {
          address: address,
          onChange: setIsAddressValid
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputName, {
          isContract: true,
          isError: !isNameValid,
          onChange: setName,
          value: name || undefined
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ABI, {
          contractAbi: contractAbi,
          errorText: errorText,
          isError: isAbiError || !isAbiValid,
          isSupplied: isAbiSupplied,
          isValid: isAbiValid,
          onChange: onChangeAbi,
          onRemove: onRemoveAbi
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "save",
        isDisabled: !isValid,
        label: t('Save'),
        onClick: _onAdd
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Add);

exports.default = _default;