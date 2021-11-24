// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressMini, Expander } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractFunction(all) {
  return all.length ? [all.length, () => all.map(who => /*#__PURE__*/_jsx(AddressMini, {
    value: who
  }, who))] : null;
}

function extractChilled(nominators = [], slashingSpans) {
  const chilled = slashingSpans ? nominators.filter(({
    submittedIn
  }) => !slashingSpans.lastNonzeroSlash.isZero() && slashingSpans.lastNonzeroSlash.gte(submittedIn)).map(({
    nominatorId
  }) => nominatorId) : [];
  return {
    active: extractFunction(nominators.filter(({
      nominatorId
    }) => !chilled.includes(nominatorId)).map(({
      nominatorId
    }) => nominatorId)),
    chilled: extractFunction(chilled)
  };
}

function NominatedBy({
  nominators,
  slashingSpans
}) {
  const {
    t
  } = useTranslation();
  const {
    active,
    chilled
  } = useMemo(() => extractChilled(nominators, slashingSpans), [nominators, slashingSpans]);
  return /*#__PURE__*/_jsxs("td", {
    className: "expand all",
    children: [active && /*#__PURE__*/_jsx(Expander, {
      renderChildren: active[1],
      summary: t('Nominations ({{count}})', {
        replace: {
          count: formatNumber(active[0])
        }
      })
    }), chilled && /*#__PURE__*/_jsx(Expander, {
      renderChildren: chilled[1],
      summary: t('Renomination required ({{count}})', {
        replace: {
          count: formatNumber(chilled[0])
        }
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(NominatedBy);