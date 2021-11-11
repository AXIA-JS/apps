"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _index = require("./hooks/index.cjs");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2020 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary({
  activeBounties,
  className = ''
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    bestNumber,
    bounties,
    bountyIndex
  } = (0, _index.useBounties)();
  const {
    spendPeriod
  } = (0, _reactHooks.useTreasury)();
  const totalValue = (0, _react.useMemo)(() => (bounties || []).reduce((total, {
    bounty: {
      value
    }
  }) => total.iadd(value), new _bn.default(0)), [bounties]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    className: `ui--BountySummary ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('active'),
        children: activeBounties
      }), activeBounties !== undefined && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('past'),
        children: bountyIndex === null || bountyIndex === void 0 ? void 0 : bountyIndex.subn(activeBounties).toString()
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('active total'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: totalValue,
          withSi: true
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: bestNumber && spendPeriod.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('funding period'),
        progress: {
          total: spendPeriod,
          value: bestNumber.mod(spendPeriod),
          withTime: true
        }
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;