"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _BaseBytes = _interopRequireDefault(require("./BaseBytes.cjs"));

var _Static = _interopRequireDefault(require("./Static.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Unknown(props) {
  const {
    className = '',
    defaultValue,
    isDisabled,
    isError,
    label,
    name,
    onChange,
    onEnter,
    onEscape,
    type
  } = props;

  if (isDisabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, _objectSpread({}, props));
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BaseBytes.default, {
    asHex: true,
    className: className,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    label: label,
    length: -1,
    name: name,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    type: type,
    withLength: false
  });
}

var _default = /*#__PURE__*/_react.default.memo(Unknown);

exports.default = _default;