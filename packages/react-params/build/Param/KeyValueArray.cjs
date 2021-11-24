"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Base = _interopRequireDefault(require("./Base.cjs"));

var _Bytes = _interopRequireDefault(require("./Bytes.cjs"));

var _File = _interopRequireDefault(require("./File.cjs"));

var _KeyValue = require("./KeyValue.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
const BYTES_TYPE = {
  info: 0,
  type: 'Bytes'
};
const EMPTY_PLACEHOLDER = 'click to select or drag and drop JSON key/value (hex-encoded) file';

function parseFile(raw) {
  const json = JSON.parse((0, _util.u8aToString)(raw));
  const keys = Object.keys(json);
  let isValid = keys.length !== 0;
  const value = keys.map(key => {
    const value = json[key];
    (0, _util.assert)((0, _util.isHex)(key) && (0, _util.isHex)(value), `Non-hex key/value pair found in ${key.toString()} => ${value.toString()}`);
    const encKey = (0, _KeyValue.createParam)(key);
    const encValue = (0, _KeyValue.createParam)(value);
    isValid = isValid && encKey.isValid && encValue.isValid;
    return [encKey.u8a, encValue.u8a];
  });
  return {
    isValid,
    value
  };
}

function KeyValueArray(_ref) {
  let {
    className = '',
    defaultValue,
    isDisabled,
    isError,
    label,
    onChange,
    onEnter,
    onEscape,
    withLabel
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [placeholder, setPlaceholder] = (0, _react.useState)(t(EMPTY_PLACEHOLDER));

  const _onChange = (0, _react.useCallback)(raw => {
    let encoded = {
      isValid: false,
      value: []
    };

    try {
      encoded = parseFile(raw);
      setPlaceholder(t('{{count}} key/value pairs encoded for submission', {
        replace: {
          count: encoded.value.length
        }
      }));
    } catch (error) {
      console.error('Error converting json k/v', error);
      setPlaceholder(t(EMPTY_PLACEHOLDER));
    }

    onChange && onChange(encoded);
  }, [onChange, t]);

  if (isDisabled) {
    const pairs = defaultValue.value;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.default, {
        className: className,
        label: label,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--Params",
        children: pairs.map(_ref2 => {
          let [key, value] = _ref2;
          const keyHex = (0, _util.u8aToHex)(key.toU8a(true));
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bytes.default, {
            defaultValue: {
              value
            },
            isDisabled: true,
            label: keyHex,
            name: keyHex,
            onEnter: onEnter,
            onEscape: onEscape,
            type: BYTES_TYPE
          }, keyHex);
        })
      })]
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_File.default, {
    className: className,
    isDisabled: isDisabled,
    isError: isError,
    label: label,
    onChange: _onChange,
    placeholder: placeholder,
    withLabel: withLabel
  });
}

var _default = /*#__PURE__*/_react.default.memo(KeyValueArray);

exports.default = _default;