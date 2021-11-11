"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _types = require("@axia-js/types");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function doChange(onChange) {
  return function (value) {
    onChange && onChange({
      isValid: true,
      value
    });
  };
}

function Vote({
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  onChange,
  withLabel
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const optAyeRef = (0, _react.useRef)([{
    text: t('Nay'),
    value: 0
  }, {
    text: t('Aye'),
    value: -1
  }]);
  const optConvRef = (0, _react.useRef)([{
    text: t('None'),
    value: 0
  }, {
    text: t('Locked1x'),
    value: 1
  }, {
    text: t('Locked2x'),
    value: 2
  }, {
    text: t('Locked3x'),
    value: 3
  }, {
    text: t('Locked4x'),
    value: 4
  }, {
    text: t('Locked5x'),
    value: 5
  }, {
    text: t('Locked6x'),
    value: 6
  }]);
  const defaultValue = (0, _util.isBn)(value) ? value.toNumber() : value instanceof _types.GenericVote ? value.isAye ? -1 : 0 : value;
  const defaultConv = value instanceof _types.GenericVote ? value.conviction.index : 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Bare.default, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: t('aye: bool'),
      onChange: doChange(onChange),
      options: optAyeRef.current,
      withLabel: withLabel
    }), isDisabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
      className: "full",
      defaultValue: defaultConv,
      isDisabled: isDisabled,
      isError: isError,
      label: t('conviction: Conviction'),
      options: optConvRef.current,
      withLabel: withLabel
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Vote);

exports.default = _default;