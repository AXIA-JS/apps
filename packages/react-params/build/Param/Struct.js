import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import Params from "../index.js";
import Base from "./Base.js";
import Static from "./Static.js";
import useParamDefs from "./useParamDefs.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function StructParam(props) {
  const params = useParamDefs(props.registry, props.type);
  const {
    className = '',
    isDisabled,
    label,
    onChange,
    overrides,
    withLabel
  } = props;

  const _onChangeParams = useCallback(values => {
    onChange && onChange({
      isValid: values.reduce((result, {
        isValid
      }) => result && isValid, true),
      value: params.reduce((value, {
        name
      }, index) => {
        value[name] = values[index].value;
        return value;
      }, {})
    });
  }, [params, onChange]);

  if (isDisabled) {
    return /*#__PURE__*/_jsx(Static, _objectSpread({}, props));
  }

  return /*#__PURE__*/_jsxs("div", {
    className: "ui--Params-Struct",
    children: [/*#__PURE__*/_jsx(Base, {
      className: className,
      label: label,
      withLabel: withLabel
    }), /*#__PURE__*/_jsx(Params, {
      onChange: _onChangeParams,
      overrides: overrides,
      params: params,
      registry: props.registry
    })]
  });
}

export default /*#__PURE__*/React.memo(StructParam);