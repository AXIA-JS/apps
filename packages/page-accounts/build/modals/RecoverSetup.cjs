"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _utilCrypto = require("@axia-js/util-crypto");

var _useKnownAddresses = _interopRequireDefault(require("../Accounts/useKnownAddresses.cjs"));

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_HELPERS = 16;

function RecoverSetup(_ref) {
  let {
    address,
    className = '',
    onClose
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const availableHelpers = (0, _useKnownAddresses.default)(address);
  const [delay, setDelay] = (0, _react.useState)();
  const [helpers, setHelpers] = (0, _react.useState)([]);
  const [threshold, setThreshold] = (0, _react.useState)();
  const isErrorDelay = !delay;
  const isErrorHelpers = !helpers.length;
  const isErrorThreshold = !threshold || !threshold.gtn(0) || threshold.gtn(helpers.length);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Setup account as recoverable'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: t('The recoverable account is protected against the loss of seed/access by a social process.'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          isDisabled: true,
          label: t('the account to make recoverable'),
          value: address
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
        hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('These are trusted individuals that can verify and approve any recovery actions. With recovery, once the threshold is reached, the funds associated with the account can be moved to a new destination.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
            children: t('The helpers should be able to verify, via an off-chain mechanism, that the account owner indeed wishes to recover access and as such provide any approvals. In the cases of malicious recovery procedures, they will have the power to stop it.')
          })]
        }),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddressMulti, {
          available: availableHelpers,
          availableLabel: t('available social recovery helpers'),
          help: t('The addresses that are able to help in recovery. You can select up to {{maxHelpers}} trusted helpers.', {
            replace: {
              maxHelpers: MAX_HELPERS
            }
          }),
          maxCount: MAX_HELPERS,
          onChange: setHelpers,
          value: helpers,
          valueLabel: t('trusted social recovery helpers')
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
        hint: t('The threshold for approvals and the delay is the protection associated with the account. The delay should be such that any colluding recovery attempts does have a window to stop.'),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
          help: t('The threshold of vouches that is to be reached for the account to be recovered.'),
          isError: isErrorThreshold,
          label: t('recovery threshold'),
          onChange: setThreshold
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
          help: t('The delay between vouching and the availability of the recovered account.'),
          isError: isErrorDelay,
          isZeroable: true,
          label: t('recovery block delay'),
          onChange: setDelay
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: address,
        icon: "share-alt",
        isDisabled: isErrorHelpers || isErrorThreshold || isErrorDelay,
        label: t('Make recoverable'),
        onStart: onClose,
        params: [(0, _utilCrypto.sortAddresses)(helpers), threshold, delay],
        tx: api.tx.recovery.createRecovery
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(RecoverSetup);

exports.default = _default;