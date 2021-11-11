"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _method = _interopRequireDefault(require("./options/method.cjs"));

var _section = _interopRequireDefault(require("./options/section.cjs"));

var _LinkedWrapper = _interopRequireDefault(require("./LinkedWrapper.cjs"));

var _SelectMethod = _interopRequireDefault(require("./SelectMethod.cjs"));

var _SelectSection = _interopRequireDefault(require("./SelectSection.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function InputExtrinsic({
  className = '',
  defaultValue,
  help,
  isDisabled,
  label,
  onChange,
  withLabel
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [optionsMethod, setOptionsMethod] = (0, _react.useState)(() => (0, _method.default)(api, defaultValue.section));
  const [optionsSection] = (0, _react.useState)(() => (0, _section.default)(api));
  const [value, setValue] = (0, _react.useState)(() => defaultValue);

  const _onKeyChange = (0, _react.useCallback)(newValue => {
    if (value.section === newValue.section && value.method === newValue.method) {
      return;
    } // set this via callback, since the we are setting a function (alternatively... we have issues)


    setValue(() => newValue);
    onChange && onChange(newValue);
  }, [onChange, value]);

  const _onSectionChange = (0, _react.useCallback)(section => {
    if (section === value.section) {
      return;
    }

    const optionsMethod = (0, _method.default)(api, section);
    setOptionsMethod(optionsMethod);

    _onKeyChange(api.tx[section][optionsMethod[0].value]);
  }, [_onKeyChange, api, value]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_LinkedWrapper.default, {
    className: className,
    help: help,
    label: label,
    withLabel: withLabel,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectSection.default, {
      className: "small",
      defaultValue: isDisabled ? value.section : undefined,
      isDisabled: isDisabled,
      onChange: isDisabled ? undefined : _onSectionChange,
      options: optionsSection,
      value: value
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectMethod.default, {
      api: api,
      className: "large",
      defaultValue: isDisabled ? value.method : undefined,
      isDisabled: isDisabled,
      onChange: isDisabled ? undefined : _onKeyChange,
      options: optionsMethod,
      value: value
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(InputExtrinsic);

exports.default = _default;