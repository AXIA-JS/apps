"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _CodeRow = _interopRequireDefault(require("./shared/CodeRow.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function RemoveABI({
  code,
  onClose,
  onRemove
}) {
  const {
    t
  } = (0, _translate.useTranslation)();

  const _onRemove = (0, _react.useCallback)(() => {
    onClose && onClose();
    onRemove();
  }, [onClose, onRemove]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: "app--accounts-Modal",
    header: t('Confirm ABI removal'),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_CodeRow.default, {
        code: code,
        isInline: true,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('You are about to remove this code\'s ABI. Once completed, should you need to access it again, you will have to manually re-upload it.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('This operation does not impact the associated on-chain code or any of its contracts.')
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "trash",
        label: t('Remove'),
        onClick: _onRemove
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(RemoveABI);

exports.default = _default;