"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToggle = useToggle;

var _react = require("react");

var _useIsMountedRef = require("./useIsMountedRef.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Simple wrapper for a true/false toggle
function useToggle(defaultValue = false, onToggle) {
  const mountedRef = (0, _useIsMountedRef.useIsMountedRef)();
  const [isActive, setActive] = (0, _react.useState)(defaultValue);

  const _toggleActive = (0, _react.useCallback)(() => {
    mountedRef.current && setActive(isActive => !isActive);
  }, [mountedRef]);

  const _setActive = (0, _react.useCallback)(isActive => {
    mountedRef.current && setActive(isActive);
  }, [mountedRef]);

  (0, _react.useEffect)(() => onToggle && onToggle(isActive), [isActive, onToggle]);
  return [isActive, _toggleActive, _setActive];
}