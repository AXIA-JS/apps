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

var _translate = require("../translate.cjs");

var _BaseBytes = _interopRequireDefault(require("./BaseBytes.cjs"));

var _File = _interopRequireDefault(require("./File.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Bytes(_ref) {
  let {
    className = '',
    defaultValue,
    isDisabled,
    isError,
    label,
    name,
    onChange,
    onEnter,
    onEscape,
    type,
    withLabel
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isValid, setIsValid] = (0, _react.useState)(false);
  const [isFileDrop, setFileInput] = (0, _react.useState)(false);

  const _onChangeFile = (0, _react.useCallback)(value => {
    const isValid = value.length !== 0;
    onChange && onChange({
      isValid,
      value: (0, _util.compactAddLength)(value)
    });
    setIsValid(isValid);
  }, [onChange]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [!isDisabled && isFileDrop ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_File.default, {
      isDisabled: isDisabled,
      isError: isError || !isValid,
      label: label,
      onChange: _onChangeFile,
      withLabel: withLabel
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_BaseBytes.default, {
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      length: -1,
      name: name,
      onChange: onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      type: type,
      withLabel: withLabel,
      withLength: true
    }), !isDisabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
      isOverlay: true,
      label: t('file upload'),
      onChange: setFileInput,
      value: isFileDrop
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Bytes).withConfig({
  displayName: "Bytes",
  componentId: "sc-184l52o-0"
})(["position:relative;"]));

exports.default = _default;