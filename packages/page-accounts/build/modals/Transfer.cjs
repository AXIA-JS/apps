"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _phishing = require("@axia-js/phishing");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isRefcount(accountInfo) {
  return !!accountInfo.refcount;
}

async function checkPhishing(_senderId, recipientId) {
  return [// not being checked atm
  // senderId
  //   ? await checkAddress(senderId)
  //   : null,
  null, recipientId ? await (0, _phishing.checkAddress)(recipientId) : null];
}

function Transfer(_ref) {
  var _api$derive$balances;

  let {
    className = '',
    onClose,
    recipientId: propRecipientId,
    senderId: propSenderId
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [amount, setAmount] = (0, _react.useState)(_util.BN_ZERO);
  const [hasAvailable] = (0, _react.useState)(true);
  const [isProtected, setIsProtected] = (0, _react.useState)(true);
  const [isAll, setIsAll] = (0, _react.useState)(false);
  const [[maxTransfer, noFees], setMaxTransfer] = (0, _react.useState)([null, false]);
  const [recipientId, setRecipientId] = (0, _react.useState)(null);
  const [senderId, setSenderId] = (0, _react.useState)(null);
  const [[, recipientPhish], setPhishing] = (0, _react.useState)([null, null]);
  const balances = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [propSenderId || senderId]);
  const accountInfo = (0, _reactHooks.useCall)(api.query.system.account, [propSenderId || senderId]);
  (0, _react.useEffect)(() => {
    var _api$rpc$payment;

    const fromId = propSenderId || senderId;
    const toId = propRecipientId || recipientId;

    if (balances && balances.accountId.eq(fromId) && fromId && toId && (0, _util.isFunction)((_api$rpc$payment = api.rpc.payment) === null || _api$rpc$payment === void 0 ? void 0 : _api$rpc$payment.queryInfo)) {
      setTimeout(() => {
        try {
          api.tx.balances.transfer(toId, balances.availableBalance).paymentInfo(fromId).then(_ref2 => {
            let {
              partialFee
            } = _ref2;
            const adjFee = partialFee.muln(110).div(_util.BN_HUNDRED);
            const maxTransfer = balances.availableBalance.sub(adjFee);
            setMaxTransfer(maxTransfer.gt(api.consts.balances.existentialDeposit) ? [maxTransfer, false] : [null, true]);
          }).catch(console.error);
        } catch (error) {
          console.error(error.message);
        }
      }, 0);
    } else {
      setMaxTransfer([null, false]);
    }
  }, [api, balances, propRecipientId, propSenderId, recipientId, senderId]);
  (0, _react.useEffect)(() => {
    checkPhishing(propSenderId || senderId, propRecipientId || recipientId).then(setPhishing).catch(console.error);
  }, [propRecipientId, propSenderId, recipientId, senderId]);
  const noReference = accountInfo ? isRefcount(accountInfo) ? accountInfo.refcount.isZero() : accountInfo.consumers.isZero() : true;
  const canToggleAll = !isProtected && balances && balances.accountId.eq(propSenderId || senderId) && maxTransfer && noReference;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: "app--accounts-Modal",
    header: t('Send funds'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: className,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The transferred balance will be subtracted (along with fees) from the sender account.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            defaultValue: propSenderId,
            help: t('The account you will send funds from.'),
            isDisabled: !!propSenderId,
            label: t('send from account'),
            labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Available, {
              label: t('transferrable'),
              params: propSenderId || senderId
            }),
            onChange: setSenderId,
            type: "account"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('The beneficiary will have access to the transferred fees when the transaction is included in a block.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            defaultValue: propRecipientId,
            help: t('Select a contact or paste the address you want to send funds to.'),
            isDisabled: !!propRecipientId,
            label: t('send to address'),
            labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Available, {
              label: t('transferrable'),
              params: propRecipientId || recipientId
            }),
            onChange: setRecipientId,
            type: "allPlus"
          }), recipientPhish && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
            content: t('The recipient is associated with a known phishing site on {{url}}', {
              replace: {
                url: recipientPhish
              }
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('If the recipient account is new, the balance needs to be more than the existential deposit. Likewise if the sending account balance drops below the same value, the account will be removed from the state.'),
          children: canToggleAll && isAll ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            autoFocus: true,
            defaultValue: maxTransfer,
            help: t('The full account balance to be transferred, minus the transaction fees'),
            isDisabled: true,
            label: t('transferrable minus fees')
          }, maxTransfer === null || maxTransfer === void 0 ? void 0 : maxTransfer.toString()) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
              autoFocus: true,
              help: t('Type the amount you want to transfer. Note that you can select the unit on the right e.g sending 1 milli is equivalent to sending 0.001.'),
              isError: !hasAvailable,
              isZeroable: true,
              label: t('amount'),
              maxValue: maxTransfer,
              onChange: setAmount
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
              defaultValue: api.consts.balances.existentialDeposit,
              help: t('The minimum amount that an account should have to be deemed active'),
              isDisabled: true,
              label: t('existential deposit')
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('With the keep-alive option set, the account is protected against removal due to low balances.'),
          children: [(0, _util.isFunction)(api.tx.balances.transferKeepAlive) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
            className: "typeToggle",
            label: isProtected ? t('Transfer with account keep-alive checks') : t('Normal transfer without keep-alive checks'),
            onChange: setIsProtected,
            value: isProtected
          }), canToggleAll && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
            className: "typeToggle",
            label: t('Transfer the full account balance, reap the sender'),
            onChange: setIsAll,
            value: isAll
          }), !isProtected && !noReference && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
            content: t('There is an existing reference count on the sender account. As such the account cannot be reaped from the state.')
          }), noFees && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
            content: t('The transaction, after application of the transfer fees, will drop the available balance below the existential deposit. As such the transfer will fail. The account needs more free funds to cover the transaction fees.')
          })]
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: propSenderId || senderId,
        icon: "paper-plane",
        isDisabled: !hasAvailable || !(propRecipientId || recipientId) || !amount || !!recipientPhish,
        label: t('Make Transfer'),
        onStart: onClose,
        params: canToggleAll && isAll ? [propRecipientId || recipientId, maxTransfer] : [propRecipientId || recipientId, amount],
        tx: isProtected && api.tx.balances.transferKeepAlive || api.tx.balances.transfer
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Transfer).withConfig({
  displayName: "Transfer",
  componentId: "sc-3jj124-0"
})([".balance{margin-bottom:0.5rem;text-align:right;padding-right:1rem;.label{opacity:0.7;}}label.with-help{flex-basis:10rem;}.typeToggle{text-align:right;}.typeToggle+.typeToggle{margin-top:0.375rem;}"]));

exports.default = _default;