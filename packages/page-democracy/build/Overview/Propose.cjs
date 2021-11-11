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

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Propose({
  className = '',
  onClose
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [balance, setBalance] = (0, _react.useState)();
  const [{
    hash,
    isHashValid
  }, setHash] = (0, _react.useState)({
    hash: '',
    isHashValid: false
  });
  const publicProps = (0, _reactHooks.useCall)(api.query.democracy.publicProps);

  const _onChangeHash = (0, _react.useCallback)(hash => setHash({
    hash,
    isHashValid: (0, _util.isHex)(hash, 256)
  }), []);

  const hasMinLocked = balance === null || balance === void 0 ? void 0 : balance.gte(api.consts.democracy.minimumDeposit);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Submit proposal'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The proposal will be registered from this account and the balance lock will be applied here.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          help: t('The account you want to register the proposal from'),
          label: t('send from account'),
          labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Available, {
            label: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              className: "label",
              children: t('transferrable')
            }),
            params: accountId
          }),
          onChange: setAccountId,
          type: "account"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The hash of the preimage for the proposal as previously submitted or intended.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          help: t('The preimage hash of the proposal'),
          label: t('preimage hash'),
          onChange: _onChangeHash,
          value: hash
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The associated deposit for this proposal should be more then the minimum on-chain deposit required. It will be locked until the proposal passes.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          defaultValue: api.consts.democracy.minimumDeposit,
          help: t('The locked value for this proposal'),
          isError: !hasMinLocked,
          label: t('locked balance'),
          onChange: setBalance
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          defaultValue: api.consts.democracy.minimumDeposit,
          help: t('The minimum deposit required'),
          isDisabled: true,
          label: t('minimum deposit')
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        icon: "plus",
        isDisabled: !balance || !hasMinLocked || !isHashValid || !accountId || !publicProps,
        label: t('Submit proposal'),
        onStart: onClose,
        params: api.tx.democracy.propose.meta.args.length === 3 ? [hash, balance, publicProps === null || publicProps === void 0 ? void 0 : publicProps.length] : [hash, balance],
        tx: api.tx.democracy.propose
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Propose);

exports.default = _default;