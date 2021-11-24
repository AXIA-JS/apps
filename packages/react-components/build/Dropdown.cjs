"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("@axia-js/util");

var _Labelled = _interopRequireDefault(require("./Labelled.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BaseDropdown(_ref) {
  let {
    allowAdd = false,
    children,
    className = '',
    defaultValue,
    dropdownClassName,
    help,
    isButton,
    isDisabled,
    isError,
    isFull,
    isMultiple,
    label,
    labelExtra,
    onAdd,
    onBlur,
    onChange,
    onClose,
    onSearch,
    options,
    placeholder,
    renderLabel,
    searchInput,
    tabIndex,
    transform,
    value,
    withEllipsis,
    withLabel
  } = _ref;
  const lastUpdate = (0, _react.useRef)('');
  const [stored, setStored] = (0, _react.useState)();

  const _setStored = (0, _react.useCallback)(value => {
    const json = JSON.stringify({
      v: value
    });

    if (lastUpdate.current !== json) {
      lastUpdate.current = json;
      setStored(value);
      onChange && onChange(transform ? transform(value) : value);
    }
  }, [onChange, transform]);

  (0, _react.useEffect)(() => {
    _setStored((0, _util.isUndefined)(value) ? defaultValue : value);
  }, [_setStored, defaultValue, value]);

  const _onAdd = (0, _react.useCallback)((_, _ref2) => {
    let {
      value
    } = _ref2;
    return onAdd && onAdd(value);
  }, [onAdd]);

  const _onChange = (0, _react.useCallback)((_, _ref3) => {
    let {
      value
    } = _ref3;
    return _setStored(value);
  }, [_setStored]);

  const dropdown = /*#__PURE__*/(0, _jsxRuntime.jsx)(_semanticUiReact.Dropdown, {
    allowAdditions: allowAdd,
    button: isButton,
    className: dropdownClassName,
    compact: isButton,
    disabled: isDisabled,
    error: isError,
    floating: isButton,
    multiple: isMultiple,
    onAddItem: _onAdd,
    onBlur: onBlur,
    onChange: _onChange,
    onClose: onClose,
    options: options,
    placeholder: placeholder,
    renderLabel: renderLabel,
    search: onSearch || allowAdd,
    searchInput: searchInput,
    selection: true,
    tabIndex: tabIndex,
    value: stored
  });
  return isButton ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_semanticUiReact.Button.Group, {
    children: [dropdown, children]
  }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Labelled.default, {
    className: `ui--Dropdown ${className}`,
    help: help,
    isFull: isFull,
    label: label,
    labelExtra: labelExtra,
    withEllipsis: withEllipsis,
    withLabel: withLabel,
    children: [dropdown, children]
  });
}

const Dropdown = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(BaseDropdown).withConfig({
  displayName: "Dropdown",
  componentId: "sc-136rlm9-0"
})([".ui--Dropdown-item{position:relative;white-space:nowrap;.ui--Dropdown-icon,.ui--Dropdown-name{display:inline-block;}.ui--Dropdown-icon{height:32px;left:0;position:absolute;top:-9px;width:32px;&.opaque{opacity:0.5;}}.ui--Dropdown-name{margin-left:3rem;}}.ui.selection.dropdown{> .text > .ui--Dropdown-item{.ui--Dropdown-icon{left:-2.6rem;top:-1.15rem;opacity:1;}.ui--Dropdown-name{margin-left:0;}}}"])); // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access


Dropdown.Header = _semanticUiReact.Dropdown.Header;
var _default = Dropdown;
exports.default = _default;