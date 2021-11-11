"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function PaymentInfo({
  accountId,
  className = '',
  extrinsic
}) {
  var _api$derive$balances, _api$tx$balances;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [dispatchInfo, setDispatchInfo] = (0, _react.useState)(null);
  const balances = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [accountId]);
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  (0, _react.useEffect)(() => {
    var _api$rpc$payment;

    accountId && extrinsic && (0, _util.isFunction)(extrinsic.paymentInfo) && (0, _util.isFunction)((_api$rpc$payment = api.rpc.payment) === null || _api$rpc$payment === void 0 ? void 0 : _api$rpc$payment.queryInfo) && setTimeout(() => {
      try {
        extrinsic.paymentInfo(accountId).then(info => mountedRef.current && setDispatchInfo(info)).catch(console.error);
      } catch (error) {
        console.error(error);
      }
    }, 0);
  }, [api, accountId, extrinsic, mountedRef]);

  if (!dispatchInfo || !extrinsic) {
    return null;
  }

  const isFeeError = api.consts.balances && !((_api$tx$balances = api.tx.balances) !== null && _api$tx$balances !== void 0 && _api$tx$balances.transfer.is(extrinsic)) && (balances === null || balances === void 0 ? void 0 : balances.accountId.eq(accountId)) && (balances.availableBalance.lte(dispatchInfo.partialFee) || balances.freeBalance.sub(dispatchInfo.partialFee).lte(api.consts.balances.existentialDeposit));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      className: className,
      summary: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactI18next.Trans, {
        i18nKey: "feesForSubmission",
        children: ["Fees of ", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "highlight",
          children: (0, _util.formatBalance)(dispatchInfo.partialFee, {
            withSiFull: true
          })
        }), " will be applied to the submission"]
      })
    }), isFeeError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
      content: t('The account does not have enough free funds (excluding locked/bonded/reserved) available to cover the transaction fees without dropping the balance below the account existential amount.')
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(PaymentInfo);

exports.default = _default;