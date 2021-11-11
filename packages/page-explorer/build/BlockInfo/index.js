// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBestNumber } from '@axia-js/react-hooks';
import { isHex } from '@axia-js/util';
import Query from "../Query.js";
import BlockByHash from "./ByHash.js";
import BlockByNumber from "./ByNumber.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Entry() {
  const bestNumber = useBestNumber();
  const {
    value
  } = useParams();
  const [stateValue, setStateValue] = useState(value);
  useEffect(() => {
    setStateValue(stateValue => value && value !== stateValue ? value : !stateValue && bestNumber ? bestNumber.toString() : stateValue);
  }, [bestNumber, value]);

  if (!stateValue) {
    return null;
  }

  const Component = isHex(stateValue) ? BlockByHash : BlockByNumber;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Query, {}), /*#__PURE__*/_jsx(Component, {
      value: stateValue
    }, stateValue)]
  });
}

export default /*#__PURE__*/React.memo(Entry);