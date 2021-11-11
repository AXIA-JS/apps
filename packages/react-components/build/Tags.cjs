"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _EditButton = _interopRequireDefault(require("./EditButton.cjs"));

var _InputTags = _interopRequireDefault(require("./InputTags.cjs"));

var _Tag = _interopRequireDefault(require("./Tag.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Tags({
  children,
  className = '',
  isEditable,
  isEditing,
  onChange,
  onSave,
  onToggleIsEditing,
  value,
  withEditButton = true,
  withTitle
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const contents = (0, _react.useMemo)(() => value.length ? value.map(tag => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tag.default, {
    label: tag
  }, tag)) : /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
    children: t('no tags')
  }), [t, value]);

  const _onSave = (0, _react.useCallback)(() => {
    onSave && onSave();
    onToggleIsEditing && onToggleIsEditing();
  }, [onSave, onToggleIsEditing]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Tags ${className}`,
    children: [withTitle && /*#__PURE__*/(0, _jsxRuntime.jsx)("h5", {
      children: t('Tags')
    }), isEditable && isEditing ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputTags.default, {
      defaultValue: value,
      onBlur: _onSave,
      onChange: onChange,
      onClose: _onSave,
      openOnFocus: true,
      searchInput: {
        autoFocus: false
      },
      value: value,
      withLabel: false
    }) : isEditable && withEditButton ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_EditButton.default, {
      className: value.length === 0 ? 'center' : 'left',
      onClick: onToggleIsEditing,
      children: contents
    }) : contents, children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Tags).withConfig({
  displayName: "Tags",
  componentId: "sc-tc8u5k-0"
})(["h5{font-style:normal;font-weight:var(--font-weight-bold);font-size:0.714rem;line-height:1rem;text-transform:uppercase;margin-bottom:0.5rem;}label{display:inline-block;}.ui--EditButton{display:flex;align-items:center;flex-wrap:wrap;&.center{justify-content:center;}&.left{justify-content:left;}}.ui--Tag{margin:0.1rem 0 0.1rem 0.571rem;}"]));

exports.default = _default;