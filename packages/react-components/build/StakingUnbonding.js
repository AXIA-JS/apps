// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BlockToTime, FormatBalance } from '@axia-js/react-query';
import { BN_ONE, BN_ZERO, formatBalance, formatNumber } from '@axia-js/util';
import Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractTotals(stakingInfo, progress) {
  if (!(stakingInfo !== null && stakingInfo !== void 0 && stakingInfo.unlocking) || !progress) {
    return [[], BN_ZERO];
  }

  const mapped = stakingInfo.unlocking.filter(({
    remainingEras,
    value
  }) => value.gt(BN_ZERO) && remainingEras.gt(BN_ZERO)).map(unlock => [unlock, unlock.remainingEras, unlock.remainingEras.sub(BN_ONE).imul(progress.eraLength).iadd(progress.eraLength).isub(progress.eraProgress)]);
  const total = mapped.reduce((total, [{
    value
  }]) => total.iadd(value), new BN(0));
  return [mapped, total];
}

function StakingUnbonding({
  className = '',
  iconPosition = 'left',
  stakingInfo
}) {
  const {
    api
  } = useApi();
  const progress = useCall(api.derive.session.progress);
  const {
    t
  } = useTranslation();
  const [mapped, total] = useMemo(() => extractTotals(stakingInfo, progress), [progress, stakingInfo]);

  if (!stakingInfo || !mapped.length) {
    return null;
  }

  const trigger = `${stakingInfo.accountId.toString()}-unlocking-trigger`;
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [iconPosition === 'left' && /*#__PURE__*/_jsx(Icon, {
      className: "left",
      icon: "clock",
      tooltip: trigger
    }), /*#__PURE__*/_jsx(FormatBalance, {
      value: total
    }), /*#__PURE__*/_jsx(Tooltip, {
      text: mapped.map(([{
        value
      }, eras, blocks], index) => {
        var _api$consts$babe;

        return /*#__PURE__*/_jsxs("div", {
          className: "row",
          children: [/*#__PURE__*/_jsx("div", {
            children: t('Unbonding {{value}}', {
              replace: {
                value: formatBalance(value, {
                  forceUnit: '-'
                })
              }
            })
          }), /*#__PURE__*/_jsx("div", {
            className: "faded",
            children: (_api$consts$babe = api.consts.babe) !== null && _api$consts$babe !== void 0 && _api$consts$babe.epochDuration ? /*#__PURE__*/_jsx(BlockToTime, {
              label: `${t('{{blocks}} blocks', {
                replace: {
                  blocks: formatNumber(blocks)
                }
              })}, `,
              value: blocks
            }) : t('{{eras}} eras remaining', {
              replace: {
                eras: formatNumber(eras)
              }
            })
          })]
        }, index);
      }),
      trigger: trigger
    }), iconPosition === 'right' && /*#__PURE__*/_jsx(Icon, {
      className: "right",
      icon: "clock",
      tooltip: trigger
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(StakingUnbonding).withConfig({
  displayName: "StakingUnbonding",
  componentId: "sc-aleiav-0"
})(["white-space:nowrap;.ui--Icon.left{margin-left:0;margin-right:0.25rem;}.ui--Icon.right{margin-left:0.25rem;margin-right:0;}.ui--FormatBalance{display:inline-block;}"]));