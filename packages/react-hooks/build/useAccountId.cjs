"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccountId = useAccountId;

var _react = require("react");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useAccountId() {
  let initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  let onChangeAccountId = arguments.length > 1 ? arguments[1] : undefined;
  const [accountId, setAccountId] = (0, _react.useState)(initialValue);

  const _setAccountId = (0, _react.useCallback)(function () {
    let accountId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    setAccountId(accountId);
    onChangeAccountId && onChangeAccountId(accountId);
  }, [onChangeAccountId]);

  return [accountId, _setAccountId];
}