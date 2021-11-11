// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { isUndefined } from '@axia-js/util';
import getInitValue from "../initValue.js";
import Params from "../index.js";
import Base from "./Base.js";
import useParamDefs from "./useParamDefs.js";
import { jsx as _jsx } from "react/jsx-runtime";

function generateParam([{
  name,
  type
}], index) {
  return {
    name: `${index}: ${name || type.type}`,
    type
  };
}

function VectorFixed({
  className = '',
  defaultValue,
  isDisabled = false,
  label,
  onChange,
  overrides,
  registry,
  type,
  withLabel
}) {
  const inputParams = useParamDefs(registry, type);
  const [params, setParams] = useState([]);
  const [values, setValues] = useState([]); // build up the list of parameters we are using

  useEffect(() => {
    if (inputParams.length) {
      const count = inputParams[0].length || 1;
      const max = isDisabled ? (defaultValue.value || []).length : count;
      const params = [];

      for (let index = 0; index < max; index++) {
        params.push(generateParam(inputParams, index));
      }

      setParams(params);
    }
  }, [defaultValue, isDisabled, inputParams]); // when !isDisable, generating an input list based on count

  useEffect(() => {
    !isDisabled && inputParams.length && setValues(values => {
      const count = inputParams[0].length || 1;

      if (values.length === count) {
        return values;
      }

      while (values.length < count) {
        const value = getInitValue(registry, inputParams[0].type);
        values.push({
          isValid: !isUndefined(value),
          value
        });
      }

      return values.slice(0, count);
    });
  }, [inputParams, isDisabled, registry]); // when isDisabled, set the values based on the defaultValue input

  useEffect(() => {
    isDisabled && setValues((defaultValue.value || []).map(value => isUndefined(value) || isUndefined(value.isValid) ? {
      isValid: !isUndefined(value),
      value
    } : value));
  }, [defaultValue, isDisabled]); // when our values has changed, alert upstream

  useEffect(() => {
    onChange && onChange({
      isValid: values.reduce((result, {
        isValid
      }) => result && isValid, true),
      value: values.map(({
        value
      }) => value)
    });
  }, [values, onChange]);
  return /*#__PURE__*/_jsx(Base, {
    className: className,
    isOuter: true,
    label: label,
    withLabel: withLabel,
    children: /*#__PURE__*/_jsx(Params, {
      isDisabled: isDisabled,
      onChange: setValues,
      overrides: overrides,
      params: params,
      registry: registry,
      values: values
    })
  });
}

export default /*#__PURE__*/React.memo(VectorFixed);