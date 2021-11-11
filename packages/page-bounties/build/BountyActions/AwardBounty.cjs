"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = require("../helpers/index.cjs");

var _index2 = require("../hooks/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AwardBounty({
  curatorId,
  description,
  index
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    awardBounty
  } = (0, _index2.useBounties)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  const [beneficiaryId, setBeneficiaryId] = (0, _react.useState)(null);
  const isCurator = (0, _react.useMemo)(() => allAccounts.includes(curatorId.toString()), [allAccounts, curatorId]);
  return isCurator ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "award",
      isDisabled: false,
      label: t('Reward implementer'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: `${t('award bounty')} - "${(0, _index.truncateTitle)(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('The Curator account that will be used to send this transaction. Any applicable fees will be paid by this account.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            defaultValue: curatorId,
            help: t("Curator's account that will reward the bounty to the implementer."),
            isDisabled: true,
            label: t('award with account'),
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t("Reward the bounty to an implementer's account. The implementer will be able to claim the funds after a delay period."),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('Choose the Beneficiary for this bounty.'),
            label: t('implementer account'),
            onChange: setBeneficiaryId,
            withLabel: true
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: curatorId,
          icon: "check",
          label: t('Approve'),
          onStart: toggleOpen,
          params: [index, beneficiaryId],
          tx: awardBounty
        })
      })]
    })]
  }) : null;
}

var _default = /*#__PURE__*/_react.default.memo(AwardBounty);

exports.default = _default;