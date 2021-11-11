"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYS_PRE = exports.KEYS = exports.isSelectAll = exports.isPaste = exports.isCut = exports.isCopy = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _util = require("@axia-js/util");

var _Labelled = _interopRequireDefault(require("./Labelled.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// // Find decimal separator used in current locale
// const getDecimalSeparator = (): string => 1.1
//   .toLocaleString()
//   .replace(/\d/g, '');
// note: KeyboardEvent.keyCode and KeyboardEvent.which are deprecated
const KEYS = {
  A: 'a',
  ALT: 'Alt',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  BACKSPACE: 'Backspace',
  C: 'c',
  CMD: 'Meta',
  CTRL: 'Control',
  // DECIMAL: getDecimalSeparator(),
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  V: 'v',
  X: 'x',
  ZERO: '0'
};
exports.KEYS = KEYS;
const KEYS_PRE = [KEYS.ALT, KEYS.CMD, KEYS.CTRL]; // reference: degrade key to keyCode for cross-browser compatibility https://www.w3schools.com/jsref/event_key_keycode.asp

exports.KEYS_PRE = KEYS_PRE;

const isCopy = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.C;

exports.isCopy = isCopy;

const isCut = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.X;

exports.isCut = isCut;

const isPaste = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.V;

exports.isPaste = isPaste;

const isSelectAll = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.A;

exports.isSelectAll = isSelectAll;
let counter = 0;

function Input({
  autoFocus = false,
  children,
  className,
  defaultValue,
  help,
  icon,
  inputClassName,
  isAction = false,
  isDisabled = false,
  isDisabledError = false,
  isEditable = false,
  isError = false,
  isFull = false,
  isHidden = false,
  isInPlaceEditor = false,
  isReadOnly = false,
  isWarning = false,
  label,
  labelExtra,
  max,
  maxLength,
  min,
  name,
  onBlur,
  onChange,
  onEnter,
  onEscape,
  onKeyDown,
  onKeyUp,
  onPaste,
  placeholder,
  tabIndex,
  type = 'text',
  value,
  withEllipsis,
  withLabel
}) {
  const [stateName] = (0, _react.useState)(() => `in_${counter++}_at_${Date.now()}`);

  const _onBlur = (0, _react.useCallback)(() => onBlur && onBlur(), [onBlur]);

  const _onChange = (0, _react.useCallback)(({
    target
  }) => onChange && onChange(target.value), [onChange]);

  const _onKeyDown = (0, _react.useCallback)(event => onKeyDown && onKeyDown(event), [onKeyDown]);

  const _onKeyUp = (0, _react.useCallback)(event => {
    onKeyUp && onKeyUp(event);

    if (onEnter && event.keyCode === 13) {
      event.target.blur();
      (0, _util.isFunction)(onEnter) && onEnter();
    }

    if (onEscape && event.keyCode === 27) {
      event.target.blur();
      onEscape();
    }
  }, [onEnter, onEscape, onKeyUp]);

  const _onPaste = (0, _react.useCallback)(event => onPaste && onPaste(event), [onPaste]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Labelled.default, {
    className: className,
    help: help,
    isFull: isFull,
    label: label,
    labelExtra: labelExtra,
    withEllipsis: withEllipsis,
    withLabel: withLabel,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_semanticUiReact.Input, {
      action: isAction,
      autoFocus: autoFocus,
      className: [isEditable ? 'ui--Input edit icon' : 'ui--Input', isInPlaceEditor ? 'inPlaceEditor' : '', inputClassName || '', isWarning && !isError ? 'isWarning' : ''].join(' '),
      defaultValue: (0, _util.isUndefined)(value) ? defaultValue || '' : undefined,
      disabled: isDisabled,
      error: !isDisabled && isError || isDisabledError,
      hidden: isHidden,
      iconPosition: (0, _util.isUndefined)(icon) ? undefined : 'left',
      id: name,
      max: max,
      maxLength: maxLength,
      min: min,
      name: name || stateName,
      onBlur: _onBlur,
      onChange: _onChange,
      onKeyDown: _onKeyDown,
      onKeyUp: _onKeyUp,
      placeholder: placeholder,
      readOnly: isReadOnly,
      tabIndex: tabIndex,
      type: type,
      value: value,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        autoCapitalize: "off",
        autoComplete: type === 'password' ? 'new-password' : 'off',
        autoCorrect: "off",
        "data-testid": label,
        onPaste: _onPaste,
        spellCheck: false
      }), isEditable && /*#__PURE__*/(0, _jsxRuntime.jsx)("i", {
        className: "edit icon"
      }), icon, children]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Input);

exports.default = _default;