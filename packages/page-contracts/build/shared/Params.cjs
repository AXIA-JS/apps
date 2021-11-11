"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Params({
  isDisabled,
  onChange,
  onEnter,
  params: propParams,
  registry
}) {
  const [params, setParams] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    propParams && setParams(propParams);
  }, [propParams]);

  const _onChange = (0, _react.useCallback)(values => onChange(values.map(({
    value
  }) => value)), [onChange]);

  if (!params.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
    isDisabled: isDisabled,
    onChange: _onChange,
    onEnter: onEnter,
    params: params,
    registry: registry
  });
}

var _default = /*#__PURE__*/_react.default.memo(Params);

exports.default = _default;