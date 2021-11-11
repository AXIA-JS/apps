"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SignFields({
  address,
  onChange,
  signedTx
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [blocks, setBlocks] = (0, _react.useState)(() => new _bn.default(64));
  const [nonce, setNonce] = (0, _react.useState)(_util.BN_ZERO);
  const {
    t
  } = (0, _translate.useTranslation)();
  (0, _react.useEffect)(() => {
    address && api.derive.balances.account(address).then(({
      accountNonce
    }) => setNonce(accountNonce)).catch(console.error);
  }, [address, api]);
  (0, _react.useEffect)(() => {
    onChange({
      era: blocks.toNumber(),
      nonce
    });
  }, [blocks, nonce, onChange]);

  const _setBlocks = (0, _react.useCallback)((blocks = _util.BN_ZERO) => setBlocks(blocks), []);

  const _setNonce = (0, _react.useCallback)((nonce = _util.BN_ZERO) => setNonce(nonce), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
      hint: t('Override any applicable values for the specific signed output. These will be used to construct and display the signed transaction.'),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
        isDisabled: !!signedTx,
        isZeroable: true,
        label: t('Nonce'),
        labelExtra: t('Current account nonce: {{accountNonce}}', {
          replace: {
            accountNonce: nonce
          }
        }),
        onChange: _setNonce,
        value: nonce
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
        isDisabled: !!signedTx,
        isZeroable: true,
        label: t('Lifetime (# of blocks)'),
        labelExtra: t('Set to 0 to make transaction immortal'),
        onChange: _setBlocks,
        value: blocks
      })]
    }), !!signedTx && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The actual fully constructed signed output. This can be used for submission via other channels.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
        isFull: true,
        isTrimmed: true,
        label: t('Signed transaction'),
        value: signedTx,
        withCopy: true
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SignFields);

exports.default = _default;