"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useElementPosition = useElementPosition;

var _react = require("react");

var _useScroll = require("@axia-js/react-hooks/useScroll");

var _useWindowSize = require("@axia-js/react-hooks/useWindowSize");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useElementPosition(ref) {
  const [elementPosition, setElementPosition] = (0, _react.useState)();
  const windowSize = (0, _useWindowSize.useWindowSize)();
  const scrollY = (0, _useScroll.useScroll)();
  (0, _react.useEffect)(() => {
    if (ref && ref.current) {
      var _ref$current;

      const {
        height,
        width,
        x,
        y
      } = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect();
      setElementPosition({
        height,
        width,
        x,
        y
      });
    }
  }, [ref, scrollY, windowSize]);
  return elementPosition;
}