// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import EditButton from "./EditButton.js";
import InputTags from "./InputTags.js";
import Tag from "./Tag.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Tags({
  children,
  className = '',
  isEditable,
  isEditing,
  onChange,
  onSave,
  onToggleIsEditing,
  value,
  withEditButton = true,
  withTitle
}) {
  const {
    t
  } = useTranslation();
  const contents = useMemo(() => value.length ? value.map(tag => /*#__PURE__*/_jsx(Tag, {
    label: tag
  }, tag)) : /*#__PURE__*/_jsx("label", {
    children: t('no tags')
  }), [t, value]);

  const _onSave = useCallback(() => {
    onSave && onSave();
    onToggleIsEditing && onToggleIsEditing();
  }, [onSave, onToggleIsEditing]);

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Tags ${className}`,
    children: [withTitle && /*#__PURE__*/_jsx("h5", {
      children: t('Tags')
    }), isEditable && isEditing ? /*#__PURE__*/_jsx(InputTags, {
      defaultValue: value,
      onBlur: _onSave,
      onChange: onChange,
      onClose: _onSave,
      openOnFocus: true,
      searchInput: {
        autoFocus: false
      },
      value: value,
      withLabel: false
    }) : isEditable && withEditButton ? /*#__PURE__*/_jsx(EditButton, {
      className: value.length === 0 ? 'center' : 'left',
      onClick: onToggleIsEditing,
      children: contents
    }) : contents, children]
  });
}

export default /*#__PURE__*/React.memo(styled(Tags).withConfig({
  displayName: "Tags",
  componentId: "sc-yvwcvp-0"
})(["h5{font-style:normal;font-weight:var(--font-weight-bold);font-size:0.714rem;line-height:1rem;text-transform:uppercase;margin-bottom:0.5rem;}label{display:inline-block;}.ui--EditButton{display:flex;align-items:center;flex-wrap:wrap;&.center{justify-content:center;}&.left{justify-content:left;}}.ui--Tag{margin:0.1rem 0 0.1rem 0.571rem;}"]));