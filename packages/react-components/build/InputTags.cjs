"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _store = _interopRequireDefault(require("store"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Dropdown = _interopRequireDefault(require("./Dropdown.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function loadTags() {
  return (_store.default.get('tags') || ['Default']).sort();
}

function valueToOption(value) {
  return {
    key: value,
    text: value,
    value
  };
}

const tags = loadTags();
const options = tags.map(valueToOption);

function saveTags(tags) {
  _store.default.set('tags', tags.sort());
}

function onAddTag(value) {
  tags.push(value);
  options.push(valueToOption(value));
  saveTags(tags);
}

function InputTags({
  allowAdd = true,
  className = '',
  defaultValue,
  help,
  isDisabled,
  isError,
  label,
  onBlur,
  onChange,
  onClose,
  placeholder,
  searchInput,
  value,
  withLabel
}) {
  const {
    theme
  } = (0, _react.useContext)(_styledComponents.ThemeContext);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dropdown.default, {
    allowAdd: allowAdd && !isDisabled,
    className: `ui--InputTags ${theme}Theme ${className}`,
    defaultValue: defaultValue,
    help: help,
    isDisabled: isDisabled,
    isError: isError,
    isMultiple: true,
    label: label,
    onAdd: onAddTag,
    onBlur: onBlur,
    onChange: onChange,
    onClose: onClose,
    options: options,
    placeholder: placeholder,
    searchInput: searchInput,
    value: value,
    withLabel: withLabel
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InputTags).withConfig({
  displayName: "InputTags",
  componentId: "sc-pv4be6-0"
})(["&& .ui.label{border:none;border-radius:0.25rem;box-shadow:none;color:#fff;display:inline-block;font-size:0.857rem;font-weight:var(--font-weight-normal);line-height:1.143rem;margin:0.125rem 0.125rem;padding:0.571em 0.857em;position:relative;white-space:nowrap;z-index:1;.delete.icon::before{content:'\u2715';}}&&.darkTheme .ui.label{background-color:rgba(255,255,255,0.08);}"]));

exports.default = _default;