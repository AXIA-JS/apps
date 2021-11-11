"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("@axia-js/app-bounties/hooks");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _index = require("./helpers/index.cjs");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MIN_TITLE_LEN = 1;
const TITLE_DEFAULT_VALUE = '';
const BOUNTY_DEFAULT_VALUE = _util.BN_ZERO;

function BountyCreate() {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    bountyDepositBase,
    bountyValueMinimum,
    dataDepositPerByte,
    maximumReasonLength,
    proposeBounty
  } = (0, _hooks.useBounties)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const balance = (0, _hooks.useBalance)(accountId);
  const [title, setTitle] = (0, _react.useState)('');
  const [bond, setBond] = (0, _react.useState)(bountyDepositBase);
  const [value, setValue] = (0, _react.useState)(BOUNTY_DEFAULT_VALUE);
  const [isOpen, toggleIsOpen] = (0, _reactHooks.useToggle)();
  const [isTitleValid, setIsTitleValid] = (0, _react.useState)(false);
  const [isValueValid, setIsValueValid] = (0, _react.useState)(false);
  const [hasFunds, setHasFunds] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setIsTitleValid((title === null || title === void 0 ? void 0 : title.length) >= MIN_TITLE_LEN && (0, _index.countUtf8Bytes)(title) <= maximumReasonLength);
  }, [maximumReasonLength, title]);
  (0, _react.useEffect)(() => {
    setIsValueValid(!!(value !== null && value !== void 0 && value.gte(bountyValueMinimum)));
  }, [bountyValueMinimum, value]);
  (0, _react.useEffect)(() => {
    setHasFunds(!!(balance !== null && balance !== void 0 && balance.gte(bond)));
  }, [balance, bond]);
  const isValid = hasFunds && isTitleValid && isValueValid;
  const onTitleChange = (0, _react.useCallback)(value => {
    setTitle(value);
    setBond((0, _index.calculateBountyBond)(value, bountyDepositBase, dataDepositPerByte));
  }, [bountyDepositBase, dataDepositPerByte]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: false,
      label: t('Add Bounty'),
      onClick: toggleIsOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: "ui--AddBountyModal",
      header: t('Add Bounty'),
      onClose: toggleIsOpen,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('Description of the Bounty (to be stored on-chain)'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            autoFocus: true,
            defaultValue: TITLE_DEFAULT_VALUE,
            help: t('The description of this bounty'),
            isError: !isTitleValid,
            label: t('bounty title'),
            onChange: onTitleChange,
            value: title
          }), !isTitleValid && title !== TITLE_DEFAULT_VALUE && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
            content: t('Title too long')
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('How much should be paid out for completed Bounty. Upon funding, the amount will be reserved in treasury.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            help: t("The total payment amount of this bounty, curator's fee included."),
            isError: !isValueValid,
            isZeroable: true,
            label: t('bounty requested allocation'),
            onChange: setValue,
            value: value
          }), !isValueValid && !(value !== null && value !== void 0 && value.eq(BOUNTY_DEFAULT_VALUE)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
            content: t('Allocation value is smaller than the minimum bounty value.')
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Proposer bond depends on bounty title length.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: bond.toString(),
            help: t('This amount will be reserved from origin account and returned on approval or slashed upon rejection.'),
            isDisabled: true,
            label: t('bounty bond')
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: t('This account will propose the bounty. Bond amount will be reserved on its balance.'),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('Select the account you wish to propose the bounty from.'),
            isError: !hasFunds,
            label: t('submit with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          }), !hasFunds && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
            content: t('Account does not have enough funds.')
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !accountId || !isValid,
          label: t('Add Bounty'),
          onStart: toggleIsOpen,
          params: [value, title],
          tx: proposeBounty
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BountyCreate);

exports.default = _default;