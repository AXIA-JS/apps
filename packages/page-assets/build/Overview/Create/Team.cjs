"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Team({
  accountId,
  className = '',
  defaultValue,
  onChange
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [initial] = (0, _react.useState)(() => defaultValue);
  const [adminId, setAdminId] = (0, _react.useState)(null);
  const [freezerId, setFreezerId] = (0, _react.useState)(null);
  const [issuerId, setIssuerId] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    onChange(adminId && freezerId && issuerId ? {
      adminId,
      freezerId,
      issuerId
    } : null);
  }, [api, adminId, freezerId, issuerId, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The account that is to be used for ongoing admin on the token.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: (initial === null || initial === void 0 ? void 0 : initial.adminId) || accountId,
        label: t('admin account'),
        onChange: setAdminId,
        type: "account"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The account that is to be used for issuing this token.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: (initial === null || initial === void 0 ? void 0 : initial.issuerId) || accountId,
        label: t('issuer account'),
        onChange: setIssuerId,
        type: "account"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The account that is to be used for performing freezing.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: (initial === null || initial === void 0 ? void 0 : initial.freezerId) || accountId,
        label: t('freezer account'),
        onChange: setFreezerId,
        type: "account"
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Team);

exports.default = _default;