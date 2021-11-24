"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _index = require("../shared/index.cjs");

var _store = _interopRequireDefault(require("../store.cjs"));

var _translate = require("../translate.cjs");

var _useAbi = _interopRequireDefault(require("../useAbi.cjs"));

var _ValidateCode = _interopRequireDefault(require("./ValidateCode.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Add(_ref) {
  let {
    onClose
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [codeHash, setCodeHash] = (0, _react.useState)('');
  const [isCodeHashValid, setIsCodeHashValid] = (0, _react.useState)(false);
  const [name, setName] = (0, _react.useState)(null);
  const {
    abi,
    contractAbi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi
  } = (0, _useAbi.default)();

  const _onSave = (0, _react.useCallback)(() => {
    if (!codeHash || !name) {
      return;
    }

    _store.default.saveCode(codeHash, {
      abi,
      name,
      tags: []
    });

    onClose();
  }, [abi, codeHash, name, onClose]);

  const isNameValid = !(0, _util.isNull)(name) && name.length > 0;
  const isValid = isCodeHashValid && isNameValid && isAbiSupplied && isAbiValid;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Add an existing code hash'),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        autoFocus: true,
        help: t('The code hash for the on-chain deployed code.'),
        isError: codeHash.length > 0 && !isCodeHashValid,
        label: t('code hash'),
        onChange: setCodeHash,
        value: codeHash
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidateCode.default, {
        codeHash: codeHash,
        onChange: setIsCodeHashValid
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.InputName, {
        isError: !isNameValid,
        onChange: setName,
        value: name || undefined
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.ABI, {
        contractAbi: contractAbi,
        errorText: errorText,
        isError: isAbiError || !isAbiError,
        isSupplied: isAbiSupplied,
        isValid: isAbiValid,
        onChange: onChangeAbi,
        onRemove: onRemoveAbi
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "save",
        isDisabled: !isValid,
        label: t('Save'),
        onClick: _onSave
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Add);

exports.default = _default;