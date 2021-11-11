"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _create = require("@axia-js/types/create");

var _util = require("@axia-js/util");

var _index = _interopRequireDefault(require("./InputExtrinsic/index.cjs"));

var _index2 = _interopRequireDefault(require("./Params/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
function getParams({
  meta
}) {
  return meta.args.map(arg => ({
    name: arg.name.toString(),
    type: (0, _create.getTypeDef)(arg.type.toString())
  }));
}

function ExtrinsicDisplay({
  defaultValue,
  isDisabled,
  isError,
  isPrivate,
  label,
  onChange,
  onEnter,
  onError,
  onEscape,
  withLabel
}) {
  const [extrinsic, setCall] = (0, _react.useState)({
    fn: defaultValue,
    params: getParams(defaultValue)
  });
  const [values, setValues] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    setValues([]);
  }, [extrinsic]);
  (0, _react.useEffect)(() => {
    const isValid = values.reduce((isValid, value) => isValid && !(0, _util.isUndefined)(value) && !(0, _util.isUndefined)(value.value) && value.isValid, extrinsic.params.length === values.length);
    let method;

    if (isValid) {
      try {
        method = extrinsic.fn(...values.map(({
          value
        }) => value));
      } catch (error) {
        onError && onError(error);
      }
    } else {
      onError && onError(null);
    }

    onChange(method);
  }, [extrinsic, onChange, onError, values]);

  const _onChangeMethod = (0, _react.useCallback)(fn => setCall({
    fn,
    params: getParams(fn)
  }), []);

  const {
    fn: {
      meta,
      method,
      section
    },
    params
  } = extrinsic;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "extrinsics--Extrinsic",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      defaultValue: defaultValue,
      help: meta === null || meta === void 0 ? void 0 : meta.docs.join(' '),
      isDisabled: isDisabled,
      isError: isError,
      isPrivate: isPrivate,
      label: label,
      onChange: _onChangeMethod,
      withLabel: withLabel
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
      onChange: setValues,
      onEnter: onEnter,
      onEscape: onEscape,
      overrides: _index2.default,
      params: params
    }, `${section}.${method}:params`
    /* force re-render on change */
    )]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ExtrinsicDisplay);

exports.default = _default;