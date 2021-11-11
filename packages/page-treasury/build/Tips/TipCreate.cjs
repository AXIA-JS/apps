"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_REASON_LEN = 128;
const MIN_REASON_LEN = 5;

function TipCreate({
  members
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [beneficiary, setBeneficiary] = (0, _react.useState)(null);
  const [isMember, setIsMember] = (0, _react.useState)(false);
  const [reason, setReason] = (0, _react.useState)('');
  const [value, setValue] = (0, _react.useState)();
  const hasValue = value === null || value === void 0 ? void 0 : value.gtn(0);
  const hasReason = (reason === null || reason === void 0 ? void 0 : reason.length) >= MIN_REASON_LEN && (reason === null || reason === void 0 ? void 0 : reason.length) <= MAX_REASON_LEN;
  (0, _react.useEffect)(() => {
    setIsMember(members.includes(accountId || ''));
  }, [accountId, members]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      label: t('Propose tip'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: t('Submit tip request'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Use this account to request the tip from. This can be a normal or council account.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('Select the account you wish to submit the tip from.'),
            label: t('submit with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The beneficiary will received the tip as approved by council members.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('The account to which the tip will be transferred if approved'),
            label: t('beneficiary'),
            onChange: setBeneficiary,
            type: "allPlus"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('A reason (to be stored-on-chain) as to why the recipient deserves a tip payout.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            autoFocus: true,
            help: t('The reason why this tip should be paid.'),
            isError: !hasReason,
            label: t('tip reason'),
            onChange: setReason
          })
        }), isMember && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('As a council member, you can suggest an initial value for the tip, each other council member can suggest their own.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            help: t('The suggested value for this tip'),
            isError: !hasValue,
            label: t('tip value'),
            onChange: setValue
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !accountId || isMember && !hasValue || !hasReason,
          label: t('Propose tip'),
          onStart: toggleOpen,
          params: isMember ? [reason, beneficiary, value] : [reason, beneficiary],
          tx: isMember ? (api.tx.tips || api.tx.treasury).tipNew : (api.tx.tips || api.tx.treasury).reportAwesome
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(TipCreate);

exports.default = _default;