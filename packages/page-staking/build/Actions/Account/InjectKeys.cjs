"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const CRYPTO_MAP = {
  aura: ['ed25519', 'sr25519'],
  babe: ['sr25519'],
  gran: ['ed25519'],
  imon: ['ed25519', 'sr25519'],
  para: ['sr25519']
};
const EMPTY_KEY = '0x';

function InjectKeys({
  onClose
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    queueRpc
  } = (0, _react.useContext)(_reactComponents.StatusContext); // this needs to align with what is set as the first value in `type`

  const [crypto, setCrypto] = (0, _react.useState)('sr25519');
  const [publicKey, setPublicKey] = (0, _react.useState)(EMPTY_KEY);
  const [suri, setSuri] = (0, _react.useState)('');
  const [keyType, setKeyType] = (0, _react.useState)('babe');
  const keyTypeOptRef = (0, _react.useRef)([{
    text: t('Aura'),
    value: 'aura'
  }, {
    text: t('Babe'),
    value: 'babe'
  }, {
    text: t('Grandpa'),
    value: 'gran'
  }, {
    text: t('I\'m Online'),
    value: 'imon'
  }, {
    text: t('Parachains'),
    value: 'para'
  }]);
  (0, _react.useEffect)(() => {
    setCrypto(CRYPTO_MAP[keyType][0]);
  }, [keyType]);
  (0, _react.useEffect)(() => {
    try {
      const {
        phrase
      } = (0, _utilCrypto.keyExtractSuri)(suri);
      (0, _util.assert)((0, _utilCrypto.mnemonicValidate)(phrase), 'Invalid mnemonic phrase');
      setPublicKey((0, _util.u8aToHex)(_uiKeyring.keyring.createFromUri(suri, {}, crypto).publicKey));
    } catch (error) {
      setPublicKey(EMPTY_KEY);
    }
  }, [crypto, suri]);

  const _onSubmit = (0, _react.useCallback)(() => queueRpc({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rpc: {
      method: 'insertKey',
      section: 'author'
    },
    values: [keyType, suri, publicKey]
  }), [keyType, publicKey, queueRpc, suri]);

  const _cryptoOptions = (0, _react.useMemo)(() => CRYPTO_MAP[keyType].map(value => ({
    text: value === 'ed25519' ? t('ed25519, Edwards') : t('sr15519, Schnorrkel'),
    value
  })), [keyType, t]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Inject Keys'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The seed and derivation path will be submitted to the validator node. this is an advanced operation, only to be performed when you are sure of the security and connection risks.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          isError: publicKey.length !== 66,
          label: t('suri (seed & derivation)'),
          onChange: setSuri,
          value: suri
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: t('This operation will submit the seed via an RPC call. Do not perform this operation on a public RPC node, but ensure that the node is local, connected to your validator and secure.')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The key type and crypto type to use for this key. Be aware that different keys have different crypto requirements. You should be familiar with the type requirements for the different keys.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          label: t('key type to set'),
          onChange: setKeyType,
          options: keyTypeOptRef.current,
          value: keyType
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          isDisabled: _cryptoOptions.length === 1,
          label: t('crypto type to use'),
          onChange: setCrypto,
          options: _cryptoOptions,
          value: crypto
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('This pubic key is what will be visible in your queued keys list. It is generated based on the seed and the crypto used.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          isDisabled: true,
          label: t('generated public key'),
          value: publicKey
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "sign-in-alt",
        label: t('Submit key'),
        onClick: _onSubmit
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(InjectKeys);

exports.default = _default;