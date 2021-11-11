"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Row({
  index,
  isSelected,
  onSelect,
  slash: {
    isMine,
    slash: {
      others,
      own,
      payout,
      reporters,
      validator
    },
    total,
    totalOther
  }
}) {
  const {
    t
  } = (0, _translate.useTranslation)();

  const _onSelect = (0, _react.useCallback)(() => onSelect && onSelect(index), [index, onSelect]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: isMine && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "red",
        icon: "skull-crossbones"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: validator
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "expand all",
      children: !!others.length && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        summary: t('Nominators ({{count}})', {
          replace: {
            count: (0, _util.formatNumber)(others.length)
          }
        }),
        children: others.map(([accountId, balance], index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
          balance: balance,
          value: accountId,
          withBalance: true
        }, index))
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: reporters.map((reporter, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: reporter
      }, index))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: own
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: totalOther
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: total
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: payout
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Checkbox, {
        isDisabled: !onSelect,
        onChange: _onSelect,
        value: isSelected
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Row);

exports.default = _default;