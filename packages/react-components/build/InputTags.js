// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import store from 'store';
import styled, { ThemeContext } from 'styled-components';
import Dropdown from "./Dropdown.js";
import { jsx as _jsx } from "react/jsx-runtime";

function loadTags() {
  return (store.get('tags') || ['Default']).sort();
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
  store.set('tags', tags.sort());
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
  } = useContext(ThemeContext);
  return /*#__PURE__*/_jsx(Dropdown, {
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

export default /*#__PURE__*/React.memo(styled(InputTags).withConfig({
  displayName: "InputTags",
  componentId: "sc-pv4be6-0"
})(["&& .ui.label{border:none;border-radius:0.25rem;box-shadow:none;color:#fff;display:inline-block;font-size:0.857rem;font-weight:var(--font-weight-normal);line-height:1.143rem;margin:0.125rem 0.125rem;padding:0.571em 0.857em;position:relative;white-space:nowrap;z-index:1;.delete.icon::before{content:'\u2715';}}&&.darkTheme .ui.label{background-color:rgba(255,255,255,0.08);}"]));