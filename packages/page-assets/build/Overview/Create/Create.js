// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { Button, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useStepper, useTxBatch } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import Info from "./Info.js";
import Team from "./Team.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const BATCH_OPTIONS = {
  isBatchAll: true
};

function Create({
  assetIds,
  className,
  onClose,
  openId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [step, nextStep, prevStep] = useStepper();
  const [asset, setAsset] = useState(null);
  const [team, setTeam] = useState(null);
  const [createTx, metadataTx] = useMemo(() => asset ? [api.tx.assets.create(asset.assetId, asset.accountId, asset.minBalance), api.tx.assets.setMetadata(asset.assetId, asset.assetName, asset.assetSymbol, asset.assetDecimals)] : [null, null], [api, asset]);
  const teamTx = useMemo(() => asset && team && (team.adminId !== asset.accountId || team.freezerId !== asset.accountId || team.issuerId !== asset.accountId) ? api.tx.assets.setTeam(asset.assetId, team.issuerId, team.adminId, team.freezerId) : null, [api, asset, team]);
  const txs = useMemo(() => createTx && metadataTx && team && (teamTx ? [createTx, metadataTx, teamTx] : [createTx, metadataTx]), [createTx, metadataTx, team, teamTx]);
  const extrinsic = useTxBatch(txs, BATCH_OPTIONS);
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('create asset {{step}}/{{steps}}', {
      replace: {
        step,
        steps: 2
      }
    }),
    onClose: onClose,
    size: "large",
    children: [step === 1 && /*#__PURE__*/_jsx(Info, {
      assetIds: assetIds,
      defaultValue: asset,
      onChange: setAsset,
      openId: openId
    }), step === 2 && asset && /*#__PURE__*/_jsx(Team, {
      accountId: asset.accountId,
      defaultValue: team,
      onChange: setTeam
    }), /*#__PURE__*/_jsxs(Modal.Actions, {
      children: [step === 1 && /*#__PURE__*/_jsx(Button, {
        icon: "step-forward",
        isDisabled: !asset,
        label: t('Next'),
        onClick: nextStep
      }), step === 2 && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Button, {
          icon: "step-backward",
          label: t('Prev'),
          onClick: prevStep
        }), /*#__PURE__*/_jsx(TxButton, {
          accountId: asset === null || asset === void 0 ? void 0 : asset.accountId,
          extrinsic: extrinsic,
          icon: "plus",
          label: t('Create'),
          onStart: onClose
        })]
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Create);