"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _types = require("@axia-js/types");

var _index = _interopRequireDefault(require("../index.cjs"));

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _Static = _interopRequireDefault(require("./Static.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function EnumParam(props) {
  const {
    className = '',
    defaultValue,
    isDisabled,
    isError,
    label,
    onChange,
    overrides,
    registry,
    type,
    withLabel
  } = props;
  const [current, setCurrent] = (0, _react.useState)(null);
  const [initialValue, setInitialValue] = (0, _react.useState)(null);
  const [{
    options,
    subTypes
  }, setOptions] = (0, _react.useState)({
    options: [],
    subTypes: []
  });
  (0, _react.useEffect)(() => {
    const rawType = registry.createType(type.type).toRawType();
    const typeDef = (0, _types.getTypeDef)(rawType);
    const subTypes = typeDef.sub;
    setOptions({
      options: subTypes.map(({
        name
      }) => ({
        text: name,
        value: name
      })),
      subTypes
    });
    setCurrent([{
      name: subTypes[0].name,
      type: subTypes[0]
    }]);
  }, [registry, type]);
  (0, _react.useEffect)(() => {
    setInitialValue(defaultValue && defaultValue.value ? defaultValue.value instanceof _types.Enum ? defaultValue.value.type : Object.keys(defaultValue.value)[0] : null);
  }, [defaultValue]);

  const _onChange = (0, _react.useCallback)(value => {
    const newType = subTypes.find(({
      name
    }) => name === value) || null;
    setCurrent(newType ? [{
      name: newType.name,
      type: newType
    }] : null);
  }, [subTypes]);

  const _onChangeParam = (0, _react.useCallback)(([{
    isValid,
    value
  }]) => {
    current && onChange && onChange({
      isValid,
      value: {
        [current[0].name]: value
      }
    });
  }, [current, onChange]);

  if (isDisabled) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, _objectSpread({}, props));
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Bare.default, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
      className: "full",
      defaultValue: initialValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: _onChange,
      options: options,
      withEllipsis: true,
      withLabel: withLabel
    }), current && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      onChange: _onChangeParam,
      overrides: overrides,
      params: current,
      registry: registry
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(EnumParam);

exports.default = _default;