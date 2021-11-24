"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _useProxies = require("../useProxies.cjs");

var _BidAdd = _interopRequireDefault(require("./BidAdd.cjs"));

var _Queues = _interopRequireDefault(require("./Queues.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _useInfo = _interopRequireDefault(require("./useInfo.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview(_ref) {
  let {
    className
  } = _ref;
  const proxies = (0, _useProxies.useProxies)();
  const {
    info
  } = (0, _useInfo.default)();
  const isDisabled = (0, _react.useMemo)(() => !info || !info.activeTotal || info.activeTotal.target.isZero(), [info]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      activeTotal: info === null || info === void 0 ? void 0 : info.activeTotal,
      isDisabled: isDisabled
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BidAdd.default, {
        isDisabled: isDisabled,
        proxies: proxies
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Queues.default, {
      queueTotals: info === null || info === void 0 ? void 0 : info.queueTotals
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;