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

var _uiKeyring = require("@axia-js/ui-keyring");

var _useKnownAddresses = _interopRequireDefault(require("../Accounts/useKnownAddresses.cjs"));

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_SIGNATORIES = 16;
const BN_TWO = new _bn.default(2);

function createMultisig(signatories, threshold, _ref, success) {
  let {
    genesisHash,
    name,
    tags = []
  } = _ref;
  // we will fill in all the details below
  const status = {
    action: 'create'
  };

  try {
    const result = _uiKeyring.keyring.addMultisig(signatories, threshold, {
      genesisHash,
      name,
      tags
    });

    const {
      address
    } = result.pair;
    status.account = address;
    status.status = 'success';
    status.message = success;
  } catch (error) {
    status.status = 'error';
    status.message = error.message;
  }

  return status;
}

function Multisig(_ref2) {
  let {
    className = '',
    onClose,
    onStatusChange
  } = _ref2;
  const {
    api,
    isDevelopment
  } = (0, _reactHooks.useApi)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const availableSignatories = (0, _useKnownAddresses.default)();
  const [{
    isNameValid,
    name
  }, setName] = (0, _react.useState)({
    isNameValid: false,
    name: ''
  });
  const [signatories, setSignatories] = (0, _react.useState)(['']);
  const [{
    isThresholdValid,
    threshold
  }, setThreshold] = (0, _react.useState)({
    isThresholdValid: true,
    threshold: BN_TWO
  });

  const _createMultisig = (0, _react.useCallback)(() => {
    const options = {
      genesisHash: isDevelopment ? undefined : api.genesisHash.toString(),
      name: name.trim()
    };
    const status = createMultisig(signatories, threshold, options, t('created multisig'));
    onStatusChange(status);
    onClose();
  }, [api.genesisHash, isDevelopment, name, onClose, onStatusChange, signatories, t, threshold]);

  const _onChangeName = (0, _react.useCallback)(name => setName({
    isNameValid: name.trim().length >= 3,
    name
  }), []);

  const _onChangeThreshold = (0, _react.useCallback)(threshold => threshold && setThreshold({
    isThresholdValid: threshold.gte(BN_TWO) && threshold.lten(signatories.length),
    threshold
  }), [signatories]);

  const isValid = isNameValid && isThresholdValid;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Add multisig'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('The signatories has the ability to create transactions using the multisig and approve transactions sent by others.Once the threshold is reached with approvals, the multisig transaction is enacted on-chain.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('Since the multisig function like any other account, once created it is available for selection anywhere accounts are used and needs to be funded before use.')
          })]
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddressMulti, {
          available: availableSignatories,
          availableLabel: t('available signatories'),
          help: t('The addresses that are able to approve multisig transactions. You can select up to {{maxHelpers}} trusted addresses.', {
            replace: {
              maxHelpers: MAX_SIGNATORIES
            }
          }),
          maxCount: MAX_SIGNATORIES,
          onChange: setSignatories,
          value: signatories,
          valueLabel: t('selected signatories')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The threshold for approval should be less or equal to the number of signatories for this multisig.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
          help: t('The threshold for this multisig'),
          isError: !isThresholdValid,
          label: t('threshold'),
          onChange: _onChangeThreshold,
          value: threshold
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The name is for unique identification of the account in your owner lists.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          className: "full",
          help: t('Name given to this multisig. You can edit it at any later point in time.'),
          isError: !isNameValid,
          label: t('name'),
          onChange: _onChangeName,
          placeholder: t('multisig name')
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        isDisabled: !isValid,
        label: t('Create'),
        onClick: _createMultisig
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Multisig);

exports.default = _default;