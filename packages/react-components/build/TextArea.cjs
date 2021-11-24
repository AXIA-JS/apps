"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Labelled = _interopRequireDefault(require("./Labelled.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function TextArea(_ref) {
  let {
    children,
    className,
    help,
    isError,
    isReadOnly,
    label,
    onChange,
    seed,
    withLabel
  } = _ref;

  const _onChange = (0, _react.useCallback)(_ref2 => {
    let {
      target: {
        value
      }
    } = _ref2;
    onChange && onChange(value);
  }, [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Labelled.default, {
    className: className,
    help: help,
    label: label,
    withLabel: withLabel,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "TextAreaWithDropdown",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
        autoCapitalize: "off",
        autoCorrect: "off",
        autoFocus: false,
        className: isError ? 'ui-textArea-withError' : '',
        onChange: _onChange,
        readOnly: isReadOnly,
        rows: 2,
        spellCheck: false,
        value: seed
      }), children]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(TextArea).withConfig({
  displayName: "TextArea",
  componentId: "sc-62vgoe-0"
})([".TextAreaWithDropdown{display:flex;textarea{border-radius:0.25rem 0 0 0.25rem;border:1px solid #DDE1EB;border-right:none;background:var(--bg-input);box-sizing:border-box;color:var(--color-text);display:block;outline:none;padding:1.75rem 3rem 0.75rem 1.5rem;resize:none;width:100%;&:read-only{background:var(--bg-inverse);box-shadow:none;outline:none;~ .ui.buttons > .ui.selection.dropdown{background:var(--bg-inverse);}}&.ui-textArea-withError{background:var(--bg-input-error);color:var(--color-error);}}& > .ui.buttons > .ui.button.floating.selection.dropdown{border:1px solid #DDE1EB;border-left:none;border-top-left-radius:0;border-bottom-left-radius:0;display:flex;align-items:center;justify-content:center;& > .dropdown.icon{top:2rem;}}}"]));

exports.default = _default;