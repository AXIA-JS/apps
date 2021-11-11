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

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractEventDetails(events) {
  return events ? events.reduce(([deposits, transfers, weight], {
    record: {
      event: {
        data,
        method,
        section
      }
    }
  }) => [section === 'balances' && method === 'Deposit' ? deposits.iadd(data[1]) : deposits, section === 'balances' && method === 'Transfer' ? transfers.iadd(data[2]) : transfers, section === 'system' && ['ExtrinsicFailed', 'ExtrinsicSuccess'].includes(method) ? weight.iadd((method === 'ExtrinsicSuccess' ? data[0] : data[1]).weight) : weight], [new _bn.default(0), new _bn.default(0), new _bn.default(0)]) : [];
}

function Summary({
  events,
  maxBlockWeight,
  signedBlock
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [deposits, transfers, weight] = (0, _react.useMemo)(() => extractEventDetails(events), [events]);

  if (!events || !signedBlock) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: api.query.balances && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('deposits'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
            value: deposits
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('transfers'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
            value: transfers
          })
        })]
      })
    }), maxBlockWeight && /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('block weight'),
        progress: {
          hideValue: true,
          total: maxBlockWeight,
          value: weight
        },
        children: (0, _util.formatNumber)(weight)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('event count'),
        children: (0, _util.formatNumber)(events.length)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('extrinsic count'),
        children: (0, _util.formatNumber)(signedBlock.block.extrinsics.length)
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;