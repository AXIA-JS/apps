"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function CreateConfirmation(_ref) {
  let {
    address,
    derivePath,
    name,
    pairType,
    seed
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const splitSeed = seed && seed.split(' ');
  const shortSeed = (0, _util.isHex)(seed) ? `${seed.substr(10)} … ${seed.substr(-8)}` : splitSeed && splitSeed.map((value, index) => index % 3 ? '…' : value).join(' ');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
      hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('We will provide you with a generated backup file after your account is created. As long as you have access to your account you can always download this file later by clicking on "Backup" button from the Accounts section.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('Please make sure to save this file in a secure location as it is required, together with your password, to restore your account.')
        })]
      }),
      children: [address && name && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressRow, {
        defaultName: name,
        isInline: true,
        noDefaultNameOpacity: true,
        value: address
      }), shortSeed && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
        label: t('partial seed'),
        value: shortSeed
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
        label: t('keypair type'),
        value: pairType
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
        label: t('derivation path'),
        value: derivePath || t('<none provided>')
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(CreateConfirmation);

exports.default = _default;