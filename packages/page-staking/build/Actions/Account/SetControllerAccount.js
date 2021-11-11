// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import InputValidationController from "./InputValidationController.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SetControllerAccount({
  defaultControllerId,
  onClose,
  stashId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isFatal, setIsFatal] = useState(false);
  const [controllerId, setControllerId] = useState(null);

  const _setError = useCallback((_, isFatal) => setIsFatal(isFatal), []);

  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Change controller account'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The stash account that is used. This will allow the controller to perform all non-funds related operations on behalf of the account.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          isDisabled: true,
          label: t('stash account'),
          value: stashId
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The selected controller tied to this stash. Once set, this account will be able to control the actions performed by the stash account.'),
        children: [/*#__PURE__*/_jsx(InputAddress, {
          defaultValue: defaultControllerId,
          help: t('The controller is the account that will be used to control any nominating or validating actions. Should not match another stash or controller.'),
          label: t('controller account'),
          onChange: setControllerId,
          type: "account",
          value: controllerId
        }), /*#__PURE__*/_jsx(InputValidationController, {
          accountId: stashId,
          controllerId: controllerId,
          defaultController: defaultControllerId,
          onError: _setError
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: stashId,
        icon: "sign-in-alt",
        isDisabled: !controllerId || isFatal,
        label: t('Set controller'),
        onStart: onClose,
        params: [controllerId],
        tx: api.tx.staking.setController
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(SetControllerAccount);