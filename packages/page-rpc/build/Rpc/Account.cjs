"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Account({
  className = '',
  defaultValue,
  isError,
  onChange
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [accountId, setAccountId] = (0, _react.useState)(defaultValue);
  const [accountNonce, setAccountNonce] = (0, _react.useState)(_util.BN_ZERO);
  (0, _react.useEffect)(() => {
    onChange(accountId, accountNonce);
  }, [accountId, accountNonce, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--row ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "large",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: defaultValue,
        isError: isError,
        label: t('sign data from account'),
        onChange: setAccountId,
        placeholder: "0x...",
        type: "account"
      })
    }), accountId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Labelled, {
      className: "small",
      label: t('with an index of'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.Nonce, {
        callOnResult: setAccountNonce,
        className: "ui disabled dropdown selection",
        params: accountId
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Account).withConfig({
  displayName: "Account",
  componentId: "sc-1ddtioo-0"
})(["box-sizing:border-box;padding-left:2em;"]));

exports.default = _default;