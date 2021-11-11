// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { isString } from '@axia-js/util';
import Spinner from "../Spinner.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function Body({
  children,
  className = '',
  empty,
  emptySpinner,
  noBodyTag
}) {
  return children ? noBodyTag ? /*#__PURE__*/_jsx(_Fragment, {
    children: children
  }) : /*#__PURE__*/_jsx("tbody", {
    className: className,
    children: children
  }) : /*#__PURE__*/_jsx("tbody", {
    className: className,
    children: /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        colSpan: 100,
        children: isString(empty) ? /*#__PURE__*/_jsx("div", {
          className: "empty",
          children: empty
        }) : empty || /*#__PURE__*/_jsx(Spinner, {
          label: emptySpinner
        })
      })
    })
  });
}

export default /*#__PURE__*/React.memo(Body);