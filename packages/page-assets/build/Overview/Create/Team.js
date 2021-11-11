// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { InputAddress, Modal } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Team({
  accountId,
  className = '',
  defaultValue,
  onChange
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [initial] = useState(() => defaultValue);
  const [adminId, setAdminId] = useState(null);
  const [freezerId, setFreezerId] = useState(null);
  const [issuerId, setIssuerId] = useState(null);
  useEffect(() => {
    onChange(adminId && freezerId && issuerId ? {
      adminId,
      freezerId,
      issuerId
    } : null);
  }, [api, adminId, freezerId, issuerId, onChange]);
  return /*#__PURE__*/_jsxs(Modal.Content, {
    className: className,
    children: [/*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The account that is to be used for ongoing admin on the token.'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: (initial === null || initial === void 0 ? void 0 : initial.adminId) || accountId,
        label: t('admin account'),
        onChange: setAdminId,
        type: "account"
      })
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The account that is to be used for issuing this token.'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: (initial === null || initial === void 0 ? void 0 : initial.issuerId) || accountId,
        label: t('issuer account'),
        onChange: setIssuerId,
        type: "account"
      })
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The account that is to be used for performing freezing.'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: (initial === null || initial === void 0 ? void 0 : initial.freezerId) || accountId,
        label: t('freezer account'),
        onChange: setFreezerId,
        type: "account"
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Team);