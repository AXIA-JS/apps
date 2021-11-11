"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Checkbox({
  className = '',
  isDisabled,
  label,
  onChange,
  value
}) {
  const _onClick = (0, _react.useCallback)(() => {
    !isDisabled && onChange && onChange(!value);
  }, [isDisabled, onChange, value]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Checkbox${isDisabled ? ' isDisabled' : ''} ${className}`,
    onClick: _onClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      color: value ? 'normal' : 'transparent',
      icon: "check"
    }), label && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      children: label
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Checkbox).withConfig({
  displayName: "Checkbox",
  componentId: "sc-1dd5x3p-0"
})(["display:inline-block;cursor:pointer;&.isDisabled{opacity:0.5;}&:not(.isDisabled){cursor:pointer;}> label{color:var(--color-text);display:inline-block;margin:0 0.5rem;opacity:1;cursor:pointer;user-select:none;}> label,> .ui--Icon{vertical-align:middle;}.ui--Icon{border:1px solid var(--color-checkbox);border-radius:0.125rem;}"]));

exports.default = _default;