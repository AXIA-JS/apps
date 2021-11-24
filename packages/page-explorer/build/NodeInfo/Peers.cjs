"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Peers(_ref) {
  let {
    className = '',
    peers
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const headerRef = (0, _react.useRef)([[t('connected peers'), 'start'], [t('role'), 'start'], [t('best #'), 'number'], [t('best hash'), 'hash']]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: t('no peers connected'),
    header: headerRef.current,
    children: peers === null || peers === void 0 ? void 0 : peers.sort((a, b) => b.bestNumber.cmp(a.bestNumber)).map(peer => /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "hash",
        children: peer.peerId.toString()
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: peer.roles.toString().toLowerCase()
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number all",
        children: (0, _util.formatNumber)(peer.bestNumber)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "hash",
        children: peer.bestHash.toHex()
      })]
    }, peer.peerId.toString()))
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Peers).withConfig({
  displayName: "Peers",
  componentId: "sc-1nlo0kw-0"
})(["overflow-x:auto;"]));

exports.default = _default;