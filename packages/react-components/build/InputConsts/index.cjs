"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _LinkedWrapper = _interopRequireDefault(require("../InputExtrinsic/LinkedWrapper.cjs"));

var _key = _interopRequireDefault(require("./options/key.cjs"));

var _section = _interopRequireDefault(require("./options/section.cjs"));

var _SelectKey = _interopRequireDefault(require("./SelectKey.cjs"));

var _SelectSection = _interopRequireDefault(require("./SelectSection.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getValue(api, {
  method,
  section
}) {
  const firstSec = Object.keys(api.consts)[0];
  const firstMet = Object.keys(api.consts[firstSec])[0];
  const value = api.consts[section] && api.consts[section][method] ? {
    method,
    section
  } : {
    method: firstMet,
    section: firstSec
  };
  return _objectSpread(_objectSpread({}, value), {}, {
    meta: api.consts[value.section][value.method].meta
  });
}

function InputConsts({
  className = '',
  defaultValue,
  help,
  label,
  onChange,
  withLabel
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [optionsMethod, setOptionsMethod] = (0, _react.useState)(() => (0, _key.default)(api, defaultValue.section));
  const [optionsSection] = (0, _react.useState)(() => (0, _section.default)(api));
  const [value, setValue] = (0, _react.useState)(() => getValue(api, defaultValue));

  const _onKeyChange = (0, _react.useCallback)(newValue => {
    if (value.section === newValue.section && value.method === newValue.method) {
      return;
    }

    const {
      method,
      section
    } = newValue;
    const meta = api.consts[section][method].meta;
    const updated = {
      meta,
      method,
      section
    };
    setValue(updated);
    onChange && onChange(updated);
  }, [api, onChange, value]);

  const _onSectionChange = (0, _react.useCallback)(section => {
    if (section === value.section) {
      return;
    }

    const optionsMethod = (0, _key.default)(api, section);
    setOptionsMethod(optionsMethod);

    _onKeyChange({
      method: optionsMethod[0].value,
      section
    });
  }, [_onKeyChange, api, value]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LinkedWrapper.default, {
    className: className,
    help: help,
    label: label,
    withLabel: withLabel,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectSection.default, {
      className: "small",
      onChange: _onSectionChange,
      options: optionsSection,
      value: value
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectKey.default, {
      className: "large",
      onChange: _onKeyChange,
      options: optionsMethod,
      value: value
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(InputConsts);

exports.default = _default;