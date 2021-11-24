"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const INVALID_PARAID = Number.MAX_SAFE_INTEGER;

function createOption(_ref) {
  let {
    info,
    paraId,
    text
  } = _ref;
  return {
    text: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Dropdown-item",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ChainImg, {
        className: "ui--Dropdown-icon",
        logo: info
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--Dropdown-name",
        children: text
      })]
    }, paraId),
    value: paraId || -1
  };
}

function Teleport(_ref2) {
  let {
    onClose
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [amount, setAmount] = (0, _react.useState)(_util.BN_ZERO);
  const [recipientId, setRecipientId] = (0, _react.useState)(null);
  const [senderId, setSenderId] = (0, _react.useState)(null);
  const [recipientParaId, setParaId] = (0, _react.useState)(INVALID_PARAID);
  const {
    allowTeleport,
    destinations,
    isParaTeleport,
    oneWay
  } = (0, _reactHooks.useTeleport)();
  const destWeight = (0, _react.useMemo)(() => (0, _appsConfig.getTeleportWeight)(api), [api]);
  const chainOpts = (0, _react.useMemo)(() => destinations.map(createOption), [destinations]);
  const url = (0, _react.useMemo)(() => {
    var _destinations$find;

    return (_destinations$find = destinations.find((_ref3, index) => {
      let {
        paraId
      } = _ref3;
      return recipientParaId === -1 ? index === 0 : recipientParaId === paraId;
    })) === null || _destinations$find === void 0 ? void 0 : _destinations$find.value;
  }, [destinations, recipientParaId]);
  const destApi = (0, _reactHooks.useApiUrl)(url);
  const weightFee = (0, _reactHooks.useWeightFee)(destWeight, destApi);
  const params = (0, _react.useMemo)(() => isParaTeleport ? [{
    X1: 'Parent'
  }, {
    X1: {
      AccountId32: {
        id: recipientId,
        network: 'Any'
      }
    }
  }, [{
    ConcreteFungible: {
      amount,
      id: {
        X1: 'Parent'
      }
    }
  }], destWeight] : [{
    X1: {
      AllyChain: recipientParaId
    }
  }, {
    X1: {
      AccountId32: {
        id: recipientId,
        network: 'Any'
      }
    }
  }, [{
    ConcreteFungible: {
      amount,
      id: 'Here'
    }
  }], destWeight], [amount, destWeight, isParaTeleport, recipientId, recipientParaId]);
  const hasAvailable = !!amount && amount.gte(weightFee);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Teleport assets'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The transferred balance will be subtracted (along with fees) from the sender account.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          label: t('send from account'),
          labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Available, {
            label: t('transferrable'),
            params: senderId
          }),
          onChange: setSenderId,
          type: "account"
        })
      }), chainOpts.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The destination chain for this asset teleport. The transferred value will appear on this chain.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          defaultValue: chainOpts[0].value,
          label: t('destination chain'),
          onChange: setParaId,
          options: chainOpts
        }), !isParaTeleport && oneWay.includes(recipientParaId) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
          content: t('Currently this is a one-way transfer since the on-chain runtime functionality to send the funds from the destination chain back to this account not yet available.')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The beneficiary will have access to the transferred amount when the transaction is included in a block.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          label: t('send to address'),
          onChange: setRecipientId,
          type: "allPlus"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('If the recipient account is new, the balance needs to be more than the existential deposit on the recipient chain.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('The amount deposited to the recipient will be net the calculated cross-chain fee.')
          })]
        }),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
          autoFocus: true,
          isError: !hasAvailable,
          isZeroable: true,
          label: t('amount'),
          onChange: setAmount
        }), destApi ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: weightFee,
            isDisabled: true,
            label: t('destination transfer fee')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: destApi.consts.balances.existentialDeposit,
            isDisabled: true,
            label: t('destination existential deposit')
          })]
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
          label: t('Retrieving destination chain fees'),
          variant: "appPadded"
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: senderId,
        icon: "share-square",
        isDisabled: !allowTeleport || !hasAvailable || !recipientId || !amount || !destApi || !isParaTeleport && recipientParaId === INVALID_PARAID,
        label: t('Teleport'),
        onStart: onClose,
        params: params,
        tx: api.tx.xcm && api.tx.xcm.teleportAssets || api.tx.xcmPallet && api.tx.xcmPallet.teleportAssets || api.tx.axiaXcm && api.tx.axiaXcm.teleportAssets
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Teleport);

exports.default = _default;