// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { getSystemIcon } from '@axia-js/apps-config';
import { useApi } from '@axia-js/react-hooks';
import BaseIdentityIcon from '@axia-js/react-identicon';
import { settings } from '@axia-js/ui-settings';
import StatusContext from "../Status/Context.js";
import { useTranslation } from "../translate.js";
import RoboHash from "./RoboHash/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function getIdentityTheme(systemName, specName) {
  return settings.icon === 'default' && getSystemIcon(systemName, specName) || settings.icon;
}

function isCodec(value) {
  return !!(value && value.toHuman);
}

function IdentityIcon({
  className = '',
  prefix,
  size = 24,
  theme,
  value
}) {
  const {
    isEthereum,
    specName,
    systemName
  } = useApi();
  const {
    t
  } = useTranslation();
  const {
    queueAction
  } = useContext(StatusContext);
  const thisTheme = theme || getIdentityTheme(systemName, specName);
  const Custom = thisTheme === 'robohash' ? RoboHash : undefined;

  const _onCopy = useCallback(account => queueAction({
    account,
    action: t('clipboard'),
    message: t('address copied'),
    status: 'queued'
  }), [queueAction, t]);

  return /*#__PURE__*/_jsx(BaseIdentityIcon, {
    Custom: Custom,
    className: className,
    onCopy: _onCopy,
    prefix: prefix,
    size: size,
    theme: isEthereum ? 'ethereum' : thisTheme,
    value: isCodec(value) ? value.toString() : value
  });
}

export default /*#__PURE__*/React.memo(styled(IdentityIcon).withConfig({
  displayName: "IdentityIcon",
  componentId: "sc-h9n36m-0"
})(({
  theme
}) => `
  ${theme.theme === 'dark' ? `circle:first-child {
      fill: #282829;
    }` : ''}

  border: 1px solid ${theme.theme === 'dark' ? 'transparent' : '#ddd'};
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
`));