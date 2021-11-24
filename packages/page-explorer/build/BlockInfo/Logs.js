// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Expander, Table } from '@axia-js/react-components';
import Params from '@axia-js/react-params';
import { Raw, Struct, Tuple, Vec } from '@axia-js/types';
import { getTypeDef } from '@axia-js/types/create';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function formatU8a(value) {
  return /*#__PURE__*/_jsx(Params, {
    isDisabled: true,
    params: [{
      type: getTypeDef('Bytes')
    }],
    values: [{
      isValid: true,
      value
    }]
  });
}

function formatStruct(struct) {
  const params = Object.entries(struct.Type).map(([name, value]) => ({
    name,
    type: getTypeDef(value)
  }));
  const values = struct.toArray().map(value => ({
    isValid: true,
    value
  }));
  return /*#__PURE__*/_jsx(Params, {
    isDisabled: true,
    params: params,
    values: values
  });
}

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

function formatVector(vector) {
  const type = getTypeDef(vector.Type);
  const values = vector.toArray().map(value => ({
    isValid: true,
    value
  }));
  const params = values.map((_, index) => ({
    name: `${index}`,
    type
  }));
  return /*#__PURE__*/_jsx(Params, {
    isDisabled: true,
    params: params,
    values: values
  });
}

function formatItem(item) {
  if (item.value instanceof Struct) {
    return formatStruct(item.value);
  } else if (item.value instanceof Tuple) {
    return formatTuple(item.value);
  } else if (item.value instanceof Vec) {
    return formatVector(item.value);
  } else if (item.value instanceof Raw) {
    return formatU8a(item.value);
  }

  return /*#__PURE__*/_jsx("div", {
    children: item.value.toString().split(',').join(', ')
  });
}

function Logs({
  value
}) {
  const {
    t
  } = useTranslation();
  const headerRef = useRef([[t('logs'), 'start']]);
  return /*#__PURE__*/_jsx(Table, {
    empty: t('No logs available'),
    header: headerRef.current,
    children: value === null || value === void 0 ? void 0 : value.map((log, index) => /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        className: "overflow",
        children: /*#__PURE__*/_jsx(Expander, {
          summary: log.type.toString(),
          children: formatItem(log)
        })
      })
    }, `log:${index}`))
  });
}

export default /*#__PURE__*/React.memo(Logs);