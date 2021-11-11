"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _AccountMenuButtons = _interopRequireDefault(require("./AccountMenuButtons.cjs"));

var _AddressSection = _interopRequireDefault(require("./AddressSection.cjs"));

var _Flags = _interopRequireDefault(require("./Flags.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SidebarEditableSection({
  accountIndex,
  address,
  isBeingEdited,
  onUpdateName,
  sidebarRef
}) {
  const {
    flags,
    isEditing,
    isEditingName,
    isEditingTags,
    name,
    onForgetAddress,
    onSaveName,
    onSaveTags,
    setIsEditingName,
    setIsEditingTags,
    setName,
    setTags,
    tags,
    toggleIsEditingName,
    toggleIsEditingTags
  } = (0, _reactHooks.useAccountInfo)(address);
  (0, _react.useEffect)(() => {
    isBeingEdited(isEditing());
  }, [isBeingEdited, isEditing]);
  const onCancel = (0, _react.useCallback)(() => {
    if (isEditing()) {
      try {
        const accountOrAddress = _uiKeyring.keyring.getAccount(address) || _uiKeyring.keyring.getAddress(address);

        setName((accountOrAddress === null || accountOrAddress === void 0 ? void 0 : accountOrAddress.meta.name) || '');
        setTags(accountOrAddress !== null && accountOrAddress !== void 0 && accountOrAddress.meta.tags ? accountOrAddress.meta.tags.sort() : []);
        setIsEditingName(false);
        setIsEditingTags(false);
      } catch (error) {// ignore
      }
    }
  }, [isEditing, setName, setTags, setIsEditingName, setIsEditingTags, address]);
  (0, _reactHooks.useOutsideClick)([sidebarRef], onCancel);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_AddressSection.default, {
      accountIndex: accountIndex,
      defaultValue: name,
      editingName: isEditingName,
      flags: flags,
      onChange: setName,
      value: address
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--AddressMenu-tags",
      "data-testid": "sidebar-tags",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tags, {
        isEditable: true,
        isEditing: isEditingTags,
        onChange: setTags,
        size: "tiny",
        value: tags,
        withEditButton: false,
        withTitle: true
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Flags.default, {
      flags: flags
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AccountMenuButtons.default, {
      flags: flags,
      isEditing: isEditing(),
      isEditingName: isEditingName,
      onCancel: onCancel,
      onForgetAddress: onForgetAddress,
      onSaveName: onSaveName,
      onSaveTags: onSaveTags,
      onUpdateName: onUpdateName,
      recipientId: address,
      toggleIsEditingName: toggleIsEditingName,
      toggleIsEditingTags: toggleIsEditingTags
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SidebarEditableSection);

exports.default = _default;