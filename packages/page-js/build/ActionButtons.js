// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Button, Input, Popup } from '@axia-js/react-components';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ActionButtons({
  className = '',
  isCustomExample,
  isRunning,
  removeSnippet,
  runJs,
  saveSnippet,
  stopJs
}) {
  const {
    t
  } = useTranslation();
  const [snippetName, setSnippetName] = useState('');

  const _onChangeName = useCallback(snippetName => setSnippetName(snippetName), []);

  const _onPopupClose = useCallback(() => {
    setSnippetName('');
  }, []);

  const _saveSnippet = useCallback(() => {
    saveSnippet(snippetName);

    _onPopupClose();
  }, [_onPopupClose, saveSnippet, snippetName]);

  return /*#__PURE__*/_jsxs(Button.Group, {
    className: `${className} action-button`,
    children: [isCustomExample ? /*#__PURE__*/_jsx(Button, {
      icon: "trash",
      onClick: removeSnippet
    }) : /*#__PURE__*/_jsx(Popup, {
      className: "popup-local",
      onCloseAction: _onPopupClose,
      value: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          maxLength: 50,
          min: 1,
          onChange: _onChangeName,
          onEnter: _saveSnippet,
          placeholder: t('Name your example'),
          value: snippetName,
          withLabel: false
        }), /*#__PURE__*/_jsx(Button, {
          icon: "save",
          isDisabled: !snippetName.length,
          label: t('Save snippet to local storage'),
          onClick: _saveSnippet
        })]
      }),
      children: /*#__PURE__*/_jsx(Button, {
        icon: "save",
        isReadOnly: false
      })
    }), isRunning ? /*#__PURE__*/_jsx(Button, {
      icon: "times",
      onClick: stopJs
    }) : /*#__PURE__*/_jsx(Button, {
      className: "play-button",
      icon: "play",
      onClick: runJs
    })]
  });
}

export default /*#__PURE__*/React.memo(ActionButtons);