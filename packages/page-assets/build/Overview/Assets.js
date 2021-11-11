// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Table } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Asset from "./Asset.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Assets({
  className,
  infos
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('assets'), 'start', 2], [t('owner'), 'address media--1000'], [t('admin'), 'address media--1200'], [t('issuer'), 'address media--1300'], [t('freezer'), 'address media--1400'], [t('supply')], []]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: infos && t('No assets found'),
    header: headerRef.current,
    children: infos === null || infos === void 0 ? void 0 : infos.map(info => /*#__PURE__*/_jsx(Asset, {
      value: info
    }, info.key))
  });
}

export default /*#__PURE__*/React.memo(Assets);