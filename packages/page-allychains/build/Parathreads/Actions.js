// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import { useApi, useCall, useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { LOWEST_PUBLIC_ID } from "./constants.js";
import RegisterId from "./RegisterId.js";
import RegisterThread from "./RegisterThread.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const transformId = {
  transform: nextId => nextId.isZero() ? LOWEST_PUBLIC_ID : nextId
};

function Actions({
  className,
  ownedIds
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isRegisterOpen, toggleRegisterOpen] = useToggle();
  const [isReserveOpen, toggleReserveOpen] = useToggle();
  const nextParaId = useCall(api.query.registrar.nextFreeParaId, [], transformId);
  return /*#__PURE__*/_jsxs(Button.Group, {
    className: className,
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !api.tx.registrar.reserve,
      label: t('ParaId'),
      onClick: toggleReserveOpen
    }), isReserveOpen && /*#__PURE__*/_jsx(RegisterId, {
      nextParaId: nextParaId,
      onClose: toggleReserveOpen
    }), /*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: api.tx.registrar.reserve ? !ownedIds.length : false,
      label: t('ParaThread'),
      onClick: toggleRegisterOpen
    }), isRegisterOpen && /*#__PURE__*/_jsx(RegisterThread, {
      nextParaId: nextParaId,
      onClose: toggleRegisterOpen,
      ownedIds: ownedIds
    })]
  });
}

export default /*#__PURE__*/React.memo(Actions);