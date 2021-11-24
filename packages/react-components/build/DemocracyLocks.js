// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBestNumber } from '@axia-js/react-hooks';
import { BlockToTime, FormatBalance } from '@axia-js/react-query';
import { BN_ZERO, bnMax, formatBalance, formatNumber } from '@axia-js/util';
import Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";
import { useTranslation } from "./translate.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
let id = 0; // group by header & details
//   - all unlockable together
//   - all ongoing together
//   - unlocks are displayed individually

function groupLocks(t, bestNumber, locks = []) {
  return {
    maxBalance: bnMax(...locks.map(({
      balance
    }) => balance).filter(b => !!b)),
    sorted: locks.map(info => [info, info.unlockAt && info.unlockAt.gt(bestNumber) ? info.unlockAt.sub(bestNumber) : BN_ZERO]).sort((a, b) => (a[0].referendumId || BN_ZERO).cmp(b[0].referendumId || BN_ZERO)).sort((a, b) => a[1].cmp(b[1])).sort((a, b) => a[0].isFinished === b[0].isFinished ? 0 : a[0].isFinished ? -1 : 1).reduce((sorted, [{
      balance,
      isDelegated,
      isFinished = false,
      referendumId,
      vote
    }, blocks]) => {
      const isCountdown = blocks.gt(BN_ZERO);
      const header = referendumId && vote ? /*#__PURE__*/_jsxs("div", {
        children: ["#", referendumId.toString(), " ", formatBalance(balance, {
          forceUnit: '-'
        }), " ", vote.conviction.toString(), isDelegated && '/d']
      }) : /*#__PURE__*/_jsx("div", {
        children: t('Prior locked voting')
      });
      const prev = sorted.length ? sorted[sorted.length - 1] : null;

      if (!prev || isCountdown || isFinished !== prev.isFinished) {
        sorted.push({
          details: /*#__PURE__*/_jsx("div", {
            className: "faded",
            children: isCountdown ? /*#__PURE__*/_jsx(BlockToTime, {
              label: `${t('{{blocks}} blocks', {
                replace: {
                  blocks: formatNumber(blocks)
                }
              })}, `,
              value: blocks
            }) : isFinished ? t('lock expired') : t('ongoing referendum')
          }),
          headers: [header],
          isCountdown,
          isFinished
        });
      } else {
        prev.headers.push(header);
      }

      return sorted;
    }, [])
  };
}

function DemocracyLocks({
  className = '',
  value
}) {
  const {
    t
  } = useTranslation();
  const bestNumber = useBestNumber();
  const [trigger] = useState(() => `${Date.now()}-democracy-locks-${++id}`);
  const [{
    maxBalance,
    sorted
  }, setState] = useState({
    maxBalance: BN_ZERO,
    sorted: []
  });
  useEffect(() => {
    bestNumber && setState(state => {
      const newState = groupLocks(t, bestNumber, value); // only update when the structure of new is different
      //   - it has a new overall breakdown with sections
      //   - one of the sections has a different number of headers

      return state.sorted.length !== newState.sorted.length || state.sorted.some((s, i) => s.headers.length !== newState.sorted[i].headers.length) ? newState : state;
    });
  }, [bestNumber, t, value]);

  if (!sorted.length) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(FormatBalance, {
      labelPost: /*#__PURE__*/_jsx(Icon, {
        icon: "clock",
        tooltip: trigger
      }),
      value: maxBalance
    }), /*#__PURE__*/_jsx(Tooltip, {
      text: sorted.map(({
        details,
        headers
      }, index) => /*#__PURE__*/_jsxs("div", {
        className: "row",
        children: [headers.map((header, index) => /*#__PURE__*/_jsx("div", {
          children: header
        }, index)), /*#__PURE__*/_jsx("div", {
          className: "faded",
          children: details
        })]
      }, index)),
      trigger: trigger
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(DemocracyLocks).withConfig({
  displayName: "DemocracyLocks",
  componentId: "sc-1bi2068-0"
})(["white-space:nowrap;.ui--FormatBalance{display:inline-block;}"]));