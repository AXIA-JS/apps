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

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Validator(_ref) {
  let {
    address,
    index,
    setAddress,
    t
  } = _ref;

  const _setAddress = (0, _react.useCallback)(value => value && setAddress(index, value), [index, setAddress]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
    defaultValue: address,
    label: t('validator {{index}}', {
      replace: {
        index: index + 1
      }
    }),
    onChange: _setAddress
  });
}

function Propose(_ref2) {
  var _api$tx$proposeAllych;

  let {
    className,
    onClose
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [name, setName] = (0, _react.useState)('');
  const [allyId, setAllyId] = (0, _react.useState)();
  const [balance, setBalance] = (0, _react.useState)(() => _util.BN_THOUSAND.mul(_util.BN_TEN.pow(new _bn.default(api.registry.chainDecimals[0]))));
  const [validators, setValidators] = (0, _react.useState)(['']);
  const [{
    isWasmValid,
    wasm
  }, setWasm] = (0, _react.useState)({
    isWasmValid: false,
    wasm: null
  });
  const [genesisState, setGenesisState] = (0, _react.useState)(null);

  const _setGenesisState = (0, _react.useCallback)(data => setGenesisState((0, _util.compactAddLength)(data)), []);

  const _setWasm = (0, _react.useCallback)((wasm, isWasmValid) => setWasm({
    isWasmValid,
    wasm
  }), []);

  const _setAddress = (0, _react.useCallback)((index, address) => setValidators(v => v.map((v, i) => i === index ? address : v)), []);

  const _addValidator = (0, _react.useCallback)(() => setValidators(v => [...v, '']), []);

  const _delValidator = (0, _react.useCallback)(() => setValidators(v => [...v.slice(0, v.length - 1)]), []);

  const isNameValid = name.length >= 3;
  const isValDuplicate = validators.some((a, ai) => validators.some((b, bi) => ai !== bi && a === b));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Propose allychain'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('This account will be associated with the allychain and pay the deposit.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          label: t('propose from'),
          onChange: setAccountId,
          type: "account",
          value: accountId
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The name for this allychain, the id and the allocated/requested balance.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          isError: !isNameValid,
          label: t('allychain name'),
          onChange: setName
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
          isZeroable: false,
          label: t('requested id'),
          onChange: setAllyId
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          defaultValue: balance,
          label: t('initial balance'),
          onChange: setBalance
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The WASM validation function as well as the genesis state for this allychain.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputWasm, {
          help: t('The compiled runtime WASM for the allychain you wish to register.'),
          isError: !isWasmValid,
          label: t('validation code'),
          onChange: _setWasm,
          placeholder: wasm && !isWasmValid && t('The code is not recognized as being in valid WASM format')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputFile, {
          help: t('The genesis state for the allychain.'),
          isError: !genesisState,
          label: t('genesis state'),
          onChange: _setGenesisState
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The validators for this allychain. At least one is required and where multiple is supplied, they need to be unique.'),
        children: [validators.map((address, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Validator, {
          address: address,
          index: index,
          setAddress: _setAddress,
          t: t
        }, index)), !validators.length && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: t('You need to supply at last one running validator for your allychain alongside this request.')
        }), isValDuplicate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: t('You have duplicated validator entries, ensure each is unique.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "plus",
            label: t('Add validator'),
            onClick: _addValidator
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "minus",
            isDisabled: validators.length === 0,
            label: t('Remove validator'),
            onClick: _delValidator
          })]
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        icon: "plus",
        isDisabled: !isWasmValid || !genesisState || !isNameValid || !validators.length || !(allyId !== null && allyId !== void 0 && allyId.gt(_util.BN_ZERO)),
        onStart: onClose,
        params: [allyId, name, wasm, genesisState, validators, balance],
        tx: (_api$tx$proposeAllych = api.tx.proposeAllychain) === null || _api$tx$proposeAllych === void 0 ? void 0 : _api$tx$proposeAllych.proposeAllychain
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Propose);

exports.default = _default;