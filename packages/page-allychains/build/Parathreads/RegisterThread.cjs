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

var _InputOwner = _interopRequireDefault(require("../InputOwner.cjs"));

var _translate = require("../translate.cjs");

var _constants = require("./constants.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function RegisterThread(_ref) {
  let {
    className,
    nextParaId,
    onClose,
    ownedIds
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [paraId, setParaId] = (0, _react.useState)();
  const [wasm, setWasm] = (0, _react.useState)(null);
  const [genesisState, setGenesisState] = (0, _react.useState)(null);

  const _setGenesisState = (0, _react.useCallback)(data => setGenesisState((0, _util.compactAddLength)(data)), []);

  const _setWasm = (0, _react.useCallback)(data => setWasm((0, _util.compactAddLength)(data)), []);

  const _setOwner = (0, _react.useCallback)(_ref2 => {
    let {
      accountId,
      paraId
    } = _ref2;
    setAccountId(accountId);
    setParaId(new _bn.default(paraId));
  }, []);

  const reservedDeposit = (0, _react.useMemo)(() => api.consts.registrar.paraDeposit.add(api.consts.registrar.dataDepositPerByte.muln(wasm ? wasm.length : 0)).iadd(api.consts.registrar.dataDepositPerByte.muln(genesisState ? genesisState.length : 0)), [api, wasm, genesisState]);
  const isIdError = !paraId || !paraId.gt(_constants.LOWEST_INVALID_ID);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Register parathread'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [api.tx.registrar.reserve ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputOwner.default, {
        noCodeCheck: true,
        onChange: _setOwner,
        ownedIds: ownedIds
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('This account will be associated with the allychain and pay the deposit.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            label: t('register from'),
            onChange: setAccountId,
            type: "account",
            value: accountId
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The id of this allychain as known on the network'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            autoFocus: true,
            defaultValue: nextParaId,
            isError: isIdError,
            isZeroable: false,
            label: t('allychain id'),
            onChange: setParaId
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The WASM validation function for this allychain.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputFile, {
          help: t('The compiled runtime WASM for the allychain you wish to register.'),
          isError: !wasm,
          label: t('code'),
          onChange: _setWasm
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The genesis state for this allychain.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputFile, {
          help: t('The genesis state for the allychain.'),
          isError: !genesisState,
          label: t('initial state'),
          onChange: _setGenesisState
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The reservation fee for this allychain, including base fee and per-byte fees'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          defaultValue: reservedDeposit,
          isDisabled: true,
          label: t('reserved deposit')
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        icon: "plus",
        isDisabled: !wasm || !genesisState || isIdError,
        onStart: onClose,
        params: [paraId, genesisState, wasm],
        tx: api.tx.registrar.register
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(RegisterThread);

exports.default = _default;