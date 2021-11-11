// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Expander, Table } from '@axia-js/react-components';
import Params from '@axia-js/react-params';
import { getTypeDef } from '@axia-js/types/create';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function formatTuple(tuple) {
  const params = tuple.Types.map(type => ({
    type: getTypeDef(type)
  }));
  const values = tuple.toArray().map(value => ({
    isValid: true,
    value
  }));
  return /*#__PURE__*/_jsx(Params, {
    isDisabled: true,
    params: params,
    values: values
  });
}

function JustificationList({
  value
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('justifications'), 'start']]);
  const justifications = value.unwrapOr(null);

  if (!justifications) {
    return null;
  }

  return /*#__PURE__*/_jsx(Table, {
    empty: t('No justifications available'),
    header: headerRef.current,
    children: justifications === null || justifications === void 0 ? void 0 : justifications.map((justification, index) => /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        className: "overflow",
        children: /*#__PURE__*/_jsx(Expander, {
          summary: justification[0].toString(),
          children: formatTuple(justification)
        })
      })
    }, `justification:${index}`))
  });
}

export default /*#__PURE__*/React.memo(JustificationList);