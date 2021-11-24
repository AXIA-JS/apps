"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Dropdown = _interopRequireDefault(require("../Dropdown.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function transform(_ref) {
  let {
    value
  } = _ref;
  return method => {
    const section = value.section;
    return {
      method,
      section
    };
  };
}

function SelectKey(props) {
  const {
    className = '',
    isError,
    onChange,
    options,
    value
  } = props;

  if (!options.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dropdown.default, {
    className: `ui--DropdownLinked-Items ${className}`,
    isError: isError,
    onChange: onChange,
    options: options,
    transform: transform(props),
    value: value.method,
    withLabel: false
  });
}

var _default = /*#__PURE__*/_react.default.memo(SelectKey);

exports.default = _default;