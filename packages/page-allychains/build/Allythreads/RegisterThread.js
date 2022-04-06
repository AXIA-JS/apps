// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useMemo, useState } from 'react';
import { InputAddress, InputBalance, InputFile, InputNumber, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { compactAddLength } from '@axia-js/util';
import InputOwner from "../InputOwner.js";
import { useTranslation } from "../translate.js";
import { LOWEST_INVALID_ID } from "./constants.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function RegisterThread({
  className,
  nextAllyId,
  onClose,
  ownedIds
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [accountId, setAccountId] = useState(null);
  const [allyId, setAllyId] = useState();
  const [wasm, setWasm] = useState(null);
  const [genesisState, setGenesisState] = useState(null);

  const _setGenesisState = useCallback(data => setGenesisState(compactAddLength(data)), []);

  const _setWasm = useCallback(data => setWasm(compactAddLength(data)), []);

  const _setOwner = useCallback(({
    accountId,
    allyId
  }) => {
    setAccountId(accountId);
    setAllyId(new BN(allyId));
  }, []);

  const reservedDeposit = useMemo(() => api.consts.registrar.paraDeposit.add(api.consts.registrar.dataDepositPerByte.muln(wasm ? wasm.length : 0)).iadd(api.consts.registrar.dataDepositPerByte.muln(genesisState ? genesisState.length : 0)), [api, wasm, genesisState]);
  const isIdError = !allyId || !allyId.gt(LOWEST_INVALID_ID);
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Register allythread'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [api.tx.registrar.reserve ? /*#__PURE__*/_jsx(InputOwner, {
        noCodeCheck: true,
        onChange: _setOwner,
        ownedIds: ownedIds
      }) : /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('This account will be associated with the allychain and pay the deposit.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            label: t('register from'),
            onChange: setAccountId,
            type: "account",
            value: accountId
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The id of this allychain as known on the network'),
          children: /*#__PURE__*/_jsx(InputNumber, {
            autoFocus: true,
            defaultValue: nextAllyId,
            isError: isIdError,
            isZeroable: false,
            label: t('allychain id'),
            onChange: setAllyId
          })
        })]
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The WASM validation function for this allychain.'),
        children: /*#__PURE__*/_jsx(InputFile, {
          help: t('The compiled runtime WASM for the allychain you wish to register.'),
          isError: !wasm,
          label: t('code'),
          onChange: _setWasm
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The genesis state for this allychain.'),
        children: /*#__PURE__*/_jsx(InputFile, {
          help: t('The genesis state for the allychain.'),
          isError: !genesisState,
          label: t('initial state'),
          onChange: _setGenesisState
        })
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The reservation fee for this allychain, including base fee and per-byte fees'),
        children: /*#__PURE__*/_jsx(InputBalance, {
          defaultValue: reservedDeposit,
          isDisabled: true,
          label: t('reserved deposit')
        })
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        icon: "plus",
        isDisabled: !wasm || !genesisState || isIdError,
        onStart: onClose,
        params: [allyId, genesisState, wasm],
        tx: api.tx.registrar.register
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(RegisterThread);