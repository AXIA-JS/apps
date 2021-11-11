"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Transfer = _interopRequireDefault(require("@axia-js/app-accounts/modals/Transfer"));

var _translate = require("@axia-js/app-accounts/translate");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AccountMenuButtons({
  className = '',
  flags,
  isEditing,
  isEditingName,
  onCancel,
  onForgetAddress,
  onSaveName,
  onSaveTags,
  onUpdateName,
  recipientId,
  toggleIsEditingName,
  toggleIsEditingTags
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isTransferOpen, toggleIsTransferOpen] = (0, _reactHooks.useToggle)();

  const _onForgetAddress = (0, _react.useCallback)(() => {
    onForgetAddress();
    onUpdateName && onUpdateName();
  }, [onForgetAddress, onUpdateName]);

  const toggleIsEditing = (0, _react.useCallback)(() => {
    flags.isEditable && toggleIsEditingName();
    toggleIsEditingTags();
  }, [flags.isEditable, toggleIsEditingName, toggleIsEditingTags]);

  const _onUpdateName = (0, _react.useCallback)(() => {
    onSaveName();
    onUpdateName && onUpdateName();
  }, [onSaveName, onUpdateName]);

  const updateName = (0, _react.useCallback)(() => {
    if (isEditingName && (flags.isInContacts || flags.isOwned)) {
      _onUpdateName();

      toggleIsEditingName();
    }
  }, [isEditingName, flags.isInContacts, flags.isOwned, _onUpdateName, toggleIsEditingName]);
  const onEdit = (0, _react.useCallback)(() => {
    if (isEditing) {
      updateName();
      onSaveTags();
    }

    toggleIsEditing();
  }, [isEditing, toggleIsEditing, updateName, onSaveTags]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className} ui--AddressMenu-buttons`,
    children: [isEditing ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "times",
        label: t('Cancel'),
        onClick: onCancel
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "save",
        label: t('Save'),
        onClick: onEdit
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "paper-plane",
        isDisabled: isEditing,
        label: t('Send'),
        onClick: toggleIsTransferOpen
      }), !flags.isOwned && !flags.isInContacts && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        isDisabled: isEditing,
        label: t('Save'),
        onClick: _onUpdateName
      }), !flags.isOwned && flags.isInContacts && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "ban",
        isDisabled: isEditing,
        label: t('Remove'),
        onClick: _onForgetAddress
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "edit",
        label: t('Edit'),
        onClick: onEdit
      })]
    }), isTransferOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Transfer.default, {
      onClose: toggleIsTransferOpen,
      recipientId: recipientId
    }, 'modal-transfer')]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AccountMenuButtons).withConfig({
  displayName: "AccountMenuButtons",
  componentId: "sc-xqpqtw-0"
})(["width:100%;.ui--Button-Group{display:flex;flex-direction:row;justify-content:space-around;margin-bottom:0;}"]));

exports.default = _default;