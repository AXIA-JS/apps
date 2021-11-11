import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { InputAddress, Labelled, Static } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import Inset from "./Inset.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function TreasuryProposal({
  asInset,
  className = '',
  insetProps,
  onClick,
  proposal,
  proposalId
}) {
  const {
    t
  } = useTranslation();
  const [stateProposal, setProposal] = useState(null);
  const {
    api
  } = useApi();
  useEffect(() => {
    if (!proposal && proposalId) {
      api.query.treasury.proposals(proposalId).then(proposal => proposal.unwrapOr(null)).catch(() => null).then(setProposal).catch(console.error);
    } else {
      setProposal(proposal || null);
    }
  }, [api, proposal, proposalId]);

  if (!stateProposal) {
    return null;
  }

  const {
    beneficiary,
    bond,
    proposer,
    value
  } = stateProposal;

  const inner = /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Labelled, {
      label: t('proposed by'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: proposer,
        isDisabled: true,
        value: proposer,
        withLabel: false
      })
    }), /*#__PURE__*/_jsx(Labelled, {
      label: t('beneficiary'),
      children: /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: beneficiary,
        isDisabled: true,
        value: beneficiary,
        withLabel: false
      })
    }), /*#__PURE__*/_jsx(Static, {
      label: t('value'),
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: value
      })
    }), /*#__PURE__*/_jsx(Static, {
      label: t('bond'),
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: bond
      })
    })]
  });

  if (asInset) {
    return /*#__PURE__*/_jsx(Inset, _objectSpread(_objectSpread({
      className: className
    }, insetProps), {}, {
      children: inner
    }));
  }

  return /*#__PURE__*/_jsx("div", {
    className: className,
    onClick: onClick && onClick,
    children: inner
  });
}

export default /*#__PURE__*/React.memo(TreasuryProposal);