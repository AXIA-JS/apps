// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Modal, StatusContext } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { assert, isFunction, loggerFormat } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import TxSigned from "./TxSigned.js";
import TxUnsigned from "./TxUnsigned.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

const NOOP = () => undefined;

const AVAIL_STATUS = ['queued', 'qr', 'signing'];

async function submitRpc(api, {
  method,
  section
}, values) {
  try {
    const rpc = api.rpc;
    assert(isFunction(rpc[section] && rpc[section][method]), `api.rpc.${section}.${method} does not exist`);
    const result = await rpc[section][method](...values);
    console.log('submitRpc: result ::', loggerFormat(result));
    return {
      result,
      status: 'sent'
    };
  } catch (error) {
    console.error(error);
    return {
      error: error,
      status: 'error'
    };
  }
}

async function sendRpc(api, queueSetTxStatus, {
  id,
  rpc,
  values = []
}) {
  if (rpc) {
    queueSetTxStatus(id, 'sending'); // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    const {
      error,
      result,
      status
    } = await submitRpc(api, rpc, values);
    queueSetTxStatus(id, status, result, error);
  }
}

function extractCurrent(txqueue) {
  const available = txqueue.filter(({
    status
  }) => AVAIL_STATUS.includes(status));
  const currentItem = available[0] || null;
  let isRpc = false;
  let isVisible = false;

  if (currentItem) {
    if (currentItem.status === 'queued' && !(currentItem.extrinsic || currentItem.payload)) {
      isRpc = true;
    } else if (currentItem.status !== 'signing') {
      isVisible = true;
    }
  }

  return {
    count: available.length,
    currentItem,
    isRpc,
    isVisible,
    requestAddress: currentItem && currentItem.accountId || null
  };
}

function Signer({
  children,
  className = ''
}) {
  const {
    api
  } = useApi();
  const {
    t
  } = useTranslation();
  const {
    queueSetTxStatus,
    txqueue
  } = useContext(StatusContext);
  const {
    count,
    currentItem,
    isRpc,
    isVisible,
    requestAddress
  } = useMemo(() => extractCurrent(txqueue), [txqueue]);
  useEffect(() => {
    isRpc && currentItem && sendRpc(api, queueSetTxStatus, currentItem).catch(console.error);
  }, [api, isRpc, currentItem, queueSetTxStatus]);

  const _onCancel = useCallback(() => {
    if (currentItem) {
      const {
        id,
        signerCb = NOOP,
        txFailedCb = NOOP
      } = currentItem;
      queueSetTxStatus(id, 'cancelled');
      signerCb(id, null);
      txFailedCb(null);
    }
  }, [currentItem, queueSetTxStatus]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [children, currentItem && isVisible && /*#__PURE__*/_jsx(Modal, {
      className: className,
      header: /*#__PURE__*/_jsxs(_Fragment, {
        children: [t('Authorize transaction'), count === 1 ? undefined : /*#__PURE__*/_jsxs(_Fragment, {
          children: ["\xA01/", count]
        })]
      }),
      onClose: _onCancel,
      size: "large",
      children: currentItem.isUnsigned ? /*#__PURE__*/_jsx(TxUnsigned, {
        currentItem: currentItem
      }) : /*#__PURE__*/_jsx(TxSigned, {
        currentItem: currentItem,
        requestAddress: requestAddress
      })
    }, currentItem.id)]
  });
}

export default /*#__PURE__*/React.memo(styled(Signer).withConfig({
  displayName: "src",
  componentId: "sc-183e5vf-0"
})([".signToggle{bottom:1.5rem;left:1.5rem;position:absolute;}"]));