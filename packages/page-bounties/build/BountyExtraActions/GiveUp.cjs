"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _index = require("../helpers/index.cjs");

var _index2 = require("../hooks/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BountyGiveUpCurator({
  curatorId,
  description,
  index,
  toggleOpen
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    unassignCurator
  } = (0, _index2.useBounties)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: `${t("give up curator's role")} - "${(0, _index.truncateTitle)(description, 30)}"`,
    onClose: toggleOpen,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('You are giving up your curator role, the bounty will return to the Funded state. You will get your deposit back.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          help: t('The Curator account that will give up on it\'s role.'),
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
        icon: "check",
        label: t('Give up'),
        onStart: toggleOpen,
        params: [index],
        tx: unassignCurator
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BountyGiveUpCurator);

exports.default = _default;