"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../../translate.cjs");

var _destOptions = require("../destOptions.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SetRewardDestination(_ref) {
  var _api$derive$balances;

  let {
    controllerId,
    defaultDestination,
    onClose,
    stashId
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [destination, setDestination] = (0, _react.useState)(() => (defaultDestination !== null && defaultDestination !== void 0 && defaultDestination.isAccount ? 'Account' : defaultDestination === null || defaultDestination === void 0 ? void 0 : defaultDestination.toString()) || 'Staked');
  const [destAccount, setDestAccount] = (0, _react.useState)(() => defaultDestination !== null && defaultDestination !== void 0 && defaultDestination.isAccount ? defaultDestination.asAccount.toString() : null);
  const destBalance = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [destAccount]);
  const options = (0, _react.useMemo)(() => (0, _destOptions.createDestCurr)(t), [t]);
  const isAccount = destination === 'Account';
  const isDestError = isAccount && destBalance && destBalance.accountId.eq(destAccount) && destBalance.freeBalance.isZero();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    header: t('Bonding Preferences'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The stash and controller pair as linked. This operation will be performed via the controller.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          defaultValue: stashId,
          isDisabled: true,
          label: t('stash account')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          defaultValue: controllerId,
          help: t('The controller is the account that is be used to control any nominating or validating actions. I will sign this transaction.'),
          isDisabled: true,
          label: t('controller account')
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('All rewards will go towards the selected output destination when a payout is made.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
          defaultValue: defaultDestination === null || defaultDestination === void 0 ? void 0 : defaultDestination.toString(),
          help: t('The destination account for any payments as either a nominator or validator'),
          label: t('payment destination'),
          onChange: setDestination,
          options: options,
          value: destination
        }), isAccount && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          help: t('An account that is to receive the rewards'),
          label: t('the payment account'),
          onChange: setDestAccount,
          type: "account",
          value: destAccount
        }), isDestError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
          content: t('The selected destination account does not exist and cannot be used to receive rewards')
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: controllerId,
        icon: "sign-in-alt",
        isDisabled: !controllerId || isAccount && (!destAccount || isDestError),
        label: t('Set reward destination'),
        onStart: onClose,
        params: [isAccount ? {
          Account: destAccount
        } : destination],
        tx: api.tx.staking.setPayee
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SetRewardDestination);

exports.default = _default;