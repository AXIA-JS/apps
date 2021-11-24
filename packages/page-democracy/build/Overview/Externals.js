// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import External from "./External.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Externals({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const external = useCall(api.derive.democracy.nextExternal);
  const headerRef = useRef([[t('external'), 'start'], [t('proposer'), 'address'], [t('locked')], []]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: external === null && t('No external proposal'),
    header: headerRef.current,
    children: external && /*#__PURE__*/_jsx(External, {
      value: external
    })
  });
}

export default /*#__PURE__*/React.memo(Externals);