// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Button, Input } from '@axia-js/react-components';
import { compactAddLength, u8aToU8a } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Raw({
  onAdd
}) {
  const {
    t
  } = useTranslation();
  const [{
    isValid,
    key
  }, setValue] = useState({
    isValid: false,
    key: new Uint8Array([])
  });

  const _onAdd = useCallback(() => {
    isValid && onAdd({
      isConst: false,
      key
    });
  }, [isValid, key, onAdd]);

  const _onChangeKey = useCallback(key => {
    const u8a = u8aToU8a(key);
    setValue({
      isValid: u8a.length !== 0,
      key: compactAddLength(u8a)
    });
  }, []);

  return /*#__PURE__*/_jsxs("section", {
    className: "storage--actionrow",
    children: [/*#__PURE__*/_jsx("div", {
      className: "storage--actionrow-value",
      children: /*#__PURE__*/_jsx(Input, {
        autoFocus: true,
        label: t('hex-encoded storage key'),
        onChange: _onChangeKey,
        onEnter: _onAdd
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "storage--actionrow-buttons",
      children: /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        isDisabled: !isValid,
        onClick: _onAdd
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Raw);