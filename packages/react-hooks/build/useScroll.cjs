"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScroll = useScroll;

var _react = require("react");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useScroll() {
  const [scrollY, setScrollY] = (0, _react.useState)(window.pageYOffset);
  const setYOffset = (0, _react.useCallback)(() => setScrollY(window.pageYOffset), []);
  (0, _react.useEffect)(() => {
    function watchScroll() {
      window.addEventListener('scroll', setYOffset);
    }

    watchScroll();
    return () => {
      window.removeEventListener('scroll', setYOffset);
    };
  }, [setYOffset]);
  return scrollY;
}