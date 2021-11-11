import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import withCall from "./call.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function withCallDiv(endpoint, options = {}) {
  return (render, defaultProps = {}) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    function Inner({
      callResult,
      callUpdated,
      children,
      className = defaultProps.className,
      label = ''
    }) {
      return /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({}, defaultProps), {}, {
        className: [className || '', callUpdated ? 'rx--updated' : undefined].join(' '),
        children: [label, render(callResult), children]
      }));
    }

    return withCall(endpoint, _objectSpread(_objectSpread({}, options), {}, {
      propName: 'callResult'
    }))(Inner);
  };
}