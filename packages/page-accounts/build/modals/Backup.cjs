"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fileSaver = _interopRequireDefault(require("file-saver"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _uiKeyring = require("@axia-js/ui-keyring");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Backup({
  address,
  onClose
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isBusy, setIsBusy] = (0, _react.useState)(false);
  const [{
    isPassTouched,
    password
  }, setPassword] = (0, _react.useState)({
    isPassTouched: false,
    password: ''
  });
  const [backupFailed, setBackupFailed] = (0, _react.useState)(false);

  const isPassValid = !backupFailed && _uiKeyring.keyring.isPassValid(password);

  const _onChangePass = (0, _react.useCallback)(password => {
    setBackupFailed(false);
    setPassword({
      isPassTouched: true,
      password
    });
  }, []);

  const _doBackup = (0, _react.useCallback)(() => {
    setIsBusy(true);
    setTimeout(() => {
      try {
        const addressKeyring = address && _uiKeyring.keyring.getPair(address);

        const json = addressKeyring && _uiKeyring.keyring.backupAccount(addressKeyring, password);

        const blob = new Blob([JSON.stringify(json)], {
          type: 'application/json; charset=utf-8'
        });

        _fileSaver.default.saveAs(blob, `${address}.json`);
      } catch (error) {
        setBackupFailed(true);
        setIsBusy(false);
        console.error(error);
        return;
      }

      setIsBusy(false);
      onClose();
    }, 0);
  }, [address, onClose, password]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: "app--accounts-Modal",
    header: t('Backup account'),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.AddressRow, {
        isInline: true,
        value: address,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('An encrypted backup file will be created once you have pressed the "Download" button. This can be used to re-import your account on any other machine.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('Save this backup file in a secure location. Additionally, the password associated with this account is needed together with this backup file in order to restore your account.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Password, {
            autoFocus: true,
            help: t('The account password as specified when creating the account. This is used to encrypt the backup file and subsequently decrypt it when restoring the account.'),
            isError: isPassTouched && !isPassValid,
            label: t('password'),
            onChange: _onChangePass,
            onEnter: _doBackup,
            tabIndex: 0,
            value: password
          })
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "download",
        isBusy: isBusy,
        isDisabled: !isPassValid,
        label: t('Download'),
        onClick: _doBackup
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Backup);

exports.default = _default;