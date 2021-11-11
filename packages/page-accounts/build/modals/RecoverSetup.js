// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { InputAddress, InputAddressMulti, InputNumber, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { sortAddresses } from '@axia-js/util-crypto';
import useKnownAddresses from "../Accounts/useKnownAddresses.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MAX_HELPERS = 16;

function RecoverSetup({
  address,
  className = '',
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const availableHelpers = useKnownAddresses(address);
  const [delay, setDelay] = useState();
  const [helpers, setHelpers] = useState([]);
  const [threshold, setThreshold] = useState();
  const isErrorDelay = !delay;
  const isErrorHelpers = !helpers.length;
  const isErrorThreshold = !threshold || !threshold.gtn(0) || threshold.gtn(helpers.length);
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Setup account as recoverable'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The recoverable account is protected against the loss of seed/access by a social process.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          isDisabled: true,
          label: t('the account to make recoverable'),
          value: address
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("p", {
            children: t('These are trusted individuals that can verify and approve any recovery actions. With recovery, once the threshold is reached, the funds associated with the account can be moved to a new destination.')
          }), /*#__PURE__*/_jsx("p", {
            children: t('The helpers should be able to verify, via an off-chain mechanism, that the account owner indeed wishes to recover access and as such provide any approvals. In the cases of malicious recovery procedures, they will have the power to stop it.')
          })]
        }),
        children: /*#__PURE__*/_jsx(InputAddressMulti, {
          available: availableHelpers,
          availableLabel: t('available social recovery helpers'),
          help: t('The addresses that are able to help in recovery. You can select up to {{maxHelpers}} trusted helpers.', {
            replace: {
              maxHelpers: MAX_HELPERS
            }
          }),
          maxCount: MAX_HELPERS,
          onChange: setHelpers,
          value: helpers,
          valueLabel: t('trusted social recovery helpers')
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The threshold for approvals and the delay is the protection associated with the account. The delay should be such that any colluding recovery attempts does have a window to stop.'),
        children: [/*#__PURE__*/_jsx(InputNumber, {
          help: t('The threshold of vouches that is to be reached for the account to be recovered.'),
          isError: isErrorThreshold,
          label: t('recovery threshold'),
          onChange: setThreshold
        }), /*#__PURE__*/_jsx(InputNumber, {
          help: t('The delay between vouching and the availability of the recovered account.'),
          isError: isErrorDelay,
          isZeroable: true,
          label: t('recovery block delay'),
          onChange: setDelay
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: address,
        icon: "share-alt",
        isDisabled: isErrorHelpers || isErrorThreshold || isErrorDelay,
        label: t('Make recoverable'),
        onStart: onClose,
        params: [sortAddresses(helpers), threshold, delay],
        tx: api.tx.recovery.createRecovery
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(RecoverSetup);