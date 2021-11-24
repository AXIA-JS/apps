// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useAccounts, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import Create from "./Create.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function CreateButton({
  assetIds,
  className,
  openId
}) {
  const {
    t
  } = useTranslation();
  const {
    hasAccounts
  } = useAccounts();
  const [isOpen, toggleOpen] = useToggle();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !assetIds || !hasAccounts,
      label: t('Create'),
      onClick: toggleOpen
    }), isOpen && assetIds && /*#__PURE__*/_jsx(Create, {
      assetIds: assetIds,
      className: className,
      onClose: toggleOpen,
      openId: openId
    })]
  });
}

export default /*#__PURE__*/React.memo(CreateButton);