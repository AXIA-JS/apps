// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function DayTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: now.toLocaleTimeString().split(':').slice(0, 2).join(':')
  });
}

export default /*#__PURE__*/React.memo(DayTime);