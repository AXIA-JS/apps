// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { Dropdown, Input, InputAddress, Modal, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const JUDGEMENT_ENUM = [{
  text: 'Unknown',
  value: 0
}, {
  text: 'Fee paid',
  value: 1
}, {
  text: 'Reasonable',
  value: 2
}, {
  text: 'Known good',
  value: 3
}, {
  text: 'Out of date',
  value: 4
}, {
  text: 'Low quality',
  value: 5
}];

function RegistrarJudgement({
  address,
  registrars,
  toggleJudgement
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [addresses] = useState(() => registrars.map(({
    address
  }) => address));
  const [judgementAccountId, setJudgementAccountId] = useState(null);
  const [judgementEnum, setJudgementEnum] = useState(2); // Reasonable

  const [registrarIndex, setRegistrarIndex] = useState(-1); // find the id of our registrar in the list

  useEffect(() => {
    const registrar = registrars.find(({
      address
    }) => judgementAccountId === address);
    setRegistrarIndex(registrar ? registrar.index : -1);
  }, [judgementAccountId, registrars]);
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Provide judgement'),
    onClose: toggleJudgement,
    size: "small",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(InputAddress, {
        filter: addresses,
        label: t('registrar account'),
        onChange: setJudgementAccountId,
        type: "account"
      }), /*#__PURE__*/_jsx(Input, {
        isDisabled: true,
        label: t('registrar index'),
        value: registrarIndex === -1 ? t('invalid/unknown registrar account') : registrarIndex.toString()
      }), /*#__PURE__*/_jsx(Dropdown, {
        label: t('judgement'),
        onChange: setJudgementEnum,
        options: JUDGEMENT_ENUM,
        value: judgementEnum
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: judgementAccountId,
        icon: "check",
        isDisabled: registrarIndex === -1,
        label: t('Judge'),
        onStart: toggleJudgement,
        params: [registrarIndex, address, judgementEnum],
        tx: api.tx.identity.provideJudgement
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(RegistrarJudgement);