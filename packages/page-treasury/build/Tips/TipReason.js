// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { hexToString } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
const transformTip = {
  transform: optBytes => optBytes.isSome ? hexToString(optBytes.unwrap().toHex()) : null
};

function TipReason({
  hash
}) {
  const {
    api
  } = useApi();
  const reasonText = useCall((api.query.tips || api.query.treasury).reasons, [hash], transformTip);
  return /*#__PURE__*/_jsx("td", {
    className: "start all",
    children: reasonText || hash.toHex()
  });
}

export default /*#__PURE__*/React.memo(TipReason);