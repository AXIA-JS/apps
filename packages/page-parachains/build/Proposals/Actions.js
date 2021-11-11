// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useAccounts, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import Propose from "./Propose.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Actions() {
  const {
    t
  } = useTranslation();
  const {
    hasAccounts
  } = useAccounts();
  const [showPropose, togglePropose] = useToggle();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "plus",
        isDisabled: !hasAccounts,
        label: t('Propose'),
        onClick: togglePropose
      })
    }), showPropose && /*#__PURE__*/_jsx(Propose, {
      onClose: togglePropose
    })]
  });
}

export default /*#__PURE__*/React.memo(Actions);