// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Expander } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Message from "./Message.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const READ_ADDR = '0x'.padEnd(66, '0');

function sortMessages(messages) {
  return messages.map((m, index) => [m, index]).sort((a, b) => a[0].identifier.localeCompare(b[0].identifier)).sort((a, b) => a[0].isMutating === b[0].isMutating ? 0 : a[0].isMutating ? -1 : 1);
}

function Messages({
  className = '',
  contract,
  contractAbi: {
    constructors,
    messages,
    project: {
      source
    }
  },
  isLabelled,
  isWatching,
  onSelect,
  onSelectConstructor,
  withConstructors,
  withMessages,
  withWasm
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const optInfo = useCall(contract && api.query.contracts.contractInfoOf, [contract === null || contract === void 0 ? void 0 : contract.address]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastResults, setLastResults] = useState([]);

  const _onExpander = useCallback(isOpen => {
    isWatching && setIsUpdating(isOpen);
  }, [isWatching]);

  useEffect(() => {
    isUpdating && optInfo && contract && Promise.all(messages.map(m => m.isMutating || m.args.length !== 0 ? Promise.resolve(undefined) : contract.query[m.method](READ_ADDR, 0, -1).catch(() => undefined))).then(setLastResults).catch(console.error);
  }, [contract, isUpdating, isWatching, messages, optInfo]);

  const _setMessageResult = useCallback( // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (messageIndex, result) => {// ignore... for now
    // setLastResults((all) => all.map((r, index) => index === messageIndex ? result : r));
  }, []);

  const _onSelect = useCallback(index => onSelect && onSelect(index, _setMessageResult), [_setMessageResult, onSelect]);

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Messages ${className}${isLabelled ? ' isLabelled' : ''}`,
    children: [withConstructors && /*#__PURE__*/_jsx(Expander, {
      summary: t('Constructors ({{count}})', {
        replace: {
          count: constructors.length
        }
      }),
      children: sortMessages(constructors).map(([message, index]) => /*#__PURE__*/_jsx(Message, {
        index: index,
        message: message,
        onSelect: onSelectConstructor
      }, index))
    }), withMessages && /*#__PURE__*/_jsx(Expander, {
      onClick: _onExpander,
      summary: t('Messages ({{count}})', {
        replace: {
          count: messages.length
        }
      }),
      children: sortMessages(messages).map(([message, index]) => /*#__PURE__*/_jsx(Message, {
        index: index,
        lastResult: lastResults[index],
        message: message,
        onSelect: _onSelect
      }, index))
    }), withWasm && source.wasm.length !== 0 && /*#__PURE__*/_jsx("div", {
      children: t('{{size}} WASM bytes', {
        replace: {
          size: formatNumber(source.wasm.length)
        }
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Messages).withConfig({
  displayName: "Messages",
  componentId: "sc-q7tyak-0"
})(["padding-bottom:0.75rem !important;&.isLabelled{background:var(--bg-input);box-sizing:border-box;border:1px solid var(--border-input);border-radius:.28571429rem;padding:1rem 1rem 0.5rem;width:100%;}"]));