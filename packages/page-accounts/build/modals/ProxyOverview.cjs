"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optTxBatch = {
  isBatchAll: true
};
const EMPTY_EXISTING = [[], _util.BN_ZERO];

function createAddProxy(api, account, type) {
  let delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return api.tx.proxy.addProxy.meta.args.length === 2 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore old version
  ? api.tx.proxy.addProxy(account, type) : api.tx.proxy.addProxy(account, type, delay);
}

function createRmProxy(api, account, type) {
  let delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  return api.tx.proxy.removeProxy.meta.args.length === 2 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore old version
  ? api.tx.proxy.removeProxy(account, type) : api.tx.proxy.removeProxy(account, type, delay);
}

function PrevProxy(_ref) {
  let {
    index,
    onRemove,
    typeOpts,
    value: [accountId, type]
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();

  const _onRemove = (0, _react.useCallback)(() => onRemove(accountId, type, index), [accountId, index, onRemove, type]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "proxy-container",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "input-column",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: accountId,
        isDisabled: true,
        label: t('proxy account')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        help: 'Type of proxy',
        isDisabled: true,
        label: 'type',
        options: typeOpts,
        value: type.toNumber()
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "buttons-column",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "times",
        onClick: _onRemove
      })
    })]
  });
}

function NewProxy(_ref2) {
  let {
    index,
    onChangeAccount,
    onChangeType,
    onRemove,
    proxiedAccount,
    typeOpts,
    value: [accountId, type]
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();

  const _onChangeAccount = (0, _react.useCallback)(value => onChangeAccount(index, value), [index, onChangeAccount]);

  const _onChangeType = (0, _react.useCallback)(value => onChangeType(index, value), [index, onChangeType]);

  const _onRemove = (0, _react.useCallback)(() => onRemove(index), [index, onRemove]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "proxy-container",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "input-column",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        label: t('proxy account'),
        onChange: _onChangeAccount,
        type: "account",
        value: accountId
      }), accountId.eq(proxiedAccount) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
        content: t('You should not setup proxies to act as a self-proxy.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
        help: 'Type of proxy',
        label: 'type',
        onChange: _onChangeType,
        options: typeOpts,
        value: type.toNumber()
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "buttons-column",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "times",
        onClick: _onRemove
      })
    })]
  }, `addedProxy-${index}`);
}

function ProxyOverview(_ref3) {
  let {
    className,
    onClose,
    previousProxy: [existing] = EMPTY_EXISTING,
    proxiedAccount
  } = _ref3;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [batchPrevious, setBatchPrevious] = (0, _react.useState)([]);
  const [batchAdded, setBatchAdded] = (0, _react.useState)([]);
  const [txs, setTxs] = (0, _react.useState)(null);
  const [previous, setPrevious] = (0, _react.useState)(() => existing.map(_ref4 => {
    let {
      delegate,
      proxyType
    } = _ref4;
    return [delegate, proxyType];
  }));
  const [added, setAdded] = (0, _react.useState)([]);
  const extrinsics = (0, _reactHooks.useTxBatch)(txs, optTxBatch);
  const reservedAmount = (0, _react.useMemo)(() => api.consts.proxy.proxyDepositFactor.muln(batchPrevious.length + batchAdded.length).iadd(api.consts.proxy.proxyDepositBase), [api, batchPrevious, batchAdded]);
  const typeOpts = (0, _react.useRef)(api.createType('ProxyType').defKeys.map((text, value) => ({
    text,
    value
  })));
  (0, _react.useEffect)(() => {
    setBatchAdded(added.map(_ref5 => {
      let [newAccount, newType] = _ref5;
      return createAddProxy(api, newAccount, newType);
    }));
  }, [api, added]);
  (0, _react.useEffect)(() => {
    setTxs(() => [...batchPrevious, ...batchAdded]);
  }, [batchPrevious, batchAdded]);

  const _addProxy = (0, _react.useCallback)(() => setAdded(added => [...added, [added.length ? added[added.length - 1][0] : previous.length ? previous[previous.length - 1][0] : api.createType('AccountId', proxiedAccount), api.createType('ProxyType', 0)]]), [api, previous, proxiedAccount]);

  const _delProxy = (0, _react.useCallback)(index => setAdded(added => added.filter((_, i) => i !== index)), []);

  const _delPrev = (0, _react.useCallback)((accountId, type, index) => {
    setPrevious(previous => previous.filter((_, i) => i !== index));
    setBatchPrevious(previous => [...previous, createRmProxy(api, accountId, type)]);
  }, [api]);

  const _changeProxyAccount = (0, _react.useCallback)((index, address) => setAdded(prevState => {
    const newState = [...prevState];
    newState[index][0] = api.createType('AccountId', address);
    return newState;
  }), [api]);

  const _changeProxyType = (0, _react.useCallback)((index, newTypeNumber) => setAdded(added => {
    const newState = [...added];
    newState[index][1] = api.createType('ProxyType', newTypeNumber);
    return newState;
  }), [api]);

  const isSameAdd = added.some(_ref6 => {
    let [accountId] = _ref6;
    return accountId.eq(proxiedAccount);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Proxy overview'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('Any account set as proxy will be able to perform actions in place of the proxied account'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          isDisabled: true,
          label: t('proxied account'),
          type: "account",
          value: proxiedAccount
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('If you add several proxy accounts for the same proxy type (e.g 2 accounts set as proxy for Governance), then any of those 2 accounts will be able to perfom governance actions on behalf of the proxied account'),
        children: [previous.map((value, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(PrevProxy, {
          index: index,
          onRemove: _delPrev,
          typeOpts: typeOpts.current,
          value: value
        }, `${value.toString()}-${index}`)), added.map((value, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(NewProxy, {
          index: index,
          onChangeAccount: _changeProxyAccount,
          onChangeType: _changeProxyType,
          onRemove: _delProxy,
          proxiedAccount: proxiedAccount,
          typeOpts: typeOpts.current,
          value: value
        }, `${value.toString()}-${index}`)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "plus",
            label: t('Add proxy'),
            onClick: _addProxy
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The amount that is reserved for the proxy based on the base deposit and number of proxies'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          defaultValue: reservedAmount,
          isDisabled: true,
          label: t('reserved balance')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.BatchWarning, {})
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
      children: [existing.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: proxiedAccount,
        icon: "trash-alt",
        label: t('Clear all'),
        onStart: onClose,
        tx: api.tx.proxy.removeProxies
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: proxiedAccount,
        extrinsic: extrinsics,
        icon: "sign-in-alt",
        isDisabled: isSameAdd || !batchPrevious.length && !batchAdded.length,
        onStart: onClose
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(ProxyOverview).withConfig({
  displayName: "ProxyOverview",
  componentId: "sc-7xgery-0"
})([".proxy-container{display:grid;grid-column-gap:0.5rem;grid-template-columns:minmax(0,1fr) auto;margin-bottom:1rem;.input-column{grid-column:1;}.buttons-column{grid-column:2;padding-top:0.3rem;}}"]));

exports.default = _default;