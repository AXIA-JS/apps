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

var _uiSettings = require("@axia-js/ui-settings");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Verify({
  className = ''
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    isEthereum
  } = (0, _reactHooks.useApi)();
  const [{
    cryptoType,
    isValid
  }, setValidity] = (0, _react.useState)({
    cryptoType: 'unknown',
    isValid: false
  });
  const [{
    data,
    isHexData
  }, setData] = (0, _react.useState)({
    data: '',
    isHexData: false
  });
  const [{
    isValidPk,
    publicKey
  }, setPublicKey] = (0, _react.useState)({
    isValidPk: false,
    publicKey: null
  });
  const [{
    isValidSignature,
    signature
  }, setSignature] = (0, _react.useState)({
    isValidSignature: false,
    signature: ''
  });
  const [cryptoOptions] = (0, _react.useState)([{
    text: t('Crypto not detected'),
    value: 'unknown'
  }].concat(_uiSettings.settings.availableCryptos));
  (0, _react.useEffect)(() => {
    let cryptoType = 'unknown';
    let isValid = isValidPk && isValidSignature; // We use signatureVerify to detect validity and crypto type

    if (isValid && publicKey) {
      const verification = (0, _utilCrypto.signatureVerify)(data, signature, publicKey);

      if (verification.crypto !== 'none') {
        isValid = verification.isValid;
        cryptoType = verification.crypto;
      }
    }

    setValidity({
      cryptoType,
      isValid
    });
  }, [data, isValidPk, isValidSignature, publicKey, signature]);

  const _onChangeAddress = (0, _react.useCallback)(accountId => {
    let publicKey = null;

    try {
      publicKey = _uiKeyring.keyring.decodeAddress(accountId || '');
    } catch (err) {
      console.error(err);
    }

    setPublicKey({
      isValidPk: !!publicKey && (publicKey.length === 32 || isEthereum && publicKey.length === 20),
      publicKey
    });
  }, [isEthereum]);

  const _onChangeData = (0, _react.useCallback)(data => setData({
    data,
    isHexData: (0, _util.isHex)(data)
  }), []);

  const _onChangeSignature = (0, _react.useCallback)(signature => setSignature({
    isValidSignature: (0, _util.isHex)(signature) && (signature.length === 130 || isEthereum && signature.length === 132),
    signature
  }), [isEthereum]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `toolbox--Verify ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        className: "full",
        help: t('The account that signed the input'),
        isError: !isValidPk,
        isInput: true,
        label: t('verify using address'),
        onChange: _onChangeAddress
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        autoFocus: true,
        className: "full",
        help: t('The data that was signed. This is used in combination with the signature for the verification. It can either be hex or a string.'),
        label: t('using the following data'),
        onChange: _onChangeData,
        value: data
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--row",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--AlignedIconContainer",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
          className: "alignedBadge",
          color: isValid ? 'green' : isValidSignature ? 'red' : 'gray',
          icon: isValid ? 'check' : isValidSignature ? 'exclamation' : 'question'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        className: "full",
        help: t('The signature as by the account being checked, supplied as a hex-formatted string.'),
        isError: !isValidSignature,
        label: t('the supplied signature'),
        onChange: _onChangeSignature,
        value: signature
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--row",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        defaultValue: cryptoType,
        help: t('Cryptography used to create this signature. It is auto-detected on valid signatures.'),
        isDisabled: true,
        label: t('signature crypto type'),
        options: cryptoOptions
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
        className: "medium",
        help: t('Detection on the input string to determine if it is hex or non-hex.'),
        label: t('hex input data'),
        value: isHexData ? t('Yes') : t('No')
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Verify).withConfig({
  displayName: "Verify",
  componentId: "sc-12u6rzz-0"
})([".ui--AlignedIconContainer{position:absolute;z-index:1;}.alignedBadge{left:1.25rem;position:relative;top:1.25rem;}"]));

exports.default = _default;