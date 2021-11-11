"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _translate = require("../translate.cjs");

var _BidType = _interopRequireDefault(require("./BidType.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BidRow({
  index,
  value: {
    kind,
    value,
    who
  }
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const isBidder = (0, _react.useMemo)(() => {
    const address = who.toString();
    return allAccounts.some(accountId => accountId === address);
  }, [allAccounts, who]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address all",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: who
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BidType.default, {
      value: kind
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: value
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: who,
        icon: "times",
        isDisabled: !isBidder,
        label: t('Unbid'),
        params: [index],
        tx: api.tx.society.unbid
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BidRow);

exports.default = _default;