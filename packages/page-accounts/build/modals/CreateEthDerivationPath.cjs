"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ETH_DEFAULT_PATH = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ETH_DEFAULT_PATH = "m/44'/60'/0'/0/0";
exports.ETH_DEFAULT_PATH = ETH_DEFAULT_PATH;

function CreateEthDerivationPath(_ref) {
  let {
    className,
    derivePath,
    deriveValidation,
    onChange,
    seedType
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [addIndex, setAddIndex] = (0, _react.useState)(0);
  const [customIndex, setCustomIndex] = (0, _react.useState)(new _bn.default(0));
  const [addressList] = (0, _react.useState)(new Array(10).fill(0).map((_, i) => ({
    key: i,
    text: t('Address index {{index}}', {
      replace: {
        index: i
      }
    }),
    value: i
  })));
  const [useCustomPath, toggleCustomPath] = (0, _reactHooks.useToggle)();
  const [useCustomIndex, toggleCustomIndex] = (0, _reactHooks.useToggle)();
  const errorIndex = (0, _react.useRef)({
    INVALID_DERIVATION_PATH: t('This is an invalid derivation path.'),
    PASSWORD_IGNORED: t('Password are ignored for hex seed'),
    SOFT_NOT_ALLOWED: t('Soft derivation paths are not allowed on ed25519'),
    WARNING_SLASH_PASSWORD: t('Your password contains at least one "/" character. Disregard this warning if it is intended.')
  });
  (0, _react.useEffect)(() => {
    onChange(`m/44'/60'/0'/0/${useCustomIndex ? Number(customIndex) : addIndex}`);
  }, [customIndex, onChange, useCustomIndex, addIndex]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
    className: className,
    hint: seedType === 'raw' ? t('The derivation path is only relevant when deriving keys from a mnemonic.') : t('The derivation path allows you to create different accounts from the same base mnemonic.'),
    children: [seedType === 'bip' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "saveToggle",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Checkbox, {
          label: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: t('Use custom address index')
          }),
          onChange: toggleCustomIndex,
          value: useCustomIndex
        })
      }), useCustomIndex ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
        help: t('You can set a custom derivation index for this account'),
        isDecimal: false,
        label: t('Custom index'),
        onChange: setCustomIndex,
        value: customIndex
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        help: t('The address index (derivation on account) to use'),
        label: t('address index'),
        onChange: setAddIndex,
        options: addressList,
        value: addIndex
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "saveToggle",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Checkbox, {
          label: /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
            children: t('Use custom derivation path')
          }),
          onChange: toggleCustomPath,
          value: useCustomPath
        })
      }), useCustomPath ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        help: t('You can set a custom derivation path for this account using the following syntax "m/<purpose>/<coin_type>/<account>/<change>/<address_index>'),
        isError: !!(deriveValidation !== null && deriveValidation !== void 0 && deriveValidation.error),
        label: t('secret derivation path'),
        onChange: onChange,
        placeholder: ETH_DEFAULT_PATH,
        tabIndex: -1,
        value: derivePath
      }) : null]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
      content: t('The derivation path is only relevant when deriving keys from a mnemonic.')
    }), (deriveValidation === null || deriveValidation === void 0 ? void 0 : deriveValidation.error) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
      content: errorIndex.current[deriveValidation.error] || deriveValidation.error
    }), (deriveValidation === null || deriveValidation === void 0 ? void 0 : deriveValidation.warning) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
      content: errorIndex.current[deriveValidation.warning]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(CreateEthDerivationPath);

exports.default = _default;