"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ZERO_HASH = (0, _utilCrypto.blake2AsHex)('');

function PreImage({
  className = '',
  imageHash,
  isImminent = false,
  onClose
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    apiDefaultTxSudo
  } = (0, _reactHooks.useApi)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [{
    encodedHash,
    encodedProposal,
    storageFee
  }, setHash] = (0, _react.useState)({
    encodedHash: ZERO_HASH,
    encodedProposal: '',
    storageFee: _util.BN_ZERO
  });
  const [proposal, setProposal] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    const encodedProposal = (proposal === null || proposal === void 0 ? void 0 : proposal.method.toHex()) || '';
    const storageFee = api.consts.democracy.preimageByteDeposit.mul(encodedProposal ? new _bn.default((encodedProposal.length - 2) / 2) : _util.BN_ZERO);
    setHash({
      encodedHash: (0, _utilCrypto.blake2AsHex)(encodedProposal),
      encodedProposal,
      storageFee
    });
  }, [api, proposal]);
  const isMatched = imageHash ? imageHash.eq(encodedHash) : true;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Submit preimage'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('This account will pay the fees for the preimage, based on the size thereof.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          help: t('The account you want to register the preimage from'),
          label: t('send from account'),
          labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Available, {
            label: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "label",
              children: t('transferrable')
            }),
            params: accountId
          }),
          onChange: setAccountId,
          type: "account"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('The image (proposal) will be stored on-chain against the hash of the contents.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('When submitting a proposal the hash needs to be known. Proposals can be submitted with hash-only, but upon dispatch the preimage needs to be available.')
          })]
        }),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Extrinsic, {
          defaultValue: apiDefaultTxSudo,
          label: t('propose'),
          onChange: setProposal
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          className: "disabledLook",
          help: t('The hash of the selected proposal, use it for submitting the proposal'),
          isDisabledError: !isMatched,
          label: t('preimage hash'),
          value: encodedHash
        })]
      }), !isImminent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The calculated storage costs based on the size and the per-bytes fee.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          defaultValue: storageFee,
          help: t('The amount reserved to store this image'),
          isDisabled: true,
          label: t('calculated storage fee')
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        icon: "plus",
        isDisabled: !proposal || !accountId || !isMatched || !encodedProposal,
        label: t('Submit preimage'),
        onStart: onClose,
        params: [encodedProposal],
        tx: isImminent ? api.tx.democracy.noteImminentPreimage : api.tx.democracy.notePreimage
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(PreImage).withConfig({
  displayName: "PreImage",
  componentId: "sc-alj06f-0"
})([".toggleImminent{margin:0.5rem 0;text-align:right;}.disabledLook input{background:transparent;border-style:dashed;&:focus{background:transparent;border-color:#d9d8d7;}}"]));

exports.default = _default;