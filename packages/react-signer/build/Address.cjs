"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _Password = _interopRequireDefault(require("./Password.cjs"));

var _translate = require("./translate.cjs");

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
  return proxies.filter(_ref => {
    let [address, proxy] = _ref;

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
  }).map(_ref2 => {
    let [address] = _ref2;
    return address;
  });
}

async function queryForMultisig(api, requestAddress, proxyAddress, tx) {
  var _api$query$multiModul;

  const multiModule = api.tx.multisig ? 'multisig' : 'utility';

  if ((0, _util.isFunction)((_api$query$multiModul = api.query[multiModule]) === null || _api$query$multiModul === void 0 ? void 0 : _api$query$multiModul.multisigs)) {
    const address = proxyAddress || requestAddress;
    const {
      threshold,
      who
    } = (0, _util2.extractExternal)(address);
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

  if ((0, _util.isFunction)((_api$query$proxy = api.query.proxy) === null || _api$query$proxy === void 0 ? void 0 : _api$query$proxy.proxies)) {
    const {
      isProxied
    } = (0, _util2.extractExternal)(address);
    const [_proxies] = await api.query.proxy.proxies(address);
    const proxies = api.tx.proxy.addProxy.meta.args.length === 3 ? _proxies.map(_ref3 => {
      let {
        delegate,
        proxyType
      } = _ref3;
      return [delegate.toString(), proxyType];
    }) : _proxies.map(_ref4 => {
      let [delegate, proxyType] = _ref4;
      return [delegate.toString(), proxyType];
    });
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

function Address(_ref5) {
  let {
    currentItem,
    onChange,
    onEnter,
    passwordError,
    requestAddress
  } = _ref5;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const [multiAddress, setMultiAddress] = (0, _react.useState)(null);
  const [proxyAddress, setProxyAddress] = (0, _react.useState)(null);
  const [isMultiCall, setIsMultiCall] = (0, _react.useState)(false);
  const [isProxyActive, setIsProxyActive] = (0, _react.useState)(true);
  const [multiInfo, setMultInfo] = (0, _react.useState)(null);
  const [proxyInfo, setProxyInfo] = (0, _react.useState)(null);
  const [{
    isUnlockCached,
    signPassword
  }, setSignPassword] = (0, _react.useState)({
    isUnlockCached: false,
    signPassword: ''
  });
  const [signAddress, flags] = (0, _react.useMemo)(() => {
    const signAddress = multiInfo && multiAddress || isProxyActive && proxyInfo && proxyAddress || requestAddress;

    try {
      return [signAddress, (0, _util2.extractExternal)(signAddress)];
    } catch {
      return [signAddress, {}];
    }
  }, [multiAddress, proxyAddress, isProxyActive, multiInfo, proxyInfo, requestAddress]);

  const _updatePassword = (0, _react.useCallback)((signPassword, isUnlockCached) => setSignPassword({
    isUnlockCached,
    signPassword
  }), []);

  (0, _react.useEffect)(() => {
    !proxyInfo && setProxyAddress(null);
  }, [proxyInfo]); // proxy for requestor

  (0, _react.useEffect)(() => {
    setProxyInfo(null);
    currentItem.extrinsic && queryForProxy(api, allAccounts, requestAddress, currentItem.extrinsic).then(info => mountedRef.current && setProxyInfo(info)).catch(console.error);
  }, [allAccounts, api, currentItem, mountedRef, requestAddress]); // multisig

  (0, _react.useEffect)(() => {
    setMultInfo(null);
    currentItem.extrinsic && (0, _util2.extractExternal)(proxyAddress || requestAddress).isMultisig && queryForMultisig(api, requestAddress, proxyAddress, currentItem.extrinsic).then(info => {
      if (mountedRef.current) {
        setMultInfo(info);
        setIsMultiCall((info === null || info === void 0 ? void 0 : info.isMultiCall) || false);
      }
    }).catch(console.error);
  }, [proxyAddress, api, currentItem, mountedRef, requestAddress]);
  (0, _react.useEffect)(() => {
    onChange({
      isMultiCall,
      isUnlockCached,
      multiRoot: multiInfo ? multiInfo.address : null,
      proxyRoot: proxyInfo && isProxyActive ? proxyInfo.address : null,
      signAddress,
      signPassword
    });
  }, [isProxyActive, isMultiCall, isUnlockCached, multiAddress, multiInfo, onChange, proxyAddress, proxyInfo, signAddress, signPassword]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The sending account that will be used to send this transaction. Any applicable fees will be paid by this account.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        className: "full",
        defaultValue: requestAddress,
        isDisabled: true,
        isInput: true,
        label: t('sending from my account'),
        withLabel: true
      })
    }), proxyInfo && isProxyActive && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The proxy is one of the allowed proxies on the account, as set and filtered by the transaction type.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        filter: proxyInfo.proxiesFilter,
        help: t('The proxy to be used for this transaction.'),
        label: t('proxy account'),
        onChange: setProxyAddress,
        type: "account"
      })
    }), multiInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The signatory is one of the allowed accounts on the multisig, making a recorded approval for the transaction.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        filter: multiInfo.whoFilter,
        help: t('The multisig signatory for this transaction.'),
        label: t('multisig signatory'),
        onChange: setMultiAddress,
        type: "account"
      })
    }), signAddress && !currentItem.isUnsigned && flags.isUnlockable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Password.default, {
      address: signAddress,
      error: passwordError,
      onChange: _updatePassword,
      onEnter: onEnter
    }), passwordError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
        content: passwordError
      })
    }), proxyInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('This could either be an approval for the hash or with full call details. The call as last approval triggers execution.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "tipToggle",
        isDisabled: proxyInfo.isProxied,
        label: isProxyActive ? t('Use a proxy for this call') : t("Don't use a proxy for this call"),
        onChange: setIsProxyActive,
        value: isProxyActive
      })
    }), multiInfo && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('This could either be an approval for the hash or with full call details. The call as last approval triggers execution.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "tipToggle",
        label: isMultiCall ? t('Multisig message with call (for final approval)') : t('Multisig approval with hash (non-final approval)'),
        onChange: setIsMultiCall,
        value: isMultiCall
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Address);

exports.default = _default;