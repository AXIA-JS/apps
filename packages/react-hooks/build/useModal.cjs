"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModal = useModal;

var _react = require("react");

var _useToggle = require("./useToggle.cjs");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useModal(defaultIsOpen, onOpen, onClose) {
  const [isOpen,, setIsOpen] = (0, _useToggle.useToggle)(defaultIsOpen || false);

  const _onOpen = (0, _react.useCallback)(() => {
    setIsOpen(true);
    onOpen && onOpen();
  }, [onOpen, setIsOpen]);

  const _onClose = (0, _react.useCallback)(() => {
    setIsOpen(false);
    onClose && onClose();
  }, [onClose, setIsOpen]);

  return {
    isOpen,
    onClose: _onClose,
    onOpen: _onOpen
  };
}