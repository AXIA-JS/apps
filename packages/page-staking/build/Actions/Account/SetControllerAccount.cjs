"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../../translate.cjs");

var _InputValidationController = _interopRequireDefault(require("./InputValidationController.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SetControllerAccount(_ref) {
  let {
    defaultControllerId,
    onClose,
    stashId
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [isFatal, setIsFatal] = (0, _react.useState)(false);
  const [controllerId, setControllerId] = (0, _react.useState)(null);

  const _setError = (0, _react.useCallback)((_, isFatal) => setIsFatal(isFatal), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Change controller account'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The stash account that is used. This will allow the controller to perform all non-funds related operations on behalf of the account.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          isDisabled: true,
          label: t('stash account'),
          value: stashId
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The selected controller tied to this stash. Once set, this account will be able to control the actions performed by the stash account.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          defaultValue: defaultControllerId,
          help: t('The controller is the account that will be used to control any nominating or validating actions. Should not match another stash or controller.'),
          label: t('controller account'),
          onChange: setControllerId,
          type: "account",
          value: controllerId
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputValidationController.default, {
          accountId: stashId,
          controllerId: controllerId,
          defaultController: defaultControllerId,
          onError: _setError
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: stashId,
        icon: "sign-in-alt",
        isDisabled: !controllerId || isFatal,
        label: t('Set controller'),
        onStart: onClose,
        params: [controllerId],
        tx: api.tx.staking.setController
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SetControllerAccount);

exports.default = _default;