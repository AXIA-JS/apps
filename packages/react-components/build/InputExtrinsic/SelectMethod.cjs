"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Dropdown = _interopRequireDefault(require("../Dropdown.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SelectMethod({
  api,
  className = '',
  defaultValue,
  isDisabled,
  isError,
  onChange,
  options,
  value
}) {
  const transform = (0, _react.useCallback)(method => api.tx[value.section][method], [api, value]);

  if (!options.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dropdown.default, {
    className: `ui--DropdownLinked-Items ${className}`,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    onChange: onChange,
    options: options,
    transform: transform,
    value: value.method,
    withLabel: false
  });
}

var _default = /*#__PURE__*/_react.default.memo(SelectMethod);

exports.default = _default;