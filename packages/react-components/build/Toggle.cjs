"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Toggle(_ref) {
  let {
    className = '',
    isDisabled,
    isOverlay,
    isRadio,
    label,
    onChange,
    preventDefault,
    value
  } = _ref;

  const _onClick = (0, _react.useCallback)(event => {
    if (!isDisabled) {
      if (preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }

      onChange && onChange(!value);
    }
  }, [isDisabled, onChange, preventDefault, value]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Toggle${value ? ' isChecked' : ''}${isDisabled ? ' isDisabled' : ''}${isOverlay ? ' isOverlay' : ''}${isRadio ? ' isRadio' : ''} ${className}`,
    onClick: _onClick,
    children: [label && /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: `ui--Toggle-Slider${isRadio ? ' highlight--before-border' : ''}`
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Toggle).withConfig({
  displayName: "Toggle",
  componentId: "sc-z24hhj-0"
})(["> label{display:inline-block;margin:0 0.5rem;}> label,> div{vertical-align:middle;}.ui--Toggle-Slider{background:var(--bg-toggle);border-radius:1.5rem;display:inline-block;height:1.5rem;position:relative;width:3rem;&::before{background:var(--bg-table);border:0.125rem solid var(--bg-toggle);border-radius:50%;content:\"\";height:1.5rem;left:0;position:absolute;top:0;width:1.5rem;}}&:not(.isDisabled){cursor:pointer;> label{cursor:pointer;}}&.isChecked{&:not(.isRadio){.ui--Toggle-Slider:before{transform:translateX(1.5rem);}}&.isRadio{.ui--Toggle-Slider:before{border-width:0.5rem;}}}&.isRadio{.ui--Toggle-Slider{width:1.5rem;}}&.isOverlay{bottom:1.375rem;position:absolute;right:3.5rem;}"]));

exports.default = _default;