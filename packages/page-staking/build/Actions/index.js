// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo, useRef, useState } from 'react';
import { Button, Table, ToggleGroup } from '@axia-js/react-components';
import { useAvailableSlashes } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import ElectionBanner from "../ElectionBanner.js";
import { useTranslation } from "../translate.js";
import Account from "./Account/index.js";
import NewNominator from "./NewNominator.js";
import NewStash from "./NewStash.js";
import NewValidator from "./NewValidator.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function assignValue({
  isStashNominating,
  isStashValidating
}) {
  return isStashValidating ? 1 : isStashNominating ? 5 : 99;
}

function sortStashes(a, b) {
  return assignValue(a) - assignValue(b);
}

function extractState(ownStashes) {
  if (!ownStashes) {
    return {};
  }

  const bondedNoms = new BN(0);
  const bondedNone = new BN(0);
  const bondedVals = new BN(0);
  const bondedTotal = new BN(0);
  ownStashes.forEach(({
    isStashNominating,
    isStashValidating,
    stakingLedger
  }) => {
    const value = stakingLedger && stakingLedger.total ? stakingLedger.total.unwrap() : BN_ZERO;
    bondedTotal.iadd(value);

    if (isStashNominating) {
      bondedNoms.iadd(value);
    } else if (isStashValidating) {
      bondedVals.iadd(value);
    } else {
      bondedNone.iadd(value);
    }
  });
  return {
    bondedNoms,
    bondedNone,
    bondedTotal,
    bondedVals,
    foundStashes: ownStashes.sort(sortStashes)
  };
}

function filterStashes(typeIndex, stashes) {
  return stashes.filter(({
    isStashNominating,
    isStashValidating
  }) => {
    switch (typeIndex) {
      case 1:
        return isStashNominating;

      case 2:
        return isStashValidating;

      case 3:
        return !isStashNominating && !isStashValidating;

      default:
        return true;
    }
  });
}

function getValue(typeIndex, {
  bondedNoms,
  bondedNone,
  bondedTotal,
  bondedVals
}) {
  switch (typeIndex) {
    case 0:
      return bondedTotal;

    case 1:
      return bondedNoms;

    case 2:
      return bondedVals;

    case 3:
      return bondedNone;

    default:
      return bondedTotal;
  }
}

function formatTotal(typeIndex, state) {
  const value = getValue(typeIndex, state);
  return value && /*#__PURE__*/_jsx(FormatBalance, {
    value: value
  });
}

function Actions({
  className = '',
  isInElection,
  ownStashes,
  targets
}) {
  const {
    t
  } = useTranslation();
  const allSlashes = useAvailableSlashes();
  const [typeIndex, setTypeIndex] = useState(0);
  const headerRef = useRef([[t('stashes'), 'start', 2], [t('controller'), 'address'], [t('rewards'), 'start media--1200'], [t('bonded'), 'number'], [undefined, undefined, 2]]);
  const typeRef = useRef([{
    text: t('All stashes'),
    value: 'all'
  }, {
    text: t('Nominators'),
    value: 'noms'
  }, {
    text: t('Validators'),
    value: 'vals'
  }, {
    text: t('Inactive'),
    value: 'chill'
  }]);
  const state = useMemo(() => extractState(ownStashes), [ownStashes]);
  const footer = useMemo(() => /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      colSpan: 4
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: formatTotal(typeIndex, state)
    }), /*#__PURE__*/_jsx("td", {
      colSpan: 2
    })]
  }), [state, typeIndex]);
  const filtered = useMemo(() => state.foundStashes && filterStashes(typeIndex, state.foundStashes), [state, typeIndex]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs(Button.Group, {
      children: [/*#__PURE__*/_jsx(ToggleGroup, {
        onChange: setTypeIndex,
        options: typeRef.current,
        value: typeIndex
      }), /*#__PURE__*/_jsx(NewNominator, {
        isInElection: isInElection,
        targets: targets
      }), /*#__PURE__*/_jsx(NewValidator, {
        isInElection: isInElection,
        targets: targets
      }), /*#__PURE__*/_jsx(NewStash, {})]
    }), /*#__PURE__*/_jsx(ElectionBanner, {
      isInElection: isInElection
    }), /*#__PURE__*/_jsx(Table, {
      empty: filtered && t('No funds staked yet. Bond funds to validate or nominate a validator'),
      footer: footer,
      header: headerRef.current,
      children: filtered === null || filtered === void 0 ? void 0 : filtered.map(info => /*#__PURE__*/_jsx(Account, {
        allSlashes: allSlashes,
        info: info,
        isDisabled: isInElection,
        targets: targets
      }, info.stashId))
    })]
  });
}

export default /*#__PURE__*/React.memo(Actions);