"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function stateFromValue(value) {
  return {
    isValid: (0, _util.isHex)(value, 256) || /^\d+$/.test(value),
    value
  };
}

function Query(_ref) {
  let {
    className = '',
    value: propsValue
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [{
    isValid,
    value
  }, setState] = (0, _react.useState)(() => stateFromValue(propsValue || ''));

  const _setHash = (0, _react.useCallback)(value => setState(stateFromValue(value)), []);

  const _onQuery = (0, _react.useCallback)(() => {
    if (isValid && value.length !== 0) {
      window.location.hash = `/explorer/query/${value}`;
    }
  }, [isValid, value]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.FilterOverlay, {
    className: `ui--FilterOverlay hasOwnMaxWidth ${className}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      className: "explorer--query",
      defaultValue: propsValue,
      isError: !isValid && value.length !== 0,
      onChange: _setHash,
      onEnter: _onQuery,
      placeholder: t('block hash or number to query'),
      withLabel: false,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "play",
        onClick: _onQuery
      })
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Query).withConfig({
  displayName: "Query",
  componentId: "sc-k74xoa-0"
})([".explorer--query{width:20em;}"]));

exports.default = _default;