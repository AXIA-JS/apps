// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { getTeleportWeight } from '@axia-js/apps-config';
import { ChainImg, Dropdown, InputAddress, InputBalance, MarkWarning, Modal, Spinner, TxButton } from '@axia-js/react-components';
import { useApi, useApiUrl, useTeleport, useWeightFee } from '@axia-js/react-hooks';
import { Available } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const INVALID_PARAID = Number.MAX_SAFE_INTEGER;

function createOption({
  info,
  paraId,
  text
}) {
  return {
    text: /*#__PURE__*/_jsxs("div", {
      className: "ui--Dropdown-item",
      children: [/*#__PURE__*/_jsx(ChainImg, {
        className: "ui--Dropdown-icon",
        logo: info
      }), /*#__PURE__*/_jsx("div", {
        className: "ui--Dropdown-name",
        children: text
      })]
    }, paraId),
    value: paraId || -1
  };
}

function Teleport({
  onClose
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [amount, setAmount] = useState(BN_ZERO);
  const [recipientId, setRecipientId] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [recipientParaId, setParaId] = useState(INVALID_PARAID);
  const {
    allowTeleport,
    destinations,
    isParaTeleport,
    oneWay
  } = useTeleport();
  const destWeight = useMemo(() => getTeleportWeight(api), [api]);
  const chainOpts = useMemo(() => destinations.map(createOption), [destinations]);
  const url = useMemo(() => {
    var _destinations$find;

    return (_destinations$find = destinations.find(({
      paraId
    }, index) => recipientParaId === -1 ? index === 0 : recipientParaId === paraId)) === null || _destinations$find === void 0 ? void 0 : _destinations$find.value;
  }, [destinations, recipientParaId]);
  const destApi = useApiUrl(url);
  const weightFee = useWeightFee(destWeight, destApi);
  const params = useMemo(() => isParaTeleport ? [{
    X1: 'Parent'
  }, {
    X1: {
      AccountId32: {
        id: recipientId,
        network: 'Any'
      }
    }
  }, [{
    ConcreteFungible: {
      amount,
      id: {
        X1: 'Parent'
      }
    }
  }], destWeight] : [{
    X1: {
      AllyChain: recipientParaId
    }
  }, {
    X1: {
      AccountId32: {
        id: recipientId,
        network: 'Any'
      }
    }
  }, [{
    ConcreteFungible: {
      amount,
      id: 'Here'
    }
  }], destWeight], [amount, destWeight, isParaTeleport, recipientId, recipientParaId]);
  const hasAvailable = !!amount && amount.gte(weightFee);
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Teleport assets'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The transferred balance will be subtracted (along with fees) from the sender account.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          label: t('send from account'),
          labelExtra: /*#__PURE__*/_jsx(Available, {
            label: t('transferrable'),
            params: senderId
          }),
          onChange: setSenderId,
          type: "account"
        })
      }), chainOpts.length !== 0 && /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The destination chain for this asset teleport. The transferred value will appear on this chain.'),
        children: [/*#__PURE__*/_jsx(Dropdown, {
          defaultValue: chainOpts[0].value,
          label: t('destination chain'),
          onChange: setParaId,
          options: chainOpts
        }), !isParaTeleport && oneWay.includes(recipientParaId) && /*#__PURE__*/_jsx(MarkWarning, {
          content: t('Currently this is a one-way transfer since the on-chain runtime functionality to send the funds from the destination chain back to this account not yet available.')
        })]
      }), /*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('The beneficiary will have access to the transferred amount when the transaction is included in a block.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          label: t('send to address'),
          onChange: setRecipientId,
          type: "allPlus"
        })
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("p", {
            children: t('If the recipient account is new, the balance needs to be more than the existential deposit on the recipient chain.')
          }), /*#__PURE__*/_jsx("p", {
            children: t('The amount deposited to the recipient will be net the calculated cross-chain fee.')
          })]
        }),
        children: [/*#__PURE__*/_jsx(InputBalance, {
          autoFocus: true,
          isError: !hasAvailable,
          isZeroable: true,
          label: t('amount'),
          onChange: setAmount
        }), destApi ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(InputBalance, {
            defaultValue: weightFee,
            isDisabled: true,
            label: t('destination transfer fee')
          }), /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: destApi.consts.balances.existentialDeposit,
            isDisabled: true,
            label: t('destination existential deposit')
          })]
        }) : /*#__PURE__*/_jsx(Spinner, {
          label: t('Retrieving destination chain fees'),
          variant: "appPadded"
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: senderId,
        icon: "share-square",
        isDisabled: !allowTeleport || !hasAvailable || !recipientId || !amount || !destApi || !isParaTeleport && recipientParaId === INVALID_PARAID,
        label: t('Teleport'),
        onStart: onClose,
        params: params,
        tx: api.tx.xcm && api.tx.xcm.teleportAssets || api.tx.xcmPallet && api.tx.xcmPallet.teleportAssets || api.tx.axiaXcm && api.tx.axiaXcm.teleportAssets
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Teleport);