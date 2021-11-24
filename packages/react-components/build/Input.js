// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Input as SUIInput } from 'semantic-ui-react';
import { isFunction, isUndefined } from '@axia-js/util';
import Labelled from "./Labelled.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
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
const KEYS_PRE = [KEYS.ALT, KEYS.CMD, KEYS.CTRL]; // reference: degrade key to keyCode for cross-browser compatibility https://www.w3schools.com/jsref/event_key_keycode.asp

const isCopy = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.C;

const isCut = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.X;

const isPaste = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.V;

const isSelectAll = (key, isPreKeyDown) => isPreKeyDown && key === KEYS.A;

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
  const [stateName] = useState(() => `in_${counter++}_at_${Date.now()}`);

  const _onBlur = useCallback(() => onBlur && onBlur(), [onBlur]);

  const _onChange = useCallback(({
    target
  }) => onChange && onChange(target.value), [onChange]);

  const _onKeyDown = useCallback(event => onKeyDown && onKeyDown(event), [onKeyDown]);

  const _onKeyUp = useCallback(event => {
    onKeyUp && onKeyUp(event);

    if (onEnter && event.keyCode === 13) {
      event.target.blur();
      isFunction(onEnter) && onEnter();
    }

    if (onEscape && event.keyCode === 27) {
      event.target.blur();
      onEscape();
    }
  }, [onEnter, onEscape, onKeyUp]);

  const _onPaste = useCallback(event => onPaste && onPaste(event), [onPaste]);

  return /*#__PURE__*/_jsx(Labelled, {
    className: className,
    help: help,
    isFull: isFull,
    label: label,
    labelExtra: labelExtra,
    withEllipsis: withEllipsis,
    withLabel: withLabel,
    children: /*#__PURE__*/_jsxs(SUIInput, {
      action: isAction,
      autoFocus: autoFocus,
      className: [isEditable ? 'ui--Input edit icon' : 'ui--Input', isInPlaceEditor ? 'inPlaceEditor' : '', inputClassName || '', isWarning && !isError ? 'isWarning' : ''].join(' '),
      defaultValue: isUndefined(value) ? defaultValue || '' : undefined,
      disabled: isDisabled,
      error: !isDisabled && isError || isDisabledError,
      hidden: isHidden,
      iconPosition: isUndefined(icon) ? undefined : 'left',
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
      children: [/*#__PURE__*/_jsx("input", {
        autoCapitalize: "off",
        autoComplete: type === 'password' ? 'new-password' : 'off',
        autoCorrect: "off",
        "data-testid": label,
        onPaste: _onPaste,
        spellCheck: false
      }), isEditable && /*#__PURE__*/_jsx("i", {
        className: "edit icon"
      }), icon, children]
    })
  });
}

export default /*#__PURE__*/React.memo(Input);
export { isCopy, isCut, isPaste, isSelectAll, KEYS, KEYS_PRE };