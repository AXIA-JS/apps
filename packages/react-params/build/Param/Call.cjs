"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _Unknown = _interopRequireDefault(require("./Unknown.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function CallDisplay(props) {
  const {
    className = '',
    defaultValue: {
      value
    },
    isDisabled,
    label,
    withLabel
  } = props;

  if (!isDisabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unknown.default, _objectSpread({}, props));
  }

  const call = value;
  const {
    method,
    section
  } = call.registry.findMetaCall(call.callIndex);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Bare.default, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Static, {
      className: `${className} full`,
      label: label,
      withLabel: withLabel,
      children: [section, ".", method]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Call, {
      value: call
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(CallDisplay);

exports.default = _default;