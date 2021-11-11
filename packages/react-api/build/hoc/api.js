import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { assert } from '@axia-js/util';
import { ApiConsumer } from "../ApiContext.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function withApi(Inner, defaultProps = {}) {
  class WithApi extends React.PureComponent {
    constructor(...args) {
      super(...args);
      this.component = /*#__PURE__*/React.createRef();
    }

    render() {
      return /*#__PURE__*/_jsx(ApiConsumer, {
        children: apiProps => {
          assert(apiProps && apiProps.api, 'Application root must be wrapped inside \'react-api/Api\' to provide API context');
          return /*#__PURE__*/_jsx(Inner, _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultProps), apiProps), this.props), {}, {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ref: this.component
          }));
        }
      });
    }

  }

  return WithApi;
}