"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _index = _interopRequireDefault(require("./Mint/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Asset({
  className,
  value: {
    details,
    id,
    isIssuerMe,
    metadata
  }
}) {
  const format = (0, _react.useMemo)(() => metadata ? [metadata.decimals.toNumber(), metadata.symbol.toUtf8()] : [0, '---'], [metadata]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(id)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "together",
      children: metadata === null || metadata === void 0 ? void 0 : metadata.name.toUtf8()
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address media--1000",
      children: details && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: details.owner
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address media--1200",
      children: details && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: details.admin
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address media--1300",
      children: details && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: details.issuer
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address media--1400",
      children: details && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: details.freezer
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number all",
      children: details && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        format: format,
        value: details.supply
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: details && metadata && isIssuerMe && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        details: details,
        id: id,
        metadata: metadata
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Asset);

exports.default = _default;