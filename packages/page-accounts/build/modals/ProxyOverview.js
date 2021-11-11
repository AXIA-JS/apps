// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { BatchWarning, Button, Dropdown, InputAddress, InputBalance, MarkError, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useTxBatch } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const optTxBatch = {
  isBatchAll: true
};
const EMPTY_EXISTING = [[], BN_ZERO];

function createAddProxy(api, account, type, delay = 0) {
  return api.tx.proxy.addProxy.meta.args.length === 2 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore old version
  ? api.tx.proxy.addProxy(account, type) : api.tx.proxy.addProxy(account, type, delay);
}

function createRmProxy(api, account, type, delay = 0) {
  return api.tx.proxy.removeProxy.meta.args.length === 2 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore old version
  ? api.tx.proxy.removeProxy(account, type) : api.tx.proxy.removeProxy(account, type, delay);
}

function PrevProxy({
  index,
  onRemove,
  typeOpts,
  value: [accountId, type]
}) {
  const {
    t
  } = useTranslation();

  const _onRemove = useCallback(() => onRemove(accountId, type, index), [accountId, index, onRemove, type]);

  return /*#__PURE__*/_jsxs("div", {
    className: "proxy-container",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "input-column",
      children: [/*#__PURE__*/_jsx(InputAddress, {
        defaultValue: accountId,
        isDisabled: true,
        label: t('proxy account')
      }), /*#__PURE__*/_jsx(Dropdown, {
        help: 'Type of proxy',
        isDisabled: true,
        label: 'type',
        options: typeOpts,
        value: type.toNumber()
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "buttons-column",
      children: /*#__PURE__*/_jsx(Button, {
        icon: "times",
        onClick: _onRemove
      })
    })]
  });
}

function NewProxy({
  index,
  onChangeAccount,
  onChangeType,
  onRemove,
  proxiedAccount,
  typeOpts,
  value: [accountId, type]
}) {
  const {
    t
  } = useTranslation();

  const _onChangeAccount = useCallback(value => onChangeAccount(index, value), [index, onChangeAccount]);

  const _onChangeType = useCallback(value => onChangeType(index, value), [index, onChangeType]);

  const _onRemove = useCallback(() => onRemove(index), [index, onRemove]);

  return /*#__PURE__*/_jsxs("div", {
    className: "proxy-container",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "input-column",
      children: [/*#__PURE__*/_jsx(InputAddress, {
        label: t('proxy account'),
        onChange: _onChangeAccount,
        type: "account",
        value: accountId
      }), accountId.eq(proxiedAccount) && /*#__PURE__*/_jsx(MarkError, {
        content: t('You should not setup proxies to act as a self-proxy.')
      }), /*#__PURE__*/_jsx(Dropdown, {
        help: 'Type of proxy',
        label: 'type',
        onChange: _onChangeType,
        options: typeOpts,
        value: type.toNumber()
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "buttons-column",
      children: /*#__PURE__*/_jsx(Button, {
        icon: "times",
        onClick: _onRemove
      })
    })]
  }, `addedProxy-${index}`);
}

function ProxyOverview({
  className,
  onClose,
  previousProxy: [existing] = EMPTY_EXISTING,
  proxiedAccount
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [batchPrevious, setBatchPrevious] = useState([]);
  const [batchAdded, setBatchAdded] = useState([]);
  const [txs, setTxs] = useState(null);
  const [previous, setPrevious] = useState(() => existing.map(({
    delegate,
    proxyType
  }) => [delegate, proxyType]));
  const [added, setAdded] = useState([]);
  const extrinsics = useTxBatch(txs, optTxBatch);
  const reservedAmount = useMemo(() => api.consts.proxy.proxyDepositFactor.muln(batchPrevious.length + batchAdded.length).iadd(api.consts.proxy.proxyDepositBase), [api, batchPrevious, batchAdded]);
  const typeOpts = useRef(api.createType('ProxyType').defKeys.map((text, value) => ({
    text,
    value
  })));
  useEffect(() => {
    setBatchAdded(added.map(([newAccount, newType]) => createAddProxy(api, newAccount, newType)));
  }, [api, added]);
  useEffect(() => {
    setTxs(() => [...batchPrevious, ...batchAdded]);
  }, [batchPrevious, batchAdded]);

  const _addProxy = useCallback(() => setAdded(added => [...added, [added.length ? added[added.length - 1][0] : previous.length ? previous[previous.length - 1][0] : api.createType('AccountId', proxiedAccount), api.createType('ProxyType', 0)]]), [api, previous, proxiedAccount]);

  const _delProxy = useCallback(index => setAdded(added => added.filter((_, i) => i !== index)), []);

  const _delPrev = useCallback((accountId, type, index) => {
    setPrevious(previous => previous.filter((_, i) => i !== index));
    setBatchPrevious(previous => [...previous, createRmProxy(api, accountId, type)]);
  }, [api]);

  const _changeProxyAccount = useCallback((index, address) => setAdded(prevState => {
    const newState = [...prevState];
    newState[index][0] = api.createType('AccountId', address);
    return newState;
  }), [api]);

  const _changeProxyType = useCallback((index, newTypeNumber) => setAdded(added => {
    const newState = [...added];
    newState[index][1] = api.createType('ProxyType', newTypeNumber);
    return newState;
  }), [api]);

  const isSameAdd = added.some(([accountId]) => accountId.eq(proxiedAccount));
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Proxy overview'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('Any account set as proxy will be able to perform actions in place of the proxied account'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          isDisabled: true,
          label: t('proxied account'),
          type: "account",
          value: proxiedAccount
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('If you add several proxy accounts for the same proxy type (e.g 2 accounts set as proxy for Governance), then any of those 2 accounts will be able to perfom governance actions on behalf of the proxied account'),
        children: [previous.map((value, index) => /*#__PURE__*/_jsx(PrevProxy, {
          index: index,
          onRemove: _delPrev,
          typeOpts: typeOpts.current,
          value: value
        }, `${value.toString()}-${index}`)), added.map((value, index) => /*#__PURE__*/_jsx(NewProxy, {
          index: index,
          onChangeAccount: _changeProxyAccount,
          onChangeType: _changeProxyType,
          onRemove: _delProxy,
          proxiedAccount: proxiedAccount,
          typeOpts: typeOpts.current,
          value: value
        }, `${value.toString()}-${index}`)), /*#__PURE__*/_jsx(Button.Group, {
          children: /*#__PURE__*/_jsx(Button, {
            icon: "plus",
            label: t('Add proxy'),
            onClick: _addProxy
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The amount that is reserved for the proxy based on the base deposit and number of proxies'),
        children: /*#__PURE__*/_jsx(InputBalance, {
          defaultValue: reservedAmount,
          isDisabled: true,
          label: t('reserved balance')
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        children: /*#__PURE__*/_jsx(BatchWarning, {})
      })]
    }), /*#__PURE__*/_jsxs(Modal.Actions, {
      children: [existing.length !== 0 && /*#__PURE__*/_jsx(TxButton, {
        accountId: proxiedAccount,
        icon: "trash-alt",
        label: t('Clear all'),
        onStart: onClose,
        tx: api.tx.proxy.removeProxies
      }), /*#__PURE__*/_jsx(TxButton, {
        accountId: proxiedAccount,
        extrinsic: extrinsics,
        icon: "sign-in-alt",
        isDisabled: isSameAdd || !batchPrevious.length && !batchAdded.length,
        onStart: onClose
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(ProxyOverview).withConfig({
  displayName: "ProxyOverview",
  componentId: "sc-b238b3-0"
})([".proxy-container{display:grid;grid-column-gap:0.5rem;grid-template-columns:minmax(0,1fr) auto;margin-bottom:1rem;.input-column{grid-column:1;}.buttons-column{grid-column:2;padding-top:0.3rem;}}"]));