// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { Input, InputAddress, Modal } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { isHex } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_PROOF = new Uint8Array();

function SessionKey({
  className = '',
  controllerId,
  onChange,
  stashId,
  withFocus,
  withSenders
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [keys, setKeys] = useState(null);
  useEffect(() => {
    try {
      onChange({
        sessionTx: isHex(keys) // this is weird... :(
        ? api.tx.session.setKeys(keys, EMPTY_PROOF) : null
      });
    } catch {
      onChange({
        sessionTx: null
      });
    }
  }, [api, keys, onChange]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [withSenders && /*#__PURE__*/_jsxs(Modal.Columns, {
      hint: t('The stash and controller pair. This transaction, setting the session keys, will be sent from the controller.'),
      children: [/*#__PURE__*/_jsx(InputAddress, {
        defaultValue: stashId,
        isDisabled: true,
        label: t('stash account')
      }), /*#__PURE__*/_jsx(InputAddress, {
        className: "medium",
        defaultValue: controllerId,
        isDisabled: true,
        label: t('controller account')
      })]
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The hex output from author_rotateKeys, as executed on the validator node. The keys will show as pending until applied at the start of a new session.'),
      children: /*#__PURE__*/_jsx(Input, {
        autoFocus: withFocus,
        help: t('Changing the key only takes effect at the start of the next session. The input here is generated from the author_rotateKeys command'),
        isError: !keys,
        label: t('Keys from rotateKeys'),
        onChange: setKeys,
        placeholder: "0x..."
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(SessionKey);