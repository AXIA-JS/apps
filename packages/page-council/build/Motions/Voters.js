// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressMini, Expander } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Voters({
  isAye,
  members,
  threshold,
  votes
}) {
  const {
    t
  } = useTranslation();
  const count = useMemo(() => {
    const num = threshold.toNumber();
    const max = isAye ? num : members !== null && members !== void 0 && members.length ? members.length - num + 1 : 0;
    return `${votes.length}${max ? `/${max}` : ''}`;
  }, [isAye, members, threshold, votes]);

  if (!count || !votes.length) {
    return null;
  }

  return /*#__PURE__*/_jsx(Expander, {
    summary: isAye ? t('Aye {{count}}', {
      replace: {
        count
      }
    }) : t('Nay {{count}}', {
      replace: {
        count
      }
    }),
    children: votes.map(address => /*#__PURE__*/_jsx(AddressMini, {
      value: address,
      withBalance: false
    }, address.toString()))
  });
}

export default /*#__PURE__*/React.memo(Voters);