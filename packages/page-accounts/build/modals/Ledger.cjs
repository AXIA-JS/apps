"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AVAIL_INDEXES = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
// new Array(20).fill(0).map((_, index) => index)
const AVAIL_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; // query the ledger for the address, adding it to the keyring

exports.AVAIL_INDEXES = AVAIL_INDEXES;

async function queryLedger(api, getLedger, name, accountOffset, addressOffset) {
  const {
    address
  } = await getLedger().getAddress(false, accountOffset, addressOffset);

  _uiKeyring.keyring.addHardware(address, 'ledger', {
    accountOffset,
    addressOffset,
    genesisHash: api.genesisHash.toHex(),
    name: name || `ledger ${accountOffset}/${addressOffset}`
  });
}

function LedgerModal({
  className,
  onClose
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    getLedger
  } = (0, _reactHooks.useLedger)();
  const [accIndex, setAccIndex] = (0, _react.useState)(0);
  const [addIndex, setAddIndex] = (0, _react.useState)(0);
  const [error, setError] = (0, _react.useState)(null);
  const [{
    isNameValid,
    name
  }, setName] = (0, _react.useState)({
    isNameValid: false,
    name: ''
  });
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const accOps = (0, _react.useRef)(AVAIL_INDEXES.map(value => ({
    text: t('Account type {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));
  const addOps = (0, _react.useRef)(AVAIL_INDEXES.map(value => ({
    text: t('Address index {{index}}', {
      replace: {
        index: value
      }
    }),
    value
  })));

  const _onChangeName = (0, _react.useCallback)(name => setName({
    isNameValid: !!name.trim(),
    name
  }), []);

  const _onSave = (0, _react.useCallback)(() => {
    setError(null);
    setIsBusy(true);
    queryLedger(api, getLedger, name, accIndex, addIndex).then(() => onClose()).catch(error => {
      console.error(error);
      setIsBusy(false);
      setError(error);
    });
  }, [accIndex, addIndex, api, getLedger, name, onClose]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Add account via Ledger'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The name for this account as it will appear under your accounts.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          className: "full",
          help: t('Name given to this account to uniquely identity the account to yourself.'),
          isError: !isNameValid,
          label: t('name'),
          onChange: _onChangeName,
          placeholder: t('account name'),
          value: name
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The account type that you wish to create. This is the top-level derivation.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          help: t('The account type (derivation) to use'),
          label: t('account type'),
          onChange: setAccIndex,
          options: accOps.current,
          value: accIndex
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The address index on the account that you wish to add. This is the second-level derivation.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          help: t('The address index (derivation on account) to use'),
          label: t('address index'),
          onChange: setAddIndex,
          options: addOps.current,
          value: addIndex
        }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
          content: error.message
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        isBusy: isBusy,
        isDisabled: !isNameValid,
        label: t('Save'),
        onClick: _onSave
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(LedgerModal);

exports.default = _default;