"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _MaxBadge = _interopRequireDefault(require("../../MaxBadge.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const NO_NOMS = [];

function Status(_ref) {
  let {
    isElected,
    isMain,
    isPara,
    isRelay,
    nominators = NO_NOMS,
    onlineCount,
    onlineMessage
  } = _ref;
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const blockCount = onlineCount && onlineCount.toNumber();
  const isNominating = (0, _react.useMemo)(() => nominators.some(_ref2 => {
    let {
      nominatorId
    } = _ref2;
    return allAccounts.includes(nominatorId);
  }), [allAccounts, nominators]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [isNominating ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
      color: "green",
      icon: "hand-paper"
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
      color: "transparent"
    }), isRelay && (isPara ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
      color: "purple",
      icon: "vector-square"
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
      color: "transparent"
    })), isElected ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
      color: "blue",
      icon: "chevron-right"
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
      color: "transparent"
    }), isMain && (blockCount || onlineMessage ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
      color: "green",
      info: blockCount || /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        icon: "envelope"
      })
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
      color: "transparent"
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MaxBadge.default, {
      numNominators: nominators.length
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Status);

exports.default = _default;