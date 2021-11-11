// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BlueprintPromise } from '@axia-js/api-contract';
import { Dropdown, Input, InputAddress, InputBalance, Modal, Toggle, TxButton } from '@axia-js/react-components';
import { useApi, useFormField, useNonEmptyString, useNonZeroBn } from '@axia-js/react-hooks';
import { Available } from '@axia-js/react-query';
import { keyring } from '@axia-js/ui-keyring';
import { isHex, stringify } from '@axia-js/util';
import { randomAsHex } from '@axia-js/util-crypto';
import { ENDOWMENT } from "../constants.js";
import { ABI, InputMegaGas, InputName, MessageSignature, Params } from "../shared/index.js";
import store from "../store.js";
import { useTranslation } from "../translate.js";
import useAbi from "../useAbi.js";
import useWeight from "../useWeight.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Deploy({
  codeHash,
  constructorIndex = 0,
  onClose,
  setConstructorIndex
}) {
  var _contractAbi$construc2;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const weight = useWeight();
  const [initTx, setInitTx] = useState(null);
  const [params, setParams] = useState([]);
  const [accountId, isAccountIdValid, setAccountId] = useFormField(null);
  const [endowment, isEndowmentValid, setEndowment] = useNonZeroBn(ENDOWMENT);
  const [salt, setSalt] = useState(() => randomAsHex());
  const [withSalt, setWithSalt] = useState(false);
  useEffect(() => {
    setParams([]);
  }, [constructorIndex]);
  const code = useMemo(() => store.getCode(codeHash), [codeHash]);
  const [name, isNameValid, setName] = useNonEmptyString(code && code.json.name);
  const {
    contractAbi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi
  } = useAbi([code && code.json.abi, code && code.contractAbi], codeHash, true);
  const blueprint = useMemo(() => isAbiValid && codeHash && contractAbi ? new BlueprintPromise(api, contractAbi, codeHash) : null, [api, codeHash, contractAbi, isAbiValid]);
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
    endowment && setInitTx(() => {
      var _contractAbi$construc;

      if (blueprint && contractAbi !== null && contractAbi !== void 0 && (_contractAbi$construc = contractAbi.constructors[constructorIndex]) !== null && _contractAbi$construc !== void 0 && _contractAbi$construc.method) {
        try {
          return blueprint.tx[contractAbi.constructors[constructorIndex].method]({
            gasLimit: weight.weight,
            salt: withSalt ? salt : null,
            value: endowment
          }, ...params);
        } catch (error) {
          return null;
        }
      }

      return null;
    });
  }, [blueprint, contractAbi, constructorIndex, endowment, params, salt, weight, withSalt]);

  const _onSuccess = useCallback(result => {
    if (result.contract) {
      keyring.saveContract(result.contract.address.toString(), {
        contract: {
          abi: stringify(result.contract.abi.json),
          genesisHash: api.genesisHash.toHex()
        },
        name,
        tags: []
      });
      onClose && onClose();
    }
  }, [api, name, onClose]);

  const isSaltValid = !withSalt || salt && (!salt.startsWith('0x') || isHex(salt));
  const isValid = isNameValid && isEndowmentValid && weight.isValid && isAccountIdValid && isSaltValid;
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Deploy a contract'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
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
      }), /*#__PURE__*/_jsx(InputName, {
        isContract: true,
        isError: !isNameValid,
        onChange: setName,
        value: name || ''
      }), !isAbiSupplied && /*#__PURE__*/_jsx(ABI, {
        contractAbi: contractAbi,
        errorText: errorText,
        isError: isAbiError,
        isSupplied: isAbiSupplied,
        isValid: isAbiValid,
        onChange: onChangeAbi,
        onRemove: onRemoveAbi
      }), contractAbi && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Dropdown, {
          help: t('The deployment constructor information for this contract, as provided by the ABI.'),
          isDisabled: contractAbi.constructors.length <= 1,
          label: t('deployment constructor'),
          onChange: setConstructorIndex,
          options: constructOptions,
          value: constructorIndex
        }), /*#__PURE__*/_jsx(Params, {
          onChange: setParams,
          params: (_contractAbi$construc2 = contractAbi.constructors[constructorIndex]) === null || _contractAbi$construc2 === void 0 ? void 0 : _contractAbi$construc2.args,
          registry: contractAbi.registry
        })]
      }), /*#__PURE__*/_jsx(InputBalance, {
        help: t('The allotted endowment for this contract, i.e. the amount transferred to the contract upon instantiation.'),
        isError: !isEndowmentValid,
        label: t('endowment'),
        onChange: setEndowment,
        value: endowment
      }), /*#__PURE__*/_jsx(Input, {
        help: t('A hex or string value that acts as a salt for this deployment.'),
        isDisabled: !withSalt,
        label: t('unique deployment salt'),
        onChange: setSalt,
        placeholder: t('0x prefixed hex, e.g. 0x1234 or ascii data'),
        value: withSalt ? salt : t('<none>'),
        children: /*#__PURE__*/_jsx(Toggle, {
          isOverlay: true,
          label: t('use deployment salt'),
          onChange: setWithSalt,
          value: withSalt
        })
      }), /*#__PURE__*/_jsx(InputMegaGas, {
        help: t('The maximum amount of gas that can be used by this deployment, if the code requires more, the deployment will fail.'),
        weight: weight
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        extrinsic: initTx,
        icon: "upload",
        isDisabled: !isValid || !initTx,
        label: t('Deploy'),
        onClick: onClose,
        onSuccess: _onSuccess,
        withSpinner: true
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Deploy);