"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _translate = require("../translate.cjs");

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
const defaultValidate = () => true;

function convertInput(value) {
  if (value === '0x') {
    return [true, new Uint8Array([])];
  } else if (value.startsWith('0x')) {
    try {
      return [true, (0, _util.hexToU8a)(value)];
    } catch (error) {
      return [false, new Uint8Array([])];
    }
  } // maybe it is an ss58?


  try {
    return [true, (0, _utilCrypto.decodeAddress)(value)];
  } catch (error) {// we continue
  }

  return (0, _util.isAscii)(value) ? [true, (0, _util.stringToU8a)(value)] : [value === '0x', new Uint8Array([])];
}

function BaseBytes(_ref) {
  let {
    asHex,
    children,
    className = '',
    defaultValue: {
      value
    },
    isDisabled,
    isError,
    label,
    length = -1,
    onChange,
    onEnter,
    onEscape,
    size = 'full',
    validate = defaultValidate,
    withCopy,
    withLabel,
    withLength
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [defaultValue] = (0, _react.useState)(value ? isDisabled && (0, _util.isU8a)(value) && (0, _util.isAscii)(value) ? (0, _util.u8aToString)(value) : (0, _util.isHex)(value) ? value : (0, _util.u8aToHex)(value, isDisabled ? 256 : -1) : undefined);
  const [isValid, setIsValid] = (0, _react.useState)(false);

  const _onChange = (0, _react.useCallback)(hex => {
    let [isValid, value] = convertInput(hex);
    isValid = isValid && validate(value) && (length !== -1 ? value.length === length : value.length !== 0 || hex === '0x');

    if (withLength && isValid) {
      value = (0, _util.compactAddLength)(value);
    }

    onChange && onChange({
      isValid,
      value: asHex ? (0, _util.u8aToHex)(value) : value
    });
    setIsValid(isValid);
  }, [asHex, length, onChange, validate, withLength]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bare.default, {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Input, {
      className: size,
      defaultValue: defaultValue,
      isAction: !!children,
      isDisabled: isDisabled,
      isError: isError || !isValid,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      placeholder: t('0x prefixed hex, e.g. 0x1234 or ascii data'),
      type: "text",
      withEllipsis: true,
      withLabel: withLabel,
      children: [children, withCopy && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CopyButton, {
        value: defaultValue
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(BaseBytes);

exports.default = _default;