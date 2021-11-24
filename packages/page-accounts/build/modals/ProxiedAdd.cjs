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

var _useProxies = _interopRequireDefault(require("../Accounts/useProxies.cjs"));

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function createProxy(address, _ref, success) {
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
    _uiKeyring.keyring.addExternal(address, {
      genesisHash,
      isProxied: true,
      name,
      tags
    });

    status.account = address;
    status.status = 'success';
    status.message = success;
  } catch (error) {
    status.status = 'error';
    status.message = error.message;
  }

  return status;
}

function ProxyAdd(_ref2) {
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
  const [{
    isNameValid,
    name
  }, setName] = (0, _react.useState)({
    isNameValid: false,
    name: ''
  });
  const [stashAddress, setStashAddress] = (0, _react.useState)(null);
  const {
    hasOwned
  } = (0, _useProxies.default)(stashAddress);

  const _createProxied = (0, _react.useCallback)(() => {
    if (stashAddress) {
      const options = {
        genesisHash: isDevelopment ? undefined : api.genesisHash.toString(),
        name: name.trim()
      };
      const status = createProxy(stashAddress, options, t('added proxy'));
      onStatusChange(status);
      onClose();
    }
  }, [api.genesisHash, isDevelopment, name, onClose, onStatusChange, stashAddress, t]);

  const _onChangeName = (0, _react.useCallback)(name => setName({
    isNameValid: name.trim().length >= 3,
    name
  }), []);

  const isValid = isNameValid && !!stashAddress && hasOwned;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Add proxied account'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The address that has previously setup a proxy to one of the accounts that you control.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddressSimple, {
          autoFocus: true,
          help: t('The address that you have a valid proxy setup for.'),
          isError: !hasOwned,
          label: t('proxied account'),
          onChange: setStashAddress,
          placeholder: t('stash address')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The name is for unique identification of the account in your owner lists.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          className: "full",
          help: t('Name given to this proxied account. You can edit it at any later point in time.'),
          isError: !isNameValid,
          label: t('name'),
          onChange: _onChangeName,
          placeholder: t('proxied name')
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        isDisabled: !isValid,
        label: t('Add'),
        onClick: _createProxied
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ProxyAdd);

exports.default = _default;