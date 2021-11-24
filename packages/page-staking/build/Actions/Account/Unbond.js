// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import styled from 'styled-components';
import { InputAddress, InputBalance, Modal, Static, Toggle, TxButton } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BlockToTime } from '@axia-js/react-query';
import { useTranslation } from "../../translate.js";
import useUnbondDuration from "../useUnbondDuration.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Unbond({
  className = '',
  controllerId,
  onClose,
  stakingLedger,
  stashId
}) {
  var _ref;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bondedBlocks = useUnbondDuration();
  const [maxBalance] = useState(() => {
    var _stakingLedger$active;

    return (stakingLedger === null || stakingLedger === void 0 ? void 0 : (_stakingLedger$active = stakingLedger.active) === null || _stakingLedger$active === void 0 ? void 0 : _stakingLedger$active.unwrap()) || null;
  });
  const [maxUnbond, setMaxUnbond] = useState(null);
  const [withMax, setWithMax] = useState(false);
  return /*#__PURE__*/_jsxs(Modal, {
    className: `staking--Unbond ${className}`,
    header: t('Unbond funds'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The stash and controller pair, here the controller will be used to send the transaction.'),
        children: [/*#__PURE__*/_jsx(InputAddress, {
          defaultValue: stashId,
          isDisabled: true,
          label: t('stash account')
        }), /*#__PURE__*/_jsx(InputAddress, {
          defaultValue: controllerId,
          isDisabled: true,
          label: t('controller account')
        })]
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The funds will only be available for withdrawal after the unbonding period, however will not be part of the staked amount after the next validator election. You can follow the unlock countdown in the UI.'),
        children: [/*#__PURE__*/_jsx(InputBalance, {
          autoFocus: true,
          defaultValue: maxBalance,
          help: t('The amount of funds to unbond, this is adjusted using the bonded funds on the stash account.'),
          isDisabled: withMax,
          label: t('unbond amount'),
          maxValue: maxBalance,
          onChange: setMaxUnbond,
          withMax: true,
          children: /*#__PURE__*/_jsx(Toggle, {
            isOverlay: true,
            label: t('all bonded'),
            onChange: setWithMax,
            value: withMax
          })
        }, `unbondAmount-${withMax.toString()}`), (bondedBlocks === null || bondedBlocks === void 0 ? void 0 : bondedBlocks.gtn(0)) && /*#__PURE__*/_jsx(Static, {
          help: t('The bonding duration for any staked funds. After this period needs to be withdrawn.'),
          label: t('on-chain bonding duration'),
          children: /*#__PURE__*/_jsx(BlockToTime, {
            value: bondedBlocks
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: controllerId,
        icon: "unlock",
        isDisabled: !((_ref = withMax ? maxBalance : maxUnbond) !== null && _ref !== void 0 && _ref.gtn(0)),
        label: t('Unbond'),
        onStart: onClose,
        params: [withMax ? maxBalance : maxUnbond],
        tx: api.tx.staking.unbond
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Unbond).withConfig({
  displayName: "Unbond",
  componentId: "sc-1pwkkej-0"
})([".staking--Unbond--max > div{justify-content:flex-end;& .column{flex:0;}}"]));