// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { Button, InputAddress, InputBalance, MarkWarning, Modal, Static, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { BN_HUNDRED, BN_MILLION } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Propose({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [accountId, setAccountId] = useState(null);
  const [beneficiary, setBeneficiary] = useState(null);
  const [isOpen, toggleOpen] = useToggle();
  const [value, setValue] = useState();
  const hasValue = value === null || value === void 0 ? void 0 : value.gtn(0);
  const bondPercentage = useMemo(() => `${api.consts.treasury.proposalBond.mul(BN_HUNDRED).div(BN_MILLION).toNumber().toFixed(2)}%`, [api]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Submit treasury proposal'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('This account will make the proposal and be responsible for the bond.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('Select the account you wish to submit the proposal from.'),
            label: t('submit with account'),
            onChange: setAccountId,
            type: "account",
            withLabel: true
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The beneficiary will receive the full amount if the proposal passes.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            help: t('The account to which the proposed balance will be transferred if approved'),
            label: t('beneficiary'),
            onChange: setBeneficiary,
            type: "allPlus"
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('The value is the amount that is being asked for and that will be allocated to the beneficiary if the proposal is approved.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('Of the beneficiary amount, at least {{bondPercentage}} would need to be put up as collateral. The maximum of this and the minimum bond will be used to secure the proposal, refundable if it passes.', {
                replace: {
                  bondPercentage
                }
              })
            })]
          }),
          children: [/*#__PURE__*/_jsx(InputBalance, {
            help: t('The amount that will be allocated from the treasury pot'),
            isError: !hasValue,
            label: t('value'),
            onChange: setValue
          }), /*#__PURE__*/_jsx(Static, {
            help: t('The on-chain percentage for the treasury'),
            label: t('proposal bond'),
            children: bondPercentage
          }), /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: api.consts.treasury.proposalBondMinimum.toString(),
            help: t('The minimum amount that will be bonded'),
            isDisabled: true,
            label: t('minimum bond')
          }), /*#__PURE__*/_jsx(MarkWarning, {
            content: t('Be aware that once submitted the proposal will be put to a council vote. If the proposal is rejected due to a lack of info, invalid requirements or non-benefit to the network as a whole, the full bond posted (as describe above) will be lost.')
          })]
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !accountId || !hasValue,
          label: t('Submit proposal'),
          onStart: toggleOpen,
          params: [value, beneficiary],
          tx: api.tx.treasury.proposeSpend
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "plus",
      label: t('Submit proposal'),
      onClick: toggleOpen
    })]
  });
}

export default /*#__PURE__*/React.memo(Propose);