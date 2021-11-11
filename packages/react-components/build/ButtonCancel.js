// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Button from "./Button/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ButtonCancel({
  className = '',
  isDisabled,
  label,
  onClick,
  tabIndex
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsx(Button, {
    className: className,
    icon: "times",
    isDisabled: isDisabled,
    label: label || t('Cancel'),
    onClick: onClick,
    tabIndex: tabIndex
  });
}

export default /*#__PURE__*/React.memo(ButtonCancel);