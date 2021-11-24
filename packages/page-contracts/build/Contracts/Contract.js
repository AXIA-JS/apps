// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AddressInfo, AddressMini, Button, Forget } from '@axia-js/react-components';
import { useApi, useCall, useToggle } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { isUndefined } from '@axia-js/util';
import Messages from "../shared/Messages.js";
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function transformInfo(optInfo) {
  return optInfo.unwrapOr(null);
}

function Contract({
  className,
  contract,
  index,
  links,
  onCall
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const info = useCall(api.query.contracts.contractInfoOf, [contract.address], {
    transform: transformInfo
  });
  const [isForgetOpen, toggleIsForgetOpen] = useToggle();

  const _onCall = useCallback((messageIndex, resultCb) => onCall(index, messageIndex, resultCb), [index, onCall]);

  const _onForget = useCallback(() => {
    const status = {
      account: contract.address,
      action: 'forget'
    };

    try {
      keyring.forgetContract(contract.address.toString());
      status.status = 'success';
      status.message = t('address forgotten');
    } catch (error) {
      status.status = 'error';
      status.message = error.message;
    }

    toggleIsForgetOpen();
  }, [contract.address, t, toggleIsForgetOpen]);

  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsxs("td", {
      className: "address top",
      children: [isForgetOpen && /*#__PURE__*/_jsx(Forget, {
        address: contract.address.toString(),
        mode: "contract",
        onClose: toggleIsForgetOpen,
        onForget: _onForget
      }, 'modal-forget-contract'), /*#__PURE__*/_jsx(AddressMini, {
        value: contract.address
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "all top",
      children: /*#__PURE__*/_jsx(Messages, {
        contract: contract,
        contractAbi: contract.abi,
        isWatching: true,
        onSelect: _onCall,
        withMessages: true
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "top",
      children: links === null || links === void 0 ? void 0 : links.map(({
        blockHash,
        blockNumber
      }, index) => /*#__PURE__*/_jsxs("a", {
        href: `#/explorer/query/${blockHash}`,
        children: ["#", blockNumber]
      }, `${index}-${blockNumber}`))
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx(AddressInfo, {
        address: contract.address,
        withBalance: true,
        withBalanceToggle: true,
        withExtended: false
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "start together",
      children: !isUndefined(info) && (info ? info.type : t('Not on-chain'))
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: /*#__PURE__*/_jsx(Button, {
        icon: "trash",
        onClick: toggleIsForgetOpen
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Contract).withConfig({
  displayName: "Contract",
  componentId: "sc-1wzv694-0"
})(["td.top a+a{margin-left:0.75rem;}"]));