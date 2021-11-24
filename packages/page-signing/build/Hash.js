// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Input, Output, Static } from '@axia-js/react-components';
import { hexToU8a, isHex, stringToU8a } from '@axia-js/util';
import { blake2AsHex } from '@axia-js/util-crypto';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Hash() {
  const {
    t
  } = useTranslation();
  const [{
    data,
    hash,
    isHexData
  }, setState] = useState({
    data: '',
    hash: blake2AsHex(stringToU8a(''), 256),
    isHexData: false
  });

  const _onChangeData = useCallback(data => {
    const isHexData = isHex(data);
    setState({
      data,
      hash: blake2AsHex(isHexData ? hexToU8a(data) : stringToU8a(data), 256),
      isHexData
    });
  }, []);

  return /*#__PURE__*/_jsxs("div", {
    className: "toolbox--Hash",
    children: [/*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Input, {
        autoFocus: true,
        className: "full",
        help: t('The input data to hash. This can be either specified as a hex value (0x-prefix) or as a string.'),
        label: t('from the following data'),
        onChange: _onChangeData,
        value: data
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Static, {
        className: "medium",
        help: t('Detection on the input string to determine if it is hex or non-hex.'),
        label: t('hex input data'),
        value: isHexData ? t('Yes') : t('No')
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Output, {
        className: "full",
        help: t('The blake2b 256-bit hash of the actual input data.'),
        isHidden: hash.length === 0,
        isMonospace: true,
        label: t('the resulting hash is'),
        value: hash,
        withCopy: true
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Hash);