// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import StatusContext from "./Status/Context.js";
import Button from "./Button/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const NOOP = () => undefined;

function CopyButton({
  children,
  className = '',
  icon = 'copy',
  label,
  type,
  value
}) {
  const {
    t
  } = useTranslation();
  const {
    queueAction
  } = useContext(StatusContext);

  const _onCopy = useCallback(() => {
    queueAction && queueAction({
      action: t('clipboard'),
      message: t('{{type}} copied', {
        replace: {
          type: type || t('value')
        }
      }),
      status: 'queued'
    });
  }, [type, queueAction, t]);

  return /*#__PURE__*/_jsx("div", {
    className: `ui--CopyButton ${className}`,
    children: /*#__PURE__*/_jsx(CopyToClipboard, {
      onCopy: _onCopy,
      text: value,
      children: /*#__PURE__*/_jsxs("div", {
        className: "copyContainer",
        children: [children, /*#__PURE__*/_jsx("span", {
          className: "copySpan",
          children: /*#__PURE__*/_jsx(Button, {
            className: "icon-button show-on-hover",
            icon: icon,
            isDisabled: !value,
            label: label,
            onClick: NOOP
          })
        })]
      })
    })
  });
}

export default /*#__PURE__*/React.memo(styled(CopyButton).withConfig({
  displayName: "CopyButton",
  componentId: "sc-1d73v6z-0"
})([".copySpan{white-space:nowrap;}"]));