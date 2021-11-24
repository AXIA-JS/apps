"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _types = require("@axia-js/types");

var _translate = require("../translate.cjs");

var _index = _interopRequireDefault(require("./index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function OptionDisplay(_ref) {
  let {
    className = '',
    defaultValue: _defaultValue,
    isDisabled,
    name,
    onChange,
    onEnter,
    onEscape,
    registry,
    type: {
      sub,
      withOptionActive
    }
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isActive, setIsActive] = (0, _react.useState)(withOptionActive || false);
  const defaultValue = (0, _react.useMemo)(() => isDisabled ? _defaultValue && _defaultValue.value instanceof _types.Option && _defaultValue.value.isSome ? {
    isValid: _defaultValue.isValid,
    value: _defaultValue.value.unwrap()
  } : {
    isValid: _defaultValue.isValid,
    value: undefined
  } : _defaultValue, [_defaultValue, isDisabled]);
  (0, _react.useEffect)(() => {
    !isActive && onChange && onChange({
      isValid: true,
      value: null
    });
  }, [isActive, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      defaultValue: defaultValue,
      isDisabled: isDisabled || !isActive,
      isInOption: true,
      isOptional: !isActive && !isDisabled,
      name: name,
      onChange: onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      registry: registry,
      type: sub
    }), !isDisabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
      isOverlay: true,
      label: t('include option'),
      onChange: setIsActive,
      value: isActive
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(OptionDisplay).withConfig({
  displayName: "Option",
  componentId: "sc-1wmfbjy-0"
})(["position:relative;"]));

exports.default = _default;