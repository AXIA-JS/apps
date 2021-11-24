import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { Dropdown } from '@axia-js/react-components';
import { Enum, getTypeDef } from '@axia-js/types';
import Params from "../index.js";
import Bare from "./Bare.js";
import Static from "./Static.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function EnumParam(props) {
  const {
    className = '',
    defaultValue,
    isDisabled,
    isError,
    label,
    onChange,
    overrides,
    registry,
    type,
    withLabel
  } = props;
  const [current, setCurrent] = useState(null);
  const [initialValue, setInitialValue] = useState(null);
  const [{
    options,
    subTypes
  }, setOptions] = useState({
    options: [],
    subTypes: []
  });
  useEffect(() => {
    const rawType = registry.createType(type.type).toRawType();
    const typeDef = getTypeDef(rawType);
    const subTypes = typeDef.sub;
    setOptions({
      options: subTypes.map(({
        name
      }) => ({
        text: name,
        value: name
      })),
      subTypes
    });
    setCurrent([{
      name: subTypes[0].name,
      type: subTypes[0]
    }]);
  }, [registry, type]);
  useEffect(() => {
    setInitialValue(defaultValue && defaultValue.value ? defaultValue.value instanceof Enum ? defaultValue.value.type : Object.keys(defaultValue.value)[0] : null);
  }, [defaultValue]);

  const _onChange = useCallback(value => {
    const newType = subTypes.find(({
      name
    }) => name === value) || null;
    setCurrent(newType ? [{
      name: newType.name,
      type: newType
    }] : null);
  }, [subTypes]);

  const _onChangeParam = useCallback(([{
    isValid,
    value
  }]) => {
    current && onChange && onChange({
      isValid,
      value: {
        [current[0].name]: value
      }
    });
  }, [current, onChange]);

  if (isDisabled) {
    return /*#__PURE__*/_jsx(Static, _objectSpread({}, props));
  }

  return /*#__PURE__*/_jsxs(Bare, {
    className: className,
    children: [/*#__PURE__*/_jsx(Dropdown, {
      className: "full",
      defaultValue: initialValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: _onChange,
      options: options,
      withEllipsis: true,
      withLabel: withLabel
    }), current && /*#__PURE__*/_jsx(Params, {
      onChange: _onChangeParam,
      overrides: overrides,
      params: current,
      registry: registry
    })]
  });
}

export default /*#__PURE__*/React.memo(EnumParam);