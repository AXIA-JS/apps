// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import Elapsed from "./Elapsed.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function TimeNow({
  children,
  className = '',
  label,
  value
}) {
  var _api$query$timestamp;

  const {
    api
  } = useApi();
  const timestamp = useCall(!value && ((_api$query$timestamp = api.query.timestamp) === null || _api$query$timestamp === void 0 ? void 0 : _api$query$timestamp.now));
  const [now, setNow] = useState();
  useEffect(() => {
    setNow(value || timestamp);
  }, [timestamp, value]);

  if (!now) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', /*#__PURE__*/_jsx(Elapsed, {
      value: now
    }), children]
  });
}

export default /*#__PURE__*/React.memo(TimeNow);