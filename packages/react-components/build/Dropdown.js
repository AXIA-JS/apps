// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button as SUIButton, Dropdown as SUIDropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { isUndefined } from '@axia-js/util';
import Labelled from "./Labelled.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BaseDropdown({
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
}) {
  const lastUpdate = useRef('');
  const [stored, setStored] = useState();

  const _setStored = useCallback(value => {
    const json = JSON.stringify({
      v: value
    });

    if (lastUpdate.current !== json) {
      lastUpdate.current = json;
      setStored(value);
      onChange && onChange(transform ? transform(value) : value);
    }
  }, [onChange, transform]);

  useEffect(() => {
    _setStored(isUndefined(value) ? defaultValue : value);
  }, [_setStored, defaultValue, value]);

  const _onAdd = useCallback((_, {
    value
  }) => onAdd && onAdd(value), [onAdd]);

  const _onChange = useCallback((_, {
    value
  }) => _setStored(value), [_setStored]);

  const dropdown = /*#__PURE__*/_jsx(SUIDropdown, {
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

  return isButton ? /*#__PURE__*/_jsxs(SUIButton.Group, {
    children: [dropdown, children]
  }) : /*#__PURE__*/_jsxs(Labelled, {
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

const Dropdown = /*#__PURE__*/React.memo(styled(BaseDropdown).withConfig({
  displayName: "Dropdown",
  componentId: "sc-em4jdz-0"
})([".ui--Dropdown-item{position:relative;white-space:nowrap;.ui--Dropdown-icon,.ui--Dropdown-name{display:inline-block;}.ui--Dropdown-icon{height:32px;left:0;position:absolute;top:-9px;width:32px;&.opaque{opacity:0.5;}}.ui--Dropdown-name{margin-left:3rem;}}.ui.selection.dropdown{> .text > .ui--Dropdown-item{.ui--Dropdown-icon{left:-2.6rem;top:-1.15rem;opacity:1;}.ui--Dropdown-name{margin-left:0;}}}"])); // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

Dropdown.Header = SUIDropdown.Header;
export default Dropdown;