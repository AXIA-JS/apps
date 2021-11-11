// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InputAddress, MarkError, Modal, Toggle } from '@axia-js/react-components';
import { useAccounts, useApi, useIsMountedRef } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';
import Password from "./Password.js";
import { useTranslation } from "./translate.js";
import { extractExternal } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function findCall(tx) {
  try {
    const {
      method,
      section
    } = tx.registry.findMetaCall(tx.callIndex);
    return {
      method,
      section
    };
  } catch (error) {
    return {
      method: 'unknown',
      section: 'unknown'
    };
  }
}

function filterProxies(allAccounts, tx, proxies) {
  // check an array of calls to all have proxies as the address
  const checkCalls = (address, txs) => !txs.some(tx => !filterProxies(allAccounts, tx, proxies).includes(address)); // get the call info


  const {
    method,
    section
  } = findCall(tx);
  return proxies.filter(([address, proxy]) => {
    if (!allAccounts.includes(address)) {
      return false;
    }

    switch (proxy.toString()) {
      case 'Any':
        return true;

      case 'Governance':
        return ['council', 'democracy', 'elections', 'electionsPhragmen', 'phragmenElection', 'poll', 'society', 'technicalCommittee', 'tips', 'treasury'].includes(section);

      case 'IdentityJudgement':
        return section === 'identity' && method === 'provideJudgement';

      case 'NonTransfer':
        return !(section === 'balances' || section === 'indices' && method === 'transfer' || section === 'vesting' && method === 'vestedTransfer');

      case 'Staking':
        return section === 'staking' || section === 'utility' && (method === 'batch' && checkCalls(address, tx.args[0]) || method === 'asLimitedSub' && checkCalls(address, [tx.args[0]]));

      case 'SudoBalances':
        return section === 'sudo' && method === 'sudo' && findCall(tx.args[0]).section === 'balances' || section === 'utility' && method === 'batch' && checkCalls(address, tx.args[0]);

      default:
        return false;
    }
  }).map(([address]) => address);
}

async function queryForMultisig(api, requestAddress, proxyAddress, tx) {
  var _api$query$multiModul;

  const multiModule = api.tx.multisig ? 'multisig' : 'utility';

  if (isFunction((_api$query$multiModul = api.query[multiModule]) === null || _api$query$multiModul === void 0 ? void 0 : _api$query$multiModul.multisigs)) {
    const address = proxyAddress || requestAddress;
    const {
      threshold,
      who
    } = extractExternal(address);
    const hash = (proxyAddress ? api.tx.proxy.proxy(requestAddress, null, tx) : tx).method.hash;
    const optMulti = await api.query[multiModule].multisigs(address, hash);
    const multi = optMulti.unwrapOr(null);
    return multi ? {
      address,
      isMultiCall: multi.approvals.length + 1 >= threshold,
      who,
      whoFilter: who.filter(w => !multi.approvals.some(a => a.eq(w)))
    } : {
      address,
      isMultiCall: false,
      who,
      whoFilter: who
    };
  }

  return null;
}

async function queryForProxy(api, allAccounts, address, tx) {
  var _api$query$proxy;

  if (isFunction((_api$query$proxy = api.query.proxy) === null || _api$query$proxy === void 0 ? void 0 : _api$query$proxy.proxies)) {
    const {
      isProxied
    } = extractExternal(address);
    const [_proxies] = await api.query.proxy.proxies(address);
    const proxies = api.tx.proxy.addProxy.meta.args.length === 3 ? _proxies.map(({
      delegate,
      proxyType
    }) => [delegate.toString(), proxyType]) : _proxies.map(([delegate, proxyType]) => [delegate.toString(), proxyType]);
    const proxiesFilter = filterProxies(allAccounts, tx, proxies);

    if (proxiesFilter.length) {
      return {
        address,
        isProxied,
        proxies,
        proxiesFilter
      };
    }
  }

  return null;
}

function Address({
  currentItem,
  onChange,
  onEnter,
  passwordError,
  requestAddress
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const mountedRef = useIsMountedRef();
  const [multiAddress, setMultiAddress] = useState(null);
  const [proxyAddress, setProxyAddress] = useState(null);
  const [isMultiCall, setIsMultiCall] = useState(false);
  const [isProxyActive, setIsProxyActive] = useState(true);
  const [multiInfo, setMultInfo] = useState(null);
  const [proxyInfo, setProxyInfo] = useState(null);
  const [{
    isUnlockCached,
    signPassword
  }, setSignPassword] = useState({
    isUnlockCached: false,
    signPassword: ''
  });
  const [signAddress, flags] = useMemo(() => {
    const signAddress = multiInfo && multiAddress || isProxyActive && proxyInfo && proxyAddress || requestAddress;

    try {
      return [signAddress, extractExternal(signAddress)];
    } catch {
      return [signAddress, {}];
    }
  }, [multiAddress, proxyAddress, isProxyActive, multiInfo, proxyInfo, requestAddress]);

  const _updatePassword = useCallback((signPassword, isUnlockCached) => setSignPassword({
    isUnlockCached,
    signPassword
  }), []);

  useEffect(() => {
    !proxyInfo && setProxyAddress(null);
  }, [proxyInfo]); // proxy for requestor

  useEffect(() => {
    setProxyInfo(null);
    currentItem.extrinsic && queryForProxy(api, allAccounts, requestAddress, currentItem.extrinsic).then(info => mountedRef.current && setProxyInfo(info)).catch(console.error);
  }, [allAccounts, api, currentItem, mountedRef, requestAddress]); // multisig

  useEffect(() => {
    setMultInfo(null);
    currentItem.extrinsic && extractExternal(proxyAddress || requestAddress).isMultisig && queryForMultisig(api, requestAddress, proxyAddress, currentItem.extrinsic).then(info => {
      if (mountedRef.current) {
        setMultInfo(info);
        setIsMultiCall((info === null || info === void 0 ? void 0 : info.isMultiCall) || false);
      }
    }).catch(console.error);
  }, [proxyAddress, api, currentItem, mountedRef, requestAddress]);
  useEffect(() => {
    onChange({
      isMultiCall,
      isUnlockCached,
      multiRoot: multiInfo ? multiInfo.address : null,
      proxyRoot: proxyInfo && isProxyActive ? proxyInfo.address : null,
      signAddress,
      signPassword
    });
  }, [isProxyActive, isMultiCall, isUnlockCached, multiAddress, multiInfo, onChange, proxyAddress, proxyInfo, signAddress, signPassword]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The sending account that will be used to send this transaction. Any applicable fees will be paid by this account.'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        className: "full",
        defaultValue: requestAddress,
        isDisabled: true,
        isInput: true,
        label: t('sending from my account'),
        withLabel: true
      })
    }), proxyInfo && isProxyActive && /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The proxy is one of the allowed proxies on the account, as set and filtered by the transaction type.'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        filter: proxyInfo.proxiesFilter,
        help: t('The proxy to be used for this transaction.'),
        label: t('proxy account'),
        onChange: setProxyAddress,
        type: "account"
      })
    }), multiInfo && /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The signatory is one of the allowed accounts on the multisig, making a recorded approval for the transaction.'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        filter: multiInfo.whoFilter,
        help: t('The multisig signatory for this transaction.'),
        label: t('multisig signatory'),
        onChange: setMultiAddress,
        type: "account"
      })
    }), signAddress && !currentItem.isUnsigned && flags.isUnlockable && /*#__PURE__*/_jsx(Password, {
      address: signAddress,
      error: passwordError,
      onChange: _updatePassword,
      onEnter: onEnter
    }), passwordError && /*#__PURE__*/_jsx(Modal.Columns, {
      children: /*#__PURE__*/_jsx(MarkError, {
        content: passwordError
      })
    }), proxyInfo && /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('This could either be an approval for the hash or with full call details. The call as last approval triggers execution.'),
      children: /*#__PURE__*/_jsx(Toggle, {
        className: "tipToggle",
        isDisabled: proxyInfo.isProxied,
        label: isProxyActive ? t('Use a proxy for this call') : t("Don't use a proxy for this call"),
        onChange: setIsProxyActive,
        value: isProxyActive
      })
    }), multiInfo && /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('This could either be an approval for the hash or with full call details. The call as last approval triggers execution.'),
      children: /*#__PURE__*/_jsx(Toggle, {
        className: "tipToggle",
        label: isMultiCall ? t('Multisig message with call (for final approval)') : t('Multisig approval with hash (non-final approval)'),
        onChange: setIsMultiCall,
        value: isMultiCall
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Address);