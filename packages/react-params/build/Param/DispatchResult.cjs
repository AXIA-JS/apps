"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _DispatchError = _interopRequireDefault(require("./DispatchError.cjs"));

var _Static = _interopRequireDefault(require("./Static.cjs"));

var _Unknown = _interopRequireDefault(require("./Unknown.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isDispatchResultErr(value) {
  return !!(value && value.isErr);
}

function DispatchResultDisplay(props) {
  const {
    defaultValue,
    isDisabled,
    label
  } = props;
  const dispatchError = (0, _react.useMemo)(() => defaultValue && isDispatchResultErr(defaultValue.value) ? {
    isValid: true,
    value: defaultValue.value.asErr
  } : null, [defaultValue]);

  if (!isDisabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unknown.default, _objectSpread({}, props));
  } else if (!dispatchError) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, _objectSpread(_objectSpread({}, props), {}, {
      defaultValue: {
        isValid: true,
        value: 'Ok'
      }
    }));
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DispatchError.default, _objectSpread(_objectSpread({}, props), {}, {
    childrenPre: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      className: "full",
      isDisabled: true,
      label: label,
      value: "Err"
    }),
    defaultValue: dispatchError,
    label: "DispatchError"
  }));
}

var _default = /*#__PURE__*/_react.default.memo(DispatchResultDisplay);

exports.default = _default;