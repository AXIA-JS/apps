// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button, Output } from '@axia-js/react-components';
import valueToText from '@axia-js/react-params/valueToText';
import { useTranslation } from "../translate.js";
import MessageSignature from "./MessageSignature.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function filterDocs(docs) {
  let skip = false;
  return docs.map(line => line.trim()).filter(line => line).filter((line, index) => {
    if (skip) {
      return false;
    } else if (index || line.startsWith('#')) {
      skip = true;
      return false;
    }

    return true;
  });
}

function Message({
  className = '',
  index,
  lastResult,
  message,
  onSelect
}) {
  const {
    t
  } = useTranslation();

  const _onSelect = useCallback(() => onSelect && onSelect(index), [index, onSelect]);

  return /*#__PURE__*/_jsxs("div", {
    className: `${className} ${!onSelect ? 'exempt-hover' : ''} ${message.isConstructor ? 'constructor' : ''}`,
    children: [onSelect && (message.isConstructor ? /*#__PURE__*/_jsx(Button, {
      className: "accessory",
      icon: "upload",
      label: t('deploy'),
      onClick: _onSelect
    }) : /*#__PURE__*/_jsx(Button, {
      className: "accessory",
      icon: "play",
      isDisabled: message.isMutating ? false : !message.args.length && (lastResult === null || lastResult === void 0 ? void 0 : lastResult.result.isOk),
      label: message.isMutating ? t('exec') : t('read'),
      onClick: _onSelect
    })), /*#__PURE__*/_jsxs("div", {
      className: "info",
      children: [/*#__PURE__*/_jsx(MessageSignature, {
        asConstructor: message.isConstructor,
        message: message,
        withTooltip: true
      }), /*#__PURE__*/_jsx("div", {
        className: "docs",
        children: message.docs.length ? filterDocs(message.docs).map((line, index) => /*#__PURE__*/_jsx("div", {
          children: line
        }, `${message.identifier}-docs-${index}`)) : /*#__PURE__*/_jsxs("i", {
          children: ["\xA0", t('No documentation provided'), "\xA0"]
        })
      })]
    }), lastResult && lastResult.result.isOk && lastResult.output && /*#__PURE__*/_jsx(Output, {
      className: "result",
      isFull: true,
      label: t('current value'),
      children: valueToText('Text', lastResult.output)
    })]
  }, `${message.identifier}-${index}`);
}

export default /*#__PURE__*/React.memo(styled(Message).withConfig({
  displayName: "Message",
  componentId: "sc-wzn4m-0"
})(["align-items:center;border-radius:0.25rem;display:flex;padding:0.25rem 0.75rem 0.25rem 0;&.disabled{opacity:1 !important;background:#eee !important;color:#555 !important;}.info{flex:1 1;margin-left:1.5rem;.docs{font-size:0.9rem;font-weight:var(--font-weight-normal);}}.result{min-width:15rem;}&+&{margin-top:0.5rem;}"]));