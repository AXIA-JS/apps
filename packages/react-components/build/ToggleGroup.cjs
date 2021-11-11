"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ToggleIndex({
  index,
  isDisabled,
  isSelected,
  onChange,
  text
}) {
  const _onClick = (0, _react.useCallback)(() => {
    !isDisabled && onChange(index);
  }, [isDisabled, index, onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
    icon: isSelected ? 'check' : 'circle',
    isBasic: true,
    isDisabled: isDisabled,
    isSelected: isSelected,
    label: text,
    onClick: _onClick
  }, text);
}

const ToggleIndexMemo = /*#__PURE__*/_react.default.memo(ToggleIndex);

function ToggleGroup({
  className = '',
  onChange,
  options,
  value
}) {
  if (!options.length || !options[0].value) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--ToggleGroup ${className}`,
    children: options.map(({
      isDisabled,
      text
    }, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(ToggleIndexMemo, {
      index: index,
      isDisabled: isDisabled,
      isSelected: value === index,
      onChange: onChange,
      text: text
    }, index))
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ToggleGroup).withConfig({
  displayName: "ToggleGroup",
  componentId: "sc-qebvc8-0"
})(["display:inline-block;margin-right:1.5rem;.ui--Button{margin:0;&:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;}&:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;}.ui--Icon{width:1em;}}"]));

exports.default = _default;