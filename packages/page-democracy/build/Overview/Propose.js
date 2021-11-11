// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Input, InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { Available } from '@axia-js/react-query';
import { isHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Propose({
  className = '',
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [accountId, setAccountId] = useState(null);
  const [balance, setBalance] = useState();
  const [{
    hash,
    isHashValid
  }, setHash] = useState({
    hash: '',
    isHashValid: false
  });
  const publicProps = useCall(api.query.democracy.publicProps);

  const _onChangeHash = useCallback(hash => setHash({
    hash,
    isHashValid: isHex(hash, 256)
  }), []);

  const hasMinLocked = balance === null || balance === void 0 ? void 0 : balance.gte(api.consts.democracy.minimumDeposit);
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Submit proposal'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The proposal will be registered from this account and the balance lock will be applied here.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          help: t('The account you want to register the proposal from'),
          label: t('send from account'),
          labelExtra: /*#__PURE__*/_jsx(Available, {
            label: /*#__PURE__*/_jsx("span", {
              className: "label",
              children: t('transferrable')
            }),
            params: accountId
          }),
          onChange: setAccountId,
          type: "account"
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The hash of the preimage for the proposal as previously submitted or intended.'),
        children: /*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          help: t('The preimage hash of the proposal'),
          label: t('preimage hash'),
          onChange: _onChangeHash,
          value: hash
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The associated deposit for this proposal should be more then the minimum on-chain deposit required. It will be locked until the proposal passes.'),
        children: [/*#__PURE__*/_jsx(InputBalance, {
          defaultValue: api.consts.democracy.minimumDeposit,
          help: t('The locked value for this proposal'),
          isError: !hasMinLocked,
          label: t('locked balance'),
          onChange: setBalance
        }), /*#__PURE__*/_jsx(InputBalance, {
          defaultValue: api.consts.democracy.minimumDeposit,
          help: t('The minimum deposit required'),
          isDisabled: true,
          label: t('minimum deposit')
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
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

export default /*#__PURE__*/React.memo(Propose);