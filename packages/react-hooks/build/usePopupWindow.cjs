"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePopupWindow = usePopupWindow;

var _react = require("react");

var _utils = require("@axia-js/react-components/Popup/utils");

var _useElementPosition = require("./useElementPosition.cjs");

var _useScroll = require("./useScroll.cjs");

var _useWindowSize = require("./useWindowSize.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function usePopupWindow(windowRef, triggerRef, position) {
  const [renderWindowPosition, setRenderWindowPosition] = (0, _react.useState)();
  const [verticalPosition, setVerticalPosition] = (0, _react.useState)();
  const windowPosition = (0, _useElementPosition.useElementPosition)(windowRef);
  const triggerPosition = (0, _useElementPosition.useElementPosition)(triggerRef);
  const scrollY = (0, _useScroll.useScroll)();
  const windowSize = (0, _useWindowSize.useWindowSize)();
  (0, _react.useEffect)(() => {
    if (windowSize && triggerPosition) {
      setVerticalPosition(triggerPosition.y > windowSize.height / 2 ? 'top' : 'bottom');
    }
  }, [triggerPosition, windowSize]);
  (0, _react.useEffect)(() => {
    if (windowPosition && triggerPosition && verticalPosition) {
      setRenderWindowPosition((0, _utils.getPosition)(triggerPosition, position, verticalPosition, windowPosition, scrollY, windowSize));
    }
  }, [position, scrollY, triggerPosition, verticalPosition, windowPosition, windowSize]);
  return {
    renderWindowPosition,
    verticalPosition
  };
}