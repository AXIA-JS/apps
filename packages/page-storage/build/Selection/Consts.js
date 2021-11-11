// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Button, InputConsts } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Consts({
  onAdd
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [defaultValue] = useState(() => {
    const section = Object.keys(api.consts)[0];
    const method = Object.keys(api.consts[section])[0];
    return {
      meta: api.consts[section][method].meta,
      method,
      section
    };
  });
  const [value, setValue] = useState(defaultValue);

  const _onAdd = useCallback(() => onAdd({
    isConst: true,
    key: value
  }), [onAdd, value]);

  const {
    method,
    section
  } = value;
  const meta = api.consts[section][method].meta;
  return /*#__PURE__*/_jsxs("section", {
    className: "storage--actionrow",
    children: [/*#__PURE__*/_jsx("div", {
      className: "storage--actionrow-value",
      children: /*#__PURE__*/_jsx(InputConsts, {
        defaultValue: defaultValue,
        help: meta === null || meta === void 0 ? void 0 : meta.docs.join(' '),
        label: t('selected constant query'),
        onChange: setValue
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "storage--actionrow-buttons",
      children: /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        onClick: _onAdd
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Consts);