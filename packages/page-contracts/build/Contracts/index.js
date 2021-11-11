// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import Codes from "../Codes/index.js";
import CodeAdd from "../Codes/Add.js";
import CodeUpload from "../Codes/Upload.js";
import { useTranslation } from "../translate.js";
import { useCodes } from "../useCodes.js";
import { useContracts } from "../useContracts.js";
import ContractAdd from "./Add.js";
import ContractsTable from "./ContractsTable.js";
import Deploy from "./Deploy.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Contracts({
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const {
    allCodes,
    codeTrigger
  } = useCodes();
  const {
    allContracts
  } = useContracts();
  const [isAddOpen, toggleAdd] = useToggle();
  const [isDeployOpen, toggleDeploy, setIsDeployOpen] = useToggle();
  const [isHashOpen, toggleHash] = useToggle();
  const [isUploadOpen, toggleUpload] = useToggle();
  const [codeHash, setCodeHash] = useState();
  const [constructorIndex, setConstructorIndex] = useState(0);

  const _onShowDeploy = useCallback((codeHash, constructorIndex) => {
    setCodeHash(codeHash || (allCodes && allCodes[0] ? allCodes[0].json.codeHash : undefined));
    setConstructorIndex(constructorIndex);
    toggleDeploy();
  }, [allCodes, toggleDeploy]);

  const _onCloseDeploy = useCallback(() => setIsDeployOpen(false), [setIsDeployOpen]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      trigger: codeTrigger
    }), /*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(Button, {
        icon: "plus",
        label: t('Upload & deploy code'),
        onClick: toggleUpload
      }), /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        label: t('Add an existing code hash'),
        onClick: toggleHash
      }), /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        label: t('Add an existing contract'),
        onClick: toggleAdd
      })]
    }), /*#__PURE__*/_jsx(ContractsTable, {
      contracts: allContracts,
      updated: codeTrigger
    }), /*#__PURE__*/_jsx(Codes, {
      onShowDeploy: _onShowDeploy,
      updated: codeTrigger
    }), codeHash && isDeployOpen && /*#__PURE__*/_jsx(Deploy, {
      codeHash: codeHash,
      constructorIndex: constructorIndex,
      onClose: _onCloseDeploy,
      setConstructorIndex: setConstructorIndex
    }), isUploadOpen && /*#__PURE__*/_jsx(CodeUpload, {
      onClose: toggleUpload
    }), isHashOpen && /*#__PURE__*/_jsx(CodeAdd, {
      onClose: toggleHash
    }), isAddOpen && /*#__PURE__*/_jsx(ContractAdd, {
      onClose: toggleAdd
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Contracts).withConfig({
  displayName: "Contracts",
  componentId: "sc-1npzjau-0"
})([".ui--Table td > article{background:transparent;border:none;margin:0;padding:0;}"]));