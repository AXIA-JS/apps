"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _DayItem = _interopRequireDefault(require("./DayItem.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
function UpcomingEvents(_ref) {
  let {
    className,
    scheduled,
    setView
  } = _ref;
  const sched = (0, _react.useMemo)(() => scheduled.sort((a, b) => a.dateTime - b.dateTime), [scheduled]);

  const _setView = (0, _react.useCallback)(() => setView(false), [setView]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          className: "all-events-button",
          icon: "calendar",
          onClick: _setView
        }), "Upcoming Events"]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      className: "allEventsWrapper",
      children: sched.map((item, index) => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DayItem.default, {
          className: "all-events-rows",
          item: item,
          showAllEvents: true
        }, index);
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(UpcomingEvents).withConfig({
  displayName: "UpcomingEvents",
  componentId: "sc-4kdl7a-0"
})(["flex:0;max-width:max-content;.all-events-rows{padding:10px 0;font-size:13px;&:nth-child(odd){background:var(--bg-table);}}.allEventsWrapper{padding-inline-start:10px;}"]));

exports.default = _default;