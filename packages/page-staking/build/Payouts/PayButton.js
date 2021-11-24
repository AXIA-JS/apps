// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddressMini, Button, InputAddress, Modal, Static, TxButton } from '@axia-js/react-components';
import { useApi, useToggle, useTxBatch } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function createStream(api, payouts) {
  return payouts.sort((a, b) => a.era.cmp(b.era)).map(({
    era,
    validatorId
  }) => api.tx.staking.payoutStakers(validatorId, era));
}

function createExtrinsics(api, payout) {
  if (!Array.isArray(payout)) {
    const {
      eras,
      validatorId
    } = payout;
    return eras.length === 1 ? [api.tx.staking.payoutStakers(validatorId, eras[0].era)] : createStream(api, eras.map(era => ({
      era: era.era,
      validatorId
    })));
  } else if (payout.length === 1) {
    return createExtrinsics(api, payout[0]);
  }

  return createStream(api, payout.reduce((payouts, {
    eras,
    validatorId
  }) => {
    eras.forEach(({
      era
    }) => {
      payouts.push({
        era,
        validatorId
      });
    });
    return payouts;
  }, []));
}

function PayButton({
  className,
  isAll,
  isDisabled,
  payout
}) {
  var _api$consts$staking$m;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isVisible, togglePayout] = useToggle();
  const [accountId, setAccount] = useState(null);
  const [txs, setTxs] = useState(null);
  const extrinsics = useTxBatch(txs, {
    batchSize: 36 * 64 / (((_api$consts$staking$m = api.consts.staking.maxNominatorRewardedPerValidator) === null || _api$consts$staking$m === void 0 ? void 0 : _api$consts$staking$m.toNumber()) || 64)
  });
  useEffect(() => {
    payout && setTxs(() => createExtrinsics(api, payout));
  }, [api, payout]);
  const isPayoutEmpty = !payout || Array.isArray(payout) && payout.length === 0;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [payout && isVisible && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Payout all stakers'),
      onClose: togglePayout,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('Any account can request payout for stakers, this is not limited to accounts that will be rewarded.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            label: t('request payout from'),
            onChange: setAccount,
            type: "account",
            value: accountId
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('All the listed validators and all their nominators will receive their rewards.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('The UI puts a limit of 40 payouts at a time, where each payout is a single validator for a single era.')
            })]
          }),
          children: Array.isArray(payout) ? /*#__PURE__*/_jsx(Static, {
            label: t('payout stakers for (multiple)'),
            value: payout.map(({
              validatorId
            }) => /*#__PURE__*/_jsx(AddressMini, {
              className: "addressStatic",
              value: validatorId
            }, validatorId))
          }) : /*#__PURE__*/_jsx(InputAddress, {
            defaultValue: payout.validatorId,
            isDisabled: true,
            label: t('payout stakers for (single)')
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          extrinsic: extrinsics,
          icon: "credit-card",
          isDisabled: !extrinsics || !extrinsics.length || !accountId,
          label: t('Payout'),
          onStart: togglePayout
        })
      })]
    }), /*#__PURE__*/_jsx(Button, {
      icon: "credit-card",
      isDisabled: isDisabled || isPayoutEmpty,
      label: isAll || Array.isArray(payout) ? t('Payout all') : t('Payout'),
      onClick: togglePayout
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(PayButton).withConfig({
  displayName: "PayButton",
  componentId: "sc-1cb5jht-0"
})([".ui--AddressMini.padded.addressStatic{padding-top:0.5rem;.ui--AddressMini-info{min-width:10rem;max-width:10rem;}}"]));