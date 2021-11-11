// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useIsMountedRef } from '@axia-js/react-hooks';
import { assert, isFunction } from '@axia-js/util';
import Button from "./Button/index.js";
import { StatusContext } from "./Status/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function TxButton({
  accountId,
  className = '',
  extrinsic: propsExtrinsic,
  icon,
  isBasic,
  isBusy,
  isDisabled,
  isIcon,
  isToplevel,
  isUnsigned,
  label,
  onClick,
  onFailed,
  onSendRef,
  onStart,
  onSuccess,
  onUpdate,
  params,
  tooltip,
  tx,
  withSpinner,
  withoutLink
}) {
  const {
    t
  } = useTranslation();
  const mountedRef = useIsMountedRef();
  const {
    queueExtrinsic
  } = useContext(StatusContext);
  const [isSending, setIsSending] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {
    isStarted && onStart && onStart();
  }, [isStarted, onStart]);

  const _onFailed = useCallback(result => {
    mountedRef.current && setIsSending(false);
    onFailed && onFailed(result);
  }, [onFailed, setIsSending, mountedRef]);

  const _onSuccess = useCallback(result => {
    mountedRef.current && setIsSending(false);
    onSuccess && onSuccess(result);
  }, [onSuccess, setIsSending, mountedRef]);

  const _onStart = useCallback(() => {
    mountedRef.current && setIsStarted(true);
  }, [setIsStarted, mountedRef]);

  const _onSend = useCallback(() => {
    var _extrinsics;

    let extrinsics;

    if (propsExtrinsic) {
      extrinsics = Array.isArray(propsExtrinsic) ? propsExtrinsic : [propsExtrinsic];
    } else if (tx) {
      extrinsics = [tx(...(isFunction(params) ? params() : params || []))];
    }

    assert((_extrinsics = extrinsics) === null || _extrinsics === void 0 ? void 0 : _extrinsics.length, 'Expected generated extrinsic passed to TxButton');
    mountedRef.current && withSpinner && setIsSending(true);
    extrinsics.forEach(extrinsic => {
      queueExtrinsic({
        accountId: accountId && accountId.toString(),
        extrinsic,
        isUnsigned,
        txFailedCb: withSpinner ? _onFailed : onFailed,
        txStartCb: _onStart,
        txSuccessCb: withSpinner ? _onSuccess : onSuccess,
        txUpdateCb: onUpdate
      });
    });
    onClick && onClick();
  }, [_onFailed, _onStart, _onSuccess, accountId, isUnsigned, onClick, onFailed, onSuccess, onUpdate, params, propsExtrinsic, queueExtrinsic, setIsSending, tx, withSpinner, mountedRef]);

  if (onSendRef) {
    onSendRef.current = _onSend;
  }

  return /*#__PURE__*/_jsx(Button, {
    className: className,
    icon: icon || 'check',
    isBasic: isBasic,
    isBusy: isBusy,
    isDisabled: isSending || isDisabled || !isUnsigned && !accountId || (tx ? false : Array.isArray(propsExtrinsic) ? propsExtrinsic.length === 0 : !propsExtrinsic),
    isIcon: isIcon,
    isToplevel: isToplevel,
    label: label || (isIcon ? '' : t('Submit')),
    onClick: _onSend,
    tooltip: tooltip,
    withoutLink: withoutLink
  });
}

export default /*#__PURE__*/React.memo(TxButton);