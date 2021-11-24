// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { BatchWarning, Button, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import BondPartial from "./partials/Bond.js";
import SessionKeyPartial from "./partials/SessionKey.js";
import ValidatePartial from "./partials/Validate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const NUM_STEPS = 2;

function NewValidator({
  isInElection,
  targets
}) {
  var _api$tx$utility;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [{
    bondOwnTx,
    bondTx,
    controllerId,
    controllerTx,
    stashId
  }, setBondInfo] = useState({});
  const [{
    sessionTx
  }, setSessionInfo] = useState({});
  const [{
    validateTx
  }, setValidateInfo] = useState({});
  const [step, setStep] = useState(1);
  const isDisabled = isInElection || !isFunction((_api$tx$utility = api.tx.utility) === null || _api$tx$utility === void 0 ? void 0 : _api$tx$utility.batch);

  const _nextStep = useCallback(() => setStep(step => step + 1), []);

  const _prevStep = useCallback(() => setStep(step => step - 1), []);

  const _toggle = useCallback(() => {
    setBondInfo({});
    setSessionInfo({});
    setValidateInfo({});
    setStep(1);
    toggleVisible();
  }, [toggleVisible]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: isDisabled,
      label: t('Validator'),
      onClick: _toggle
    }, 'new-validator'), isVisible && /*#__PURE__*/_jsxs(Modal, {
      header: t('Setup Validator {{step}}/{{NUM_STEPS}}', {
        replace: {
          NUM_STEPS,
          step
        }
      }),
      onClose: _toggle,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [step === 1 && /*#__PURE__*/_jsx(BondPartial, {
          minValidatorBond: targets.minValidatorBond,
          onChange: setBondInfo
        }), controllerId && stashId && step === 2 && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(SessionKeyPartial, {
            controllerId: controllerId,
            onChange: setSessionInfo,
            stashId: stashId,
            withFocus: true
          }), /*#__PURE__*/_jsx(ValidatePartial, {
            controllerId: controllerId,
            onChange: setValidateInfo,
            stashId: stashId
          })]
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          children: /*#__PURE__*/_jsx(BatchWarning, {})
        })]
      }), /*#__PURE__*/_jsxs(Modal.Actions, {
        children: [/*#__PURE__*/_jsx(Button, {
          icon: "step-backward",
          isDisabled: step === 1,
          label: t('prev'),
          onClick: _prevStep
        }), step === NUM_STEPS ? /*#__PURE__*/_jsx(TxButton, {
          accountId: stashId,
          icon: "sign-in-alt",
          isDisabled: !bondTx || !sessionTx || !validateTx,
          label: t('Bond & Validate'),
          onStart: _toggle,
          params: [controllerId === stashId ? [bondTx, sessionTx, validateTx] : [bondOwnTx, sessionTx, validateTx, controllerTx]],
          tx: api.tx.utility.batchAll || api.tx.utility.batch
        }) : /*#__PURE__*/_jsx(Button, {
          icon: "step-forward",
          isDisabled: !bondTx,
          label: t('next'),
          onClick: _nextStep
        })]
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(NewValidator);