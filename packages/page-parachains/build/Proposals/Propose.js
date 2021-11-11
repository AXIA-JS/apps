// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useState } from 'react';
import { Button, Input, InputAddress, InputBalance, InputFile, InputNumber, InputWasm, MarkWarning, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BN_TEN, BN_THOUSAND, BN_ZERO, compactAddLength } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Validator({
  address,
  index,
  setAddress,
  t
}) {
  const _setAddress = useCallback(value => value && setAddress(index, value), [index, setAddress]);

  return /*#__PURE__*/_jsx(InputAddress, {
    defaultValue: address,
    label: t('validator {{index}}', {
      replace: {
        index: index + 1
      }
    }),
    onChange: _setAddress
  });
}

function Propose({
  className,
  onClose
}) {
  var _api$tx$proposeParach;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [accountId, setAccountId] = useState(null);
  const [name, setName] = useState('');
  const [paraId, setParaId] = useState();
  const [balance, setBalance] = useState(() => BN_THOUSAND.mul(BN_TEN.pow(new BN(api.registry.chainDecimals[0]))));
  const [validators, setValidators] = useState(['']);
  const [{
    isWasmValid,
    wasm
  }, setWasm] = useState({
    isWasmValid: false,
    wasm: null
  });
  const [genesisState, setGenesisState] = useState(null);

  const _setGenesisState = useCallback(data => setGenesisState(compactAddLength(data)), []);

  const _setWasm = useCallback((wasm, isWasmValid) => setWasm({
    isWasmValid,
    wasm
  }), []);

  const _setAddress = useCallback((index, address) => setValidators(v => v.map((v, i) => i === index ? address : v)), []);

  const _addValidator = useCallback(() => setValidators(v => [...v, '']), []);

  const _delValidator = useCallback(() => setValidators(v => [...v.slice(0, v.length - 1)]), []);

  const isNameValid = name.length >= 3;
  const isValDuplicate = validators.some((a, ai) => validators.some((b, bi) => ai !== bi && a === b));
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Propose parachain'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('This account will be associated with the parachain and pay the deposit.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          label: t('propose from'),
          onChange: setAccountId,
          type: "account",
          value: accountId
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The name for this parachain, the id and the allocated/requested balance.'),
        children: [/*#__PURE__*/_jsx(Input, {
          autoFocus: true,
          isError: !isNameValid,
          label: t('parachain name'),
          onChange: setName
        }), /*#__PURE__*/_jsx(InputNumber, {
          isZeroable: false,
          label: t('requested id'),
          onChange: setParaId
        }), /*#__PURE__*/_jsx(InputBalance, {
          defaultValue: balance,
          label: t('initial balance'),
          onChange: setBalance
        })]
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The WASM validation function as well as the genesis state for this parachain.'),
        children: [/*#__PURE__*/_jsx(InputWasm, {
          help: t('The compiled runtime WASM for the parachain you wish to register.'),
          isError: !isWasmValid,
          label: t('validation code'),
          onChange: _setWasm,
          placeholder: wasm && !isWasmValid && t('The code is not recognized as being in valid WASM format')
        }), /*#__PURE__*/_jsx(InputFile, {
          help: t('The genesis state for the parachain.'),
          isError: !genesisState,
          label: t('genesis state'),
          onChange: _setGenesisState
        })]
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The validators for this parachain. At least one is required and where multiple is supplied, they need to be unique.'),
        children: [validators.map((address, index) => /*#__PURE__*/_jsx(Validator, {
          address: address,
          index: index,
          setAddress: _setAddress,
          t: t
        }, index)), !validators.length && /*#__PURE__*/_jsx(MarkWarning, {
          content: t('You need to supply at last one running validator for your parachain alongside this request.')
        }), isValDuplicate && /*#__PURE__*/_jsx(MarkWarning, {
          content: t('You have duplicated validator entries, ensure each is unique.')
        }), /*#__PURE__*/_jsxs(Button.Group, {
          children: [/*#__PURE__*/_jsx(Button, {
            icon: "plus",
            label: t('Add validator'),
            onClick: _addValidator
          }), /*#__PURE__*/_jsx(Button, {
            icon: "minus",
            isDisabled: validators.length === 0,
            label: t('Remove validator'),
            onClick: _delValidator
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        icon: "plus",
        isDisabled: !isWasmValid || !genesisState || !isNameValid || !validators.length || !(paraId !== null && paraId !== void 0 && paraId.gt(BN_ZERO)),
        onStart: onClose,
        params: [paraId, name, wasm, genesisState, validators, balance],
        tx: (_api$tx$proposeParach = api.tx.proposeParachain) === null || _api$tx$proposeParach === void 0 ? void 0 : _api$tx$proposeParach.proposeParachain
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Propose);