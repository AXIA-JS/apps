"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./Param/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ParamComp(_ref) {
  let {
    defaultValue,
    index,
    isDisabled,
    name,
    onChange,
    onEnter,
    onEscape,
    overrides,
    registry,
    type
  } = _ref;

  const _onChange = (0, _react.useCallback)(value => onChange(index, value), [index, onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "ui--Param-composite",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      name: name,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      overrides: overrides,
      registry: registry,
      type: type
    }, `input:${index}`)
  });
}

var _default = /*#__PURE__*/_react.default.memo(ParamComp);

exports.default = _default;