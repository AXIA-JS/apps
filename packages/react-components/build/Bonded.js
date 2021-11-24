// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Bonded } from '@axia-js/react-query';
import { renderProvided } from "./Balance.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function BondedDisplay(props) {
  const {
    bonded,
    className = '',
    label,
    params
  } = props;

  if (!params) {
    return null;
  }

  return bonded ? /*#__PURE__*/_jsx(_Fragment, {
    children: renderProvided({
      className,
      label,
      value: bonded
    })
  }) : /*#__PURE__*/_jsx(Bonded, {
    className: `ui--Bonded ${className}`,
    label: label,
    params: params
  });
}

export default /*#__PURE__*/React.memo(BondedDisplay);