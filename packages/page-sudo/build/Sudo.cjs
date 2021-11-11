"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Sudo({
  className,
  isMine,
  sudoKey
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api,
    apiDefaultTxSudo
  } = (0, _reactHooks.useApi)();
  const [withWeight, toggleWithWeight] = (0, _reactHooks.useToggle)();
  const [method, setMethod] = (0, _react.useState)(null);
  const [weight, setWeight] = (0, _react.useState)(_util.BN_ZERO);

  const _onChangeExtrinsic = (0, _react.useCallback)((method = null) => setMethod(() => method), []);

  const _onChangeWeight = (0, _react.useCallback)((weight = _util.BN_ZERO) => setWeight(weight), []);

  return isMine ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Extrinsic, {
      defaultValue: apiDefaultTxSudo,
      label: t('submit the following change'),
      onChange: _onChangeExtrinsic
    }), (0, _util.isFunction)(api.tx.sudo.sudoUncheckedWeight) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
      help: t('The unchecked weight as specified for the sudoUncheckedWeight call.'),
      isDisabled: !withWeight,
      isError: weight.eq(_util.BN_ZERO),
      isZeroable: false,
      label: t('unchecked weight for this call'),
      onChange: _onChangeWeight,
      value: weight,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "sudoToggle",
        isOverlay: true,
        label: t('with weight override'),
        onChange: toggleWithWeight,
        value: withWeight
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: sudoKey,
        icon: "sign-in-alt",
        isDisabled: !method || (withWeight ? weight.eq(_util.BN_ZERO) : false),
        label: withWeight ? t('Submit Sudo Unchecked') : t('Submit Sudo'),
        params: withWeight ? [method, weight] : [method],
        tx: withWeight ? api.tx.sudo.sudoUncheckedWeight : api.tx.sudo.sudo
      })
    })]
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("article", {
    className: "error padded",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        icon: "ban"
      }), t('You do not have access to the current sudo key')]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Sudo).withConfig({
  displayName: "Sudo",
  componentId: "sc-1wbms5z-0"
})([".sudoToggle{width:100%;text-align:right;}"]));

exports.default = _default;