// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CodePromise } from '@axia-js/api-contract';
import { Button, Dropdown, InputAddress, InputBalance, InputFile, MarkError, Modal, TxButton } from '@axia-js/react-components';
import { useAccountId, useApi, useNonEmptyString, useNonZeroBn, useStepper } from '@axia-js/react-hooks';
import { Available } from '@axia-js/react-query';
import { keyring } from '@axia-js/ui-keyring';
import { isNull, isWasm, stringify } from '@axia-js/util';
import { ENDOWMENT } from "../constants.js";
import { ABI, InputMegaGas, InputName, MessageSignature, Params } from "../shared/index.js";
import store from "../store.js";
import { useTranslation } from "../translate.js";
import useAbi from "../useAbi.js";
import useWeight from "../useWeight.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Upload({
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [accountId, setAccountId] = useAccountId();
  const [step, nextStep, prevStep] = useStepper();
  const [[uploadTx, error], setUploadTx] = useState([null, null]);
  const [constructorIndex, setConstructorIndex] = useState(0);
  const [endowment, isEndowmentValid, setEndowment] = useNonZeroBn(ENDOWMENT);
  const [params, setParams] = useState([]);
  const [[wasm, isWasmValid], setWasm] = useState([null, false]);
  const [name, isNameValid, setName] = useNonEmptyString();
  const {
    abiName,
    contractAbi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi
  } = useAbi();
  const weight = useWeight();
  const code = useMemo(() => isAbiValid && isWasmValid && wasm && contractAbi ? new CodePromise(api, contractAbi, wasm) : null, [api, contractAbi, isAbiValid, isWasmValid, wasm]);
  const constructOptions = useMemo(() => contractAbi ? contractAbi.constructors.map((c, index) => ({
    info: c.identifier,
    key: c.identifier,
    text: /*#__PURE__*/_jsx(MessageSignature, {
      asConstructor: true,
      message: c
    }),
    value: index
  })) : [], [contractAbi]);
  useEffect(() => {
    setConstructorIndex(0);
  }, [constructOptions]);
  useEffect(() => {
    setParams([]);
  }, [contractAbi, constructorIndex]);
  useEffect(() => {
    setWasm(contractAbi && isWasm(contractAbi.project.source.wasm) ? [contractAbi.project.source.wasm, true] : [null, false]);
  }, [contractAbi]);
  useEffect(() => {
    abiName && setName(abiName);
  }, [abiName, setName]);
  useEffect(() => {
    let contract = null;
    let error = null;

    try {
      var _contractAbi$construc;

      contract = code && contractAbi !== null && contractAbi !== void 0 && (_contractAbi$construc = contractAbi.constructors[constructorIndex]) !== null && _contractAbi$construc !== void 0 && _contractAbi$construc.method && endowment ? code.tx[contractAbi.constructors[constructorIndex].method]({
        gasLimit: weight.weight,
        value: endowment
      }, ...params) : null;
    } catch (e) {
      error = e.message;
    }

    setUploadTx(() => [contract, error]);
  }, [code, contractAbi, constructorIndex, endowment, params, weight]);

  const _onAddWasm = useCallback((wasm, name) => {
    setWasm([wasm, isWasm(wasm)]);
    setName(name.replace('.wasm', '').replace('_', ' '));
  }, [setName]);

  const _onSuccess = useCallback(result => {
    result.blueprint && store.saveCode(result.blueprint.codeHash, {
      abi: stringify(result.blueprint.abi.json),
      name: name || '<>',
      tags: []
    });
    result.contract && keyring.saveContract(result.contract.address.toString(), {
      contract: {
        abi: stringify(result.contract.abi.json),
        genesisHash: api.genesisHash.toHex()
      },
      name: name || '<>',
      tags: []
    });
  }, [api, name]);

  const isSubmittable = !!accountId && !isNull(name) && isNameValid && isWasmValid && isAbiSupplied && isAbiValid && !!uploadTx && step === 2;
  const invalidAbi = isAbiError || !isAbiSupplied;
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Upload & deploy code {{info}}', {
      replace: {
        info: `${step}/2`
      }
    }),
    onClose: onClose,
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [step === 1 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(InputAddress, {
          help: t('Specify the user account to use for this deployment. Any fees will be deducted from this account.'),
          isInput: false,
          label: t('deployment account'),
          labelExtra: /*#__PURE__*/_jsx(Available, {
            label: t('transferrable'),
            params: accountId
          }),
          onChange: setAccountId,
          type: "account",
          value: accountId
        }), /*#__PURE__*/_jsx(ABI, {
          contractAbi: contractAbi,
          errorText: errorText,
          isError: invalidAbi,
          isSupplied: isAbiSupplied,
          isValid: isAbiValid,
          label: t('json for either ABI or .contract bundle'),
          onChange: onChangeAbi,
          onRemove: onRemoveAbi,
          withWasm: true
        }), !invalidAbi && contractAbi && /*#__PURE__*/_jsxs(_Fragment, {
          children: [!contractAbi.project.source.wasm.length && /*#__PURE__*/_jsx(InputFile, {
            help: t('The compiled WASM for the contract that you wish to deploy. Each unique code blob will be attached with a code hash that can be used to create new instances.'),
            isError: !isWasmValid,
            label: t('compiled contract WASM'),
            onChange: _onAddWasm,
            placeholder: wasm && !isWasmValid && t('The code is not recognized as being in valid WASM format')
          }), /*#__PURE__*/_jsx(InputName, {
            isError: !isNameValid,
            onChange: setName,
            value: name || undefined
          })]
        })]
      }), step === 2 && contractAbi && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Dropdown, {
          help: t('The deployment constructor information for this contract, as provided by the ABI.'),
          isDisabled: contractAbi.constructors.length <= 1,
          label: t('deployment constructor'),
          onChange: setConstructorIndex,
          options: constructOptions,
          value: constructorIndex
        }), /*#__PURE__*/_jsx(Params, {
          onChange: setParams,
          params: contractAbi.constructors[constructorIndex].args,
          registry: contractAbi.registry
        }), /*#__PURE__*/_jsx(InputBalance, {
          help: t('The allotted endowment for the deployed contract, i.e. the amount transferred to the contract upon instantiation.'),
          isError: !isEndowmentValid,
          label: t('endowment'),
          onChange: setEndowment,
          value: endowment
        }), /*#__PURE__*/_jsx(InputMegaGas, {
          help: t('The maximum amount of gas that can be used by this deployment, if the code requires more, the deployment will fail.'),
          weight: weight
        }), error && /*#__PURE__*/_jsx(MarkError, {
          content: error
        })]
      })]
    }), /*#__PURE__*/_jsxs(Modal.Actions, {
      children: [step === 1 ? /*#__PURE__*/_jsx(Button, {
        icon: "step-forward",
        isDisabled: !code || !contractAbi,
        label: t('Next'),
        onClick: nextStep
      }) : /*#__PURE__*/_jsx(Button, {
        icon: "step-backward",
        label: t('Prev'),
        onClick: prevStep
      }), /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        extrinsic: uploadTx,
        icon: "upload",
        isDisabled: !isSubmittable,
        label: t('Deploy'),
        onClick: onClose,
        onSuccess: _onSuccess
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Upload);