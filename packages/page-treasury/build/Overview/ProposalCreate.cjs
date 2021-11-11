"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Propose({
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [beneficiary, setBeneficiary] = (0, _react.useState)(null);
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [value, setValue] = (0, _react.useState)();
  const hasValue = value === null || value === void 0 ? void 0 : value.gtn(0);
  const bondPercentage = (0, _react.useMemo)(() => `${api.consts.treasury.proposalBond.mul(_util.BN_HUNDRED).div(_util.BN_MILLION).toNumber().toFixed(2)}%`, [api]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      className: className,
      header: t('Submit treasury proposal'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('This account will make the proposal and be responsible for the bond.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('Select the account you wish to submit the proposal from.'),
            label: t('submit with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The beneficiary will receive the full amount if the proposal passes.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('The account to which the proposed balance will be transferred if approved'),
            label: t('beneficiary'),
            onChange: setBeneficiary,
            type: "allPlus"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
          hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('The value is the amount that is being asked for and that will be allocated to the beneficiary if the proposal is approved.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('Of the beneficiary amount, at least {{bondPercentage}} would need to be put up as collateral. The maximum of this and the minimum bond will be used to secure the proposal, refundable if it passes.', {
                replace: {
                  bondPercentage
                }
              })
            })]
          }),
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            help: t('The amount that will be allocated from the treasury pot'),
            isError: !hasValue,
            label: t('value'),
            onChange: setValue
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
            help: t('The on-chain percentage for the treasury'),
            label: t('proposal bond'),
            children: bondPercentage
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
            defaultValue: api.consts.treasury.proposalBondMinimum.toString(),
            help: t('The minimum amount that will be bonded'),
            isDisabled: true,
            label: t('minimum bond')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
            content: t('Be aware that once submitted the proposal will be put to a council vote. If the proposal is rejected due to a lack of info, invalid requirements or non-benefit to the network as a whole, the full bond posted (as describe above) will be lost.')
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !accountId || !hasValue,
          label: t('Submit proposal'),
          onStart: toggleOpen,
          params: [value, beneficiary],
          tx: api.tx.treasury.proposeSpend
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      label: t('Submit proposal'),
      onClick: toggleOpen
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Propose);

exports.default = _default;