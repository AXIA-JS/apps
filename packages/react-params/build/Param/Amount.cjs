"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Amount({
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  label,
  onChange,
  onEnter,
  registry,
  type,
  withLabel
}) {
  const defaultValue = (0, _react.useMemo)(() => isDisabled ? value instanceof registry.createClass('AccountIndex') ? value.toString() : (0, _util.formatNumber)(value) : (0, _util.bnToBn)(value || 0).toString(), [isDisabled, registry, value]);
  const bitLength = (0, _react.useMemo)(() => {
    try {
      return registry.createType(type.type).bitLength();
    } catch (error) {
      return 32;
    }
  }, [registry, type]);

  const _onChange = (0, _react.useCallback)(value => onChange && onChange({
    isValid: !(0, _util.isUndefined)(value),
    value
  }), [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bare.default, {
    className: className,
    children: isDisabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: true,
      label: label,
      withEllipsis: true,
      withLabel: withLabel
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
      bitLength: bitLength,
      className: "full",
      defaultValue: defaultValue,
      isError: isError,
      isZeroable: true,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      withLabel: withLabel
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Amount);

exports.default = _default;