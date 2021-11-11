"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccountId = useAccountId;

var _react = require("react");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useAccountId(initialValue = null, onChangeAccountId) {
  const [accountId, setAccountId] = (0, _react.useState)(initialValue);

  const _setAccountId = (0, _react.useCallback)((accountId = null) => {
    setAccountId(accountId);
    onChangeAccountId && onChangeAccountId(accountId);
  }, [onChangeAccountId]);

  return [accountId, _setAccountId];
}