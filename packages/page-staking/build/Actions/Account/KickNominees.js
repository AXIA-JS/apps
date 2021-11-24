// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import { InputAddressMulti, Modal, Spinner, TxButton } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import SenderInfo from "../partials/SenderInfo.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MAX_KICK = 128;
const accountOpts = {
  withExposure: true
};

function KickNominees({
  className = '',
  controllerId,
  nominating,
  onClose,
  stashId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [selected, setSelected] = useState([]);
  const [{
    kickTx
  }, setTx] = useState({});
  const queryInfo = useCall(api.derive.staking.query, [stashId, accountOpts]);
  const nominators = useMemo(() => {
    var _queryInfo$exposure;

    return queryInfo === null || queryInfo === void 0 ? void 0 : (_queryInfo$exposure = queryInfo.exposure) === null || _queryInfo$exposure === void 0 ? void 0 : _queryInfo$exposure.others.map(({
      who
    }) => who.toString());
  }, [queryInfo]);
  useEffect(() => {
    try {
      setTx({
        kickTx: selected.length ? api.tx.staking.kick(selected) : null
      });
    } catch {
      setTx({
        kickTx: null
      });
    }
  }, [api, selected]);
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Remove nominees'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(SenderInfo, {
        controllerId: controllerId,
        stashId: stashId
      }), nominators ? /*#__PURE__*/_jsx(InputAddressMulti, {
        available: nominators,
        availableLabel: t('existing/active nominators'),
        defaultValue: nominating,
        help: t('Filter available nominators based on name, address or short account index.'),
        maxCount: MAX_KICK,
        onChange: setSelected,
        valueLabel: t('nominators to be removed')
      }) : /*#__PURE__*/_jsx(Spinner, {
        label: t('Retrieving active nominators')
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: controllerId,
        extrinsic: kickTx,
        icon: "user-slash",
        isDisabled: !kickTx,
        label: t('Remove'),
        onStart: onClose
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(KickNominees);