// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button, Card, CopyButton, Forget } from '@axia-js/react-components';
import { useApi, useCall, useToggle } from '@axia-js/react-hooks';
import { CodeRow, Messages } from "../shared/index.js";
import store from "../store.js";
import { useTranslation } from "../translate.js";
import useAbi from "../useAbi.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Code({
  className,
  code,
  onShowDeploy
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const optCode = useCall(api.query.contracts.codeStorage, [code.json.codeHash]);
  const [isForgetOpen, toggleIsForgetOpen] = useToggle();
  const {
    contractAbi
  } = useAbi([code.json.abi, code.contractAbi], code.json.codeHash, true);

  const _onShowDeploy = useCallback(() => onShowDeploy(code.json.codeHash, 0), [code, onShowDeploy]);

  const _onDeployConstructor = useCallback((constructorIndex = 0) => {
    onShowDeploy && onShowDeploy(code.json.codeHash, constructorIndex);
  }, [code, onShowDeploy]);

  const _onForget = useCallback(() => {
    try {
      store.forgetCode(code.json.codeHash);
    } catch (error) {
      console.error(error);
    } finally {
      toggleIsForgetOpen();
    }
  }, [code, toggleIsForgetOpen]);

  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "address top",
      children: /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CodeRow, {
          code: code,
          withTags: false
        }), isForgetOpen && /*#__PURE__*/_jsx(Forget, {
          mode: "code",
          onClose: toggleIsForgetOpen,
          onForget: _onForget,
          children: /*#__PURE__*/_jsxs(CodeRow, {
            code: code || '',
            isInline: true,
            children: [/*#__PURE__*/_jsx("p", {
              children: t('You are about to remove this code from your list of available code hashes. Once completed, should you need to access it again, you will have to manually add the code hash again.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('This operation does not remove the uploaded code WASM and ABI from the chain, nor any deployed contracts. The forget operation only limits your access to the code on this browser.')
            })]
          })
        }, 'modal-forget-account')]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "all top",
      children: /*#__PURE__*/_jsx(Messages, {
        contractAbi: contractAbi,
        onSelectConstructor: _onDeployConstructor,
        withConstructors: true
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "together codeHash",
      children: [/*#__PURE__*/_jsx("div", {
        children: `${code.json.codeHash.substr(0, 8)}…${code.json.codeHash.slice(-6)}`
      }), /*#__PURE__*/_jsx(CopyButton, {
        value: code.json.codeHash
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "start together",
      children: optCode && (optCode.isSome ? t('Available') : t('Not on-chain'))
    }), /*#__PURE__*/_jsxs("td", {
      className: "button",
      children: [/*#__PURE__*/_jsx(Button, {
        icon: "trash",
        onClick: toggleIsForgetOpen
      }), !contractAbi && /*#__PURE__*/_jsx(Button, {
        icon: "upload",
        label: t('deploy'),
        onClick: _onShowDeploy
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Code).withConfig({
  displayName: "Code",
  componentId: "sc-chhpug-0"
})([".codeHash{div{display:inline;&:first-child{font-family:monospace;margin-right:0.5rem;}}}"]));