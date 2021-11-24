// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, InputAddressSimple } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Validator from "./Validator.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Query({
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    value
  } = useParams();
  const [validatorId, setValidatorId] = useState(value || null);

  const _onQuery = useCallback(() => {
    if (validatorId) {
      window.location.hash = `/staking/query/${validatorId}`;
    }
  }, [validatorId]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(InputAddressSimple, {
      className: "staking--queryInput",
      defaultValue: value,
      help: t('Display overview information for the selected validator, including blocks produced.'),
      label: t('validator to query'),
      onChange: setValidatorId,
      onEnter: _onQuery,
      children: /*#__PURE__*/_jsx(Button, {
        icon: "play",
        isDisabled: !validatorId,
        onClick: _onQuery
      })
    }), value && /*#__PURE__*/_jsx(Validator, {
      validatorId: value
    })]
  });
}

export default /*#__PURE__*/React.memo(Query);