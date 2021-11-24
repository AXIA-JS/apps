"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _Event = _interopRequireDefault(require("./Event.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Events(_ref) {
  let {
    className = '',
    emptyLabel,
    eventClassName,
    events,
    label
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const header = (0, _react.useMemo)(() => [[label || t('recent events'), 'start']], [label, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: emptyLabel || t('No events available'),
    header: header,
    children: events && events.map(_ref2 => {
      let {
        blockHash,
        blockNumber,
        indexes,
        key,
        record
      } = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
        className: eventClassName,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
          className: "overflow",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Event.default, {
            value: record
          }), blockNumber && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "event-link",
            children: [indexes.length !== 1 && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
              children: ["(", (0, _util.formatNumber)(indexes.length), "x)\xA0"]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Link, {
              to: `/explorer/query/${blockHash || ''}`,
              children: [(0, _util.formatNumber)(blockNumber), "-", indexes[0]]
            })]
          })]
        })
      }, key);
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Events).withConfig({
  displayName: "Events",
  componentId: "sc-1kdronr-0"
})(["td.overflow{position:relative;.event-link{position:absolute;right:0.75rem;top:0.5rem;}}"]));

exports.default = _default;