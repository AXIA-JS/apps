// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Table } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import ExtrinsicDisplay from "./Extrinsic.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Extrinsics({
  blockNumber,
  className = '',
  events,
  label,
  value
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const header = useMemo(() => [[label || t('extrinsics'), 'start', 2], [t('events'), 'start media--1000', 2], [t('weight'), 'media--1400'], [t('signer'), 'address media--1200']], [label, t]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: t('No extrinsics available'),
    header: header,
    isFixed: true,
    children: value === null || value === void 0 ? void 0 : value.map((extrinsic, index) => {
      var _api$consts$system$bl;

      return /*#__PURE__*/_jsx(ExtrinsicDisplay, {
        blockNumber: blockNumber,
        events: events,
        index: index,
        maxBlockWeight: (_api$consts$system$bl = api.consts.system.blockWeights) === null || _api$consts$system$bl === void 0 ? void 0 : _api$consts$system$bl.maxBlock,
        value: extrinsic
      }, `extrinsic:${index}`);
    })
  });
}

export default /*#__PURE__*/React.memo(Extrinsics);