"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _PaymentInfo = _interopRequireDefault(require("./PaymentInfo.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Transaction({
  accountId,
  className,
  currentItem: {
    extrinsic,
    isUnsigned,
    payload
  },
  isSendable,
  onError,
  tip
}) {
  const {
    t
  } = (0, _translate.useTranslation)();

  if (!extrinsic) {
    return null;
  }

  const {
    meta,
    method,
    section
  } = extrinsic.registry.findMetaCall(extrinsic.callIndex);
  const args = (meta === null || meta === void 0 ? void 0 : meta.args.map(({
    name
  }) => name).join(', ')) || '';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
    className: className,
    hint: t('The details of the transaction including the type, the description (as available from the chain metadata) as well as any parameters and fee estimations (as available) for the specific type of call.'),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      className: "tx-details",
      summary: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [t('Sending transaction'), " ", /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
          className: "highlight",
          children: [section, ".", method, "(", args, ")"]
        })]
      }),
      summaryMeta: meta,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Call, {
        onError: onError,
        value: extrinsic,
        withBorder: false
      })
    }), !isUnsigned && !payload && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaymentInfo.default, {
      accountId: accountId,
      className: "tx-details",
      extrinsic: extrinsic,
      isSendable: isSendable,
      tip: tip
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Transaction).withConfig({
  displayName: "Transaction",
  componentId: "sc-1fcdp9p-0"
})([".tx-details{.ui--Expander-summary{font-size:1.1rem;margin:0 0 0.5rem;}.highlight{font-weight:var(--font-weight-normal);}.meta{margin-bottom:0.5rem;margin-left:2rem;}.meta,.mute{opacity:0.6;}}"]));

exports.default = _default;