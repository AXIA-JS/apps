"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _useEraBlocks = _interopRequireDefault(require("./useEraBlocks.cjs"));

var _util = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Stash({
  className = '',
  payout: {
    available,
    rewards,
    stashId
  }
}) {
  const [{
    eraStr,
    oldestEra
  }, setEraInfo] = (0, _react.useState)({
    eraStr: ''
  });
  const eraBlocks = (0, _useEraBlocks.default)(oldestEra);
  (0, _react.useEffect)(() => {
    var _rewards$;

    rewards && setEraInfo({
      eraStr: (0, _util.createErasString)(rewards.map(({
        era
      }) => era)),
      oldestEra: (_rewards$ = rewards[0]) === null || _rewards$ === void 0 ? void 0 : _rewards$.era
    });
  }, [rewards]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      colSpan: 2,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: stashId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "payout-eras",
        children: eraStr
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: available
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: eraBlocks && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
        value: eraBlocks
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      colSpan: 3
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Stash);

exports.default = _default;