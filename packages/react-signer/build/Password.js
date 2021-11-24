// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Modal, Password, Toggle } from '@axia-js/react-components';
import { keyring } from '@axia-js/ui-keyring';
import { useTranslation } from "./translate.js";
import { UNLOCK_MINS } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";

function getPair(address) {
  try {
    return keyring.getPair(address);
  } catch (error) {
    return null;
  }
}

function Unlock({
  address,
  className,
  error,
  onChange,
  onEnter,
  tabIndex
}) {
  const {
    t
  } = useTranslation();
  const [password, setPassword] = useState('');
  const [isUnlockCached, setIsUnlockCached] = useState(false);
  const pair = useMemo(() => getPair(address), [address]);
  useEffect(() => {
    onChange(password, isUnlockCached);
  }, [onChange, isUnlockCached, password]);

  if (!pair || !pair.isLocked || pair.meta.isInjected) {
    return null;
  }

  return /*#__PURE__*/_jsx(Modal.Columns, {
    className: className,
    hint: t('Unlock the sending account to allow signing of this transaction.'),
    children: /*#__PURE__*/_jsx(Password, {
      autoFocus: true,
      isError: !!error,
      label: t('unlock account with password'),
      onChange: setPassword,
      onEnter: onEnter,
      tabIndex: tabIndex,
      value: password,
      children: /*#__PURE__*/_jsx(Toggle, {
        isOverlay: true,
        label: t('unlock for {{expiry}} min', {
          replace: {
            expiry: UNLOCK_MINS
          }
        }),
        onChange: setIsUnlockCached,
        value: isUnlockCached
      })
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Unlock).withConfig({
  displayName: "Password",
  componentId: "sc-10qdjaa-0"
})([".errorLabel{margin-right:1rem;color:#9f3a38 !important;}.ui--Toggle{bottom:1.1rem;}"]));