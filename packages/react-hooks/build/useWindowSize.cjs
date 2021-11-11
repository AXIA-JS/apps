"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowSize = useWindowSize;

var _react = require("react");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useWindowSize() {
  const [windowSize, setWindowSize] = (0, _react.useState)({
    height: 0,
    width: 0
  });
  (0, _react.useEffect)(() => {
    function handleResize() {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}