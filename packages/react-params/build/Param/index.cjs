"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _create = require("@axia-js/types/create");

var _util = require("@axia-js/util");

var _findComponent = _interopRequireDefault(require("./findComponent.cjs"));

var _Static = _interopRequireDefault(require("./Static.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Param(_ref) {
  let {
    className = '',
    defaultValue,
    isDisabled,
    isInOption,
    isOptional,
    name,
    onChange,
    onEnter,
    onEscape,
    overrides,
    registry,
    type
  } = _ref;
  const Component = (0, _react.useMemo)(() => (0, _findComponent.default)(registry, type, overrides), [registry, type, overrides]);
  const label = (0, _react.useMemo)(() => (0, _util.isUndefined)(name) ? `${isDisabled && isInOption ? 'Option<' : ''}${(0, _create.encodeTypeDef)(registry, type)}${isDisabled && isInOption ? '>' : ''}` : `${name}: ${isDisabled && isInOption ? 'Option<' : ''}${(0, _create.encodeTypeDef)(registry, type)}${isDisabled && isInOption ? '>' : ''}`, [isDisabled, isInOption, name, registry, type]);

  if (!Component) {
    return null;
  }

  return isOptional ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, {
    defaultValue: defaultValue,
    label: label,
    type: type
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
    className: `ui--Param ${className}`,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isInOption: isInOption,
    label: label,
    name: name,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    overrides: overrides,
    registry: registry,
    type: type
  }, `${name || 'unknown'}:${type.toString()}`);
}

var _default = /*#__PURE__*/_react.default.memo(Param);

exports.default = _default;