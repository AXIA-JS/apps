// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import contracts from "../store.js";
import { useTranslation } from "../translate.js";
import Code from "./Code.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Codes({
  onShowDeploy
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('code hashes'), 'start'], [], [], [t('status'), 'start'], []]);
  return /*#__PURE__*/_jsx(Table, {
    empty: t('No code hashes available'),
    header: headerRef.current,
    children: contracts.getAllCode().map(code => /*#__PURE__*/_jsx(Code, {
      code: code,
      onShowDeploy: onShowDeploy
    }, code.json.codeHash))
  });
}

export default /*#__PURE__*/React.memo(Codes);