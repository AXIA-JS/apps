"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _create = require("@axia-js/types/create");

var _jsonrpc = _interopRequireDefault(require("@axia-js/types/interfaces/jsonrpc"));

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
const defaultMethod = _jsonrpc.default.author.submitExtrinsic;

function Selection({
  queueRpc
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [{
    isValid,
    rpc,
    values
  }, setState] = (0, _react.useState)({
    isValid: false,
    rpc: defaultMethod,
    values: []
  });
  const params = (0, _react.useMemo)(() => rpc.params.map(({
    isOptional,
    name,
    type
  }) => ({
    name,
    type: (0, _create.getTypeDef)(isOptional ? `Option<${type}>` : type)
  })), [rpc]);

  const _nextState = (0, _react.useCallback)(newState => setState(prevState => {
    const {
      rpc = prevState.rpc,
      values = prevState.values
    } = newState;
    const reqCount = rpc.params.reduce((count, {
      isOptional
    }) => count + (isOptional ? 0 : 1), 0);
    const isValid = values.reduce((isValid, value) => isValid && value.isValid === true, reqCount <= values.length);
    return {
      isValid,
      rpc,
      values
    };
  }), []);

  const _onChangeMethod = (0, _react.useCallback)(rpc => _nextState({
    rpc,
    values: []
  }), [_nextState]);

  const _onChangeValues = (0, _react.useCallback)(values => _nextState({
    values
  }), [_nextState]);

  const _onSubmit = (0, _react.useCallback)(() => queueRpc({
    rpc,
    values: values.filter(({
      value
    }) => !(0, _util.isNull)(value)).map(({
      value
    }) => value)
  }), [queueRpc, rpc, values]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "rpc--Selection",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputRpc, {
      defaultValue: defaultMethod,
      help: t('The actual JSONRPC module and function to make a call to.'),
      label: t('call the selected endpoint'),
      onChange: _onChangeMethod
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
      onChange: _onChangeValues,
      params: params
    }, `${rpc.section}.${rpc.method}:params`
    /* force re-render on change */
    ), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "sign-in-alt",
        isDisabled: !isValid,
        label: t('Submit RPC call'),
        onClick: _onSubmit
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Selection);

exports.default = _default;