"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("@axia-js/app-bounties/hooks");

var _reactComponents = require("@axia-js/react-components");

var _index = require("../helpers/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BountyRejectCurator(_ref) {
  let {
    curatorId,
    description,
    index,
    toggleOpen
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    unassignCurator
  } = (0, _hooks.useBounties)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: `${t('reject curator')} - "${(0, _index.truncateTitle)(description, 30)}"`,
    onClose: toggleOpen,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('Only the account proposed as curator by the council can create the unassign curator transaction '),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          help: t('This account will be used to create the unassign curator transaction.'),
          isDisabled: true,
          label: t('curator account'),
          type: "account",
          value: curatorId.toString(),
          withLabel: true
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: curatorId,
        icon: "times",
        label: t('Reject'),
        onStart: toggleOpen,
        params: [index],
        tx: unassignCurator
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BountyRejectCurator);

exports.default = _default;