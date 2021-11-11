import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { createRef, useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { formatNumber, hexToU8a, isHex, u8aToString } from '@axia-js/util';
import Labelled from "./Labelled.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const BYTE_STR_0 = '0'.charCodeAt(0);
const BYTE_STR_X = 'x'.charCodeAt(0);
const STR_NL = '\n';

const NOOP = () => undefined;

function convertResult(result) {
  const data = new Uint8Array(result); // this converts the input (if detected as hex), via the hex conversion route

  if (data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
    let hex = u8aToString(data);

    while (hex[hex.length - 1] === STR_NL) {
      hex = hex.substr(0, hex.length - 1);
    }

    if (isHex(hex)) {
      return hexToU8a(hex);
    }
  }

  return data;
}

function InputFile({
  accept,
  className = '',
  clearContent,
  help,
  isDisabled,
  isError = false,
  isFull,
  label,
  onChange,
  placeholder,
  withEllipsis,
  withLabel
}) {
  const {
    t
  } = useTranslation();
  const dropRef = /*#__PURE__*/createRef();
  const [file, setFile] = useState();

  const _onDrop = useCallback(files => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onabort = NOOP;
      reader.onerror = NOOP;

      reader.onload = ({
        target
      }) => {
        if (target && target.result) {
          const name = file.name;
          const data = convertResult(target.result);
          onChange && onChange(data, name);
          dropRef && setFile({
            name,
            size: data.length
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, [dropRef, onChange]);

  const dropZone = /*#__PURE__*/_jsx(Dropzone, {
    accept: accept,
    disabled: isDisabled,
    multiple: false,
    onDrop: _onDrop,
    ref: dropRef,
    children: ({
      getInputProps,
      getRootProps
    }) => /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({}, getRootProps({
      className: `ui--InputFile${isError ? ' error' : ''} ${className}`
    })), {}, {
      children: [/*#__PURE__*/_jsx("input", _objectSpread({}, getInputProps())), /*#__PURE__*/_jsx("em", {
        className: "label",
        children: !file || clearContent ? placeholder || t('click to select or drag and drop the file here') : placeholder || t('{{name}} ({{size}} bytes)', {
          replace: {
            name: file.name,
            size: formatNumber(file.size)
          }
        })
      })]
    }))
  });

  return label ? /*#__PURE__*/_jsx(Labelled, {
    help: help,
    isFull: isFull,
    label: label,
    withEllipsis: withEllipsis,
    withLabel: withLabel,
    children: dropZone
  }) : dropZone;
}

export default /*#__PURE__*/React.memo(styled(InputFile).withConfig({
  displayName: "InputFile",
  componentId: "sc-4o4bah-0"
})(["background:var(--bg-input);border:1px solid var(--border-input);border-radius:0.28571429rem;font-size:1rem;margin:0.25rem 0;padding:0.67857143em 1em;width:100% !important;&.error{background:var(--bg-input-error);border-color:#e0b4b4;}&:hover{cursor:pointer;}"]));