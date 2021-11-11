// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import Modal from "./Mint.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Mint({
  className,
  details,
  id,
  metadata
}) {
  const {
    t
  } = useTranslation();
  const [isOpen, toggleOpen] = useToggle();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: metadata.isFrozen.isTrue,
      label: t('Mint'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsx(Modal, {
      className: className,
      details: details,
      id: id,
      metadata: metadata,
      onClose: toggleOpen
    })]
  });
}

export default /*#__PURE__*/React.memo(Mint);