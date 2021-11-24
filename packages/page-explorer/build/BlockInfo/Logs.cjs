"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _types = require("@axia-js/types");

var _create = require("@axia-js/types/create");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function formatU8a(value) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
    isDisabled: true,
    params: [{
      type: (0, _create.getTypeDef)('Bytes')
    }],
    values: [{
      isValid: true,
      value
    }]
  });
}

function formatStruct(struct) {
  const params = Object.entries(struct.Type).map(_ref => {
    let [name, value] = _ref;
    return {
      name,
      type: (0, _create.getTypeDef)(value)
    };
  });
  const values = struct.toArray().map(value => ({
    isValid: true,
    value
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
    isDisabled: true,
    params: params,
    values: values
  });
}

function formatTuple(tuple) {
  const params = tuple.Types.map(type => ({
    type: (0, _create.getTypeDef)(type)
  }));
  const values = tuple.toArray().map(value => ({
    isValid: true,
    value
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
    isDisabled: true,
    params: params,
    values: values
  });
}

function formatVector(vector) {
  const type = (0, _create.getTypeDef)(vector.Type);
  const values = vector.toArray().map(value => ({
    isValid: true,
    value
  }));
  const params = values.map((_, index) => ({
    name: `${index}`,
    type
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
    isDisabled: true,
    params: params,
    values: values
  });
}

function formatItem(item) {
  if (item.value instanceof _types.Struct) {
    return formatStruct(item.value);
  } else if (item.value instanceof _types.Tuple) {
    return formatTuple(item.value);
  } else if (item.value instanceof _types.Vec) {
    return formatVector(item.value);
  } else if (item.value instanceof _types.Raw) {
    return formatU8a(item.value);
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: item.value.toString().split(',').join(', ')
  });
}

function Logs(_ref2) {
  let {
    value
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const headerRef = (0, _react.useRef)([[t('logs'), 'start']]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    empty: t('No logs available'),
    header: headerRef.current,
    children: value === null || value === void 0 ? void 0 : value.map((log, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "overflow",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
          summary: log.type.toString(),
          children: formatItem(log)
        })
      })
    }, `log:${index}`))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Logs);

exports.default = _default;