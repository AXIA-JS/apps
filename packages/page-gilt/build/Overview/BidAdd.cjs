"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Bid(_ref) {
  let {
    className,
    isDisabled,
    proxies
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [proxyId, setProxyId] = (0, _react.useState)(null);
  const [amount, setAmount] = (0, _react.useState)();
  const [duration, setDuration] = (0, _react.useState)();
  const tx = (0, _react.useMemo)(() => accountId && amount && duration ? api.tx.proxy.proxy(accountId, null, api.tx.gilt.placeBid(amount, duration)) : null, [api, accountId, amount, duration]);
  const proxiedAccounts = Object.keys(proxies);
  const isAmountError = !amount || amount.isZero() || amount.lt(api.consts.gilt.minFreeze);
  const isDurationError = !duration || !duration.gte(_util.BN_ONE) || duration.gt(api.consts.gilt.queueCount);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !proxiedAccounts.length || isDisabled,
      label: t('Submit Bid'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('submit gilt bid'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('This account will make the bid for the gilt and pay all associated fees.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: proxiedAccounts,
            help: t('The account you want to register the bid from'),
            label: t('use proxied account'),
            labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Available, {
              label: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
                className: "label",
                children: t('transferrable')
              }),
              params: accountId
            }),
            onChange: setAccountId,
            type: "account"
          }), accountId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            filter: proxies[accountId],
            help: t('The associated proxy to use for this account'),
            label: t('send via proxy'),
            onChange: setProxyId,
            type: "account"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('The amount you wish to lock for the duration. It needs to be more than the gilt minimum.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            autoFocus: true,
            defaultValue: api.consts.gilt.minFreeze,
            isError: isAmountError,
            isZeroable: false,
            label: t('bid amount'),
            onChange: setAmount
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: api.consts.gilt.minFreeze,
            help: t('The minimum amount that is allowed as a bid'),
            isDisabled: true,
            label: t('minimum freeze amount')
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('The number of periods this bid is to be freezed for, less than the maximum period'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            defaultValue: _util.BN_ONE,
            isError: isDurationError,
            isZeroable: false,
            label: t('lock periods'),
            onChange: setDuration
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
            defaultValue: api.consts.gilt.queueCount,
            isDisabled: true,
            label: t('maximum lock periods')
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: proxyId,
          extrinsic: tx,
          icon: "check",
          isDisabled: isAmountError || isDurationError || !accountId,
          label: t('Bid'),
          onStart: toggleOpen
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Bid);

exports.default = _default;