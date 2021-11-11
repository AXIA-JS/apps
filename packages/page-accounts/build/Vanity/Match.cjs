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

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Match({
  address,
  className = '',
  count,
  offset,
  onCreateToggle,
  onRemove,
  seed
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const hexSeed = (0, _react.useMemo)(() => (0, _util.u8aToHex)(seed), [seed]);

  const _onCreate = (0, _react.useCallback)(() => onCreateToggle(hexSeed), [hexSeed, onCreateToggle]);

  const _onRemove = (0, _react.useCallback)(() => onRemove(address), [address, onRemove]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      colSpan: 2,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.IdentityIcon, {
        className: "vanity--Match-icon",
        value: address
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address all",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "vanity--Match-addr",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "no",
          children: address.slice(0, offset)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "yes",
          children: address.slice(offset, count + offset)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "no",
          children: address.slice(count + offset)
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "hash",
      children: hexSeed
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "button",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        label: t('Save'),
        onClick: _onCreate
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "times",
        onClick: _onRemove
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Match).withConfig({
  displayName: "Match",
  componentId: "sc-1su64a0-0"
})(["text-align:center;&:hover{background:#f9f8f7;}.vanity--Match-addr{font-size:1.1rem;.no{color:inherit;}.yes{color:red;}}.vanity--Match-buttons,.vanity--Match-data,.vanity--Match-icon{display:inline-block;vertical-align:middle;}.vanity--Match-item{display:inline-block;font:var(--font-mono);margin:0 auto;padding:0.5em;position:relative;}.vanity--Match-seed{opacity:0.45;padding:0 1rem;}"]));

exports.default = _default;