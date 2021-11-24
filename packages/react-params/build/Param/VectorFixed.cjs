"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _util = require("@axia-js/util");

var _initValue = _interopRequireDefault(require("../initValue.cjs"));

var _index = _interopRequireDefault(require("../index.cjs"));

var _Base = _interopRequireDefault(require("./Base.cjs"));

var _useParamDefs = _interopRequireDefault(require("./useParamDefs.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function generateParam(_ref, index) {
  let [{
    name,
    type
  }] = _ref;
  return {
    name: `${index}: ${name || type.type}`,
    type
  };
}

function VectorFixed(_ref2) {
  let {
    className = '',
    defaultValue,
    isDisabled = false,
    label,
    onChange,
    overrides,
    registry,
    type,
    withLabel
  } = _ref2;
  const inputParams = (0, _useParamDefs.default)(registry, type);
  const [params, setParams] = (0, _react.useState)([]);
  const [values, setValues] = (0, _react.useState)([]); // build up the list of parameters we are using

  (0, _react.useEffect)(() => {
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

  (0, _react.useEffect)(() => {
    !isDisabled && inputParams.length && setValues(values => {
      const count = inputParams[0].length || 1;

      if (values.length === count) {
        return values;
      }

      while (values.length < count) {
        const value = (0, _initValue.default)(registry, inputParams[0].type);
        values.push({
          isValid: !(0, _util.isUndefined)(value),
          value
        });
      }

      return values.slice(0, count);
    });
  }, [inputParams, isDisabled, registry]); // when isDisabled, set the values based on the defaultValue input

  (0, _react.useEffect)(() => {
    isDisabled && setValues((defaultValue.value || []).map(value => (0, _util.isUndefined)(value) || (0, _util.isUndefined)(value.isValid) ? {
      isValid: !(0, _util.isUndefined)(value),
      value
    } : value));
  }, [defaultValue, isDisabled]); // when our values has changed, alert upstream

  (0, _react.useEffect)(() => {
    onChange && onChange({
      isValid: values.reduce((result, _ref3) => {
        let {
          isValid
        } = _ref3;
        return result && isValid;
      }, true),
      value: values.map(_ref4 => {
        let {
          value
        } = _ref4;
        return value;
      })
    });
  }, [values, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.default, {
    className: className,
    isOuter: true,
    label: label,
    withLabel: withLabel,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      isDisabled: isDisabled,
      onChange: setValues,
      overrides: overrides,
      params: params,
      registry: registry,
      values: values
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(VectorFixed);

exports.default = _default;