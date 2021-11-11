// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { Button, InputAddress, Modal, Password } from '@axia-js/react-components';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Unlock({
  onClose,
  onUnlock,
  pair
}) {
  const {
    t
  } = useTranslation();
  const [isBusy, setIsBusy] = useState(false);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [unlockError, setUnlockError] = useState(null);
  useEffect(() => {
    setAddress((pair === null || pair === void 0 ? void 0 : pair.address) || '');
  }, [pair]);
  useEffect(() => {
    setUnlockError(null);
  }, [password]);

  const _onUnlock = useCallback(() => {
    if (!pair || !pair.isLocked) {
      return;
    }

    setIsBusy(true);
    setTimeout(() => {
      try {
        pair.decodePkcs8(password);
      } catch (error) {
        setIsBusy(false);
        return setUnlockError(error.message);
      }

      setIsBusy(false);
      onUnlock();
    }, 0);
  }, [onUnlock, pair, password]);

  if (!pair) {
    return null;
  }

  return /*#__PURE__*/_jsxs(Modal, {
    className: "toolbox--Unlock",
    header: t('Unlock account'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('This account that will perform the message signing.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          help: t('The selected account to be unlocked.'),
          isDisabled: true,
          label: t('account'),
          value: address
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('Unlock the account for signing. Once active the signature will be generated based on the content provided.'),
        children: /*#__PURE__*/_jsx(Password, {
          autoFocus: true,
          help: t('The account\'s password specified at the creation of this account.'),
          isError: !!unlockError,
          label: t('password'),
          onChange: setPassword,
          onEnter: _onUnlock,
          value: password
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "unlock",
        isBusy: isBusy,
        label: t('Unlock'),
        onClick: _onUnlock
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Unlock);