// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import { AddressSmall, Icon, LinkExternal } from '@axia-js/react-components';
import { checkVisibility } from '@axia-js/react-components/util';
import { useApi, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import Favorite from "./Favorite.js";
import NominatedBy from "./NominatedBy.js";
import StakeOther from "./StakeOther.js";
import Status from "./Status.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function expandInfo({
  exposure,
  validatorPrefs
}) {
  var _commission;

  let nominators = [];
  let stakeTotal;
  let stakeOther;
  let stakeOwn;

  if (exposure && exposure.total) {
    var _exposure$total;

    nominators = exposure.others.map(({
      value,
      who
    }) => ({
      nominatorId: who.toString(),
      value: value.unwrap()
    }));
    stakeTotal = ((_exposure$total = exposure.total) === null || _exposure$total === void 0 ? void 0 : _exposure$total.unwrap()) || BN_ZERO;
    stakeOwn = exposure.own.unwrap();
    stakeOther = stakeTotal.sub(stakeOwn);
  }

  const commission = validatorPrefs === null || validatorPrefs === void 0 ? void 0 : (_commission = validatorPrefs.commission) === null || _commission === void 0 ? void 0 : _commission.unwrap();
  return {
    commission: commission === null || commission === void 0 ? void 0 : commission.toHuman(),
    nominators,
    stakeOther,
    stakeOwn,
    stakeTotal
  };
}

const transformSlashes = {
  transform: opt => opt.unwrapOr(null)
};

function useAddressCalls(api, address, isMain) {
  const params = useMemo(() => [address], [address]);
  const accountInfo = useCall(api.derive.accounts.info, params);
  const slashingSpans = useCall(!isMain && api.query.staking.slashingSpans, params, transformSlashes);
  return {
    accountInfo,
    slashingSpans
  };
}

function Address({
  address,
  className = '',
  filterName,
  hasQueries,
  isElected,
  isFavorite,
  isMain,
  isPara,
  lastBlock,
  nominatedBy,
  points,
  recentlyOnline,
  toggleFavorite,
  validatorInfo,
  withIdentity
}) {
  var _ref;

  const {
    api
  } = useApi();
  const {
    accountInfo,
    slashingSpans
  } = useAddressCalls(api, address, isMain);
  const {
    commission,
    nominators,
    stakeOther,
    stakeOwn
  } = useMemo(() => validatorInfo ? expandInfo(validatorInfo) : {
    nominators: []
  }, [validatorInfo]);
  const isVisible = useMemo(() => accountInfo ? checkVisibility(api, address, accountInfo, filterName, withIdentity) : true, [api, accountInfo, address, filterName, withIdentity]);

  const _onQueryStats = useCallback(() => {
    window.location.hash = `/staking/query/${address}`;
  }, [address]);

  if (!isVisible) {
    return null;
  }

  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsxs("td", {
      className: "badge together",
      children: [/*#__PURE__*/_jsx(Favorite, {
        address: address,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite
      }), /*#__PURE__*/_jsx(Status, {
        isElected: isElected,
        isMain: isMain,
        isPara: isPara,
        isRelay: !!((_ref = api.query.parasShared || api.query.shared) !== null && _ref !== void 0 && _ref.activeValidatorIndices),
        nominators: isMain ? nominators : nominatedBy,
        onlineCount: recentlyOnline === null || recentlyOnline === void 0 ? void 0 : recentlyOnline.blockCount,
        onlineMessage: recentlyOnline === null || recentlyOnline === void 0 ? void 0 : recentlyOnline.hasMessage
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: address
      })
    }), isMain ? /*#__PURE__*/_jsx(StakeOther, {
      nominators: nominators,
      stakeOther: stakeOther
    }) : /*#__PURE__*/_jsx(NominatedBy, {
      nominators: nominatedBy,
      slashingSpans: slashingSpans
    }), isMain && /*#__PURE__*/_jsx("td", {
      className: "number media--1100",
      children: (stakeOwn === null || stakeOwn === void 0 ? void 0 : stakeOwn.gtn(0)) && /*#__PURE__*/_jsx(FormatBalance, {
        value: stakeOwn
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: commission
    }), isMain && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("td", {
        className: "number",
        children: points
      }), /*#__PURE__*/_jsx("td", {
        className: "number",
        children: lastBlock
      })]
    }), /*#__PURE__*/_jsx("td", {
      children: hasQueries && /*#__PURE__*/_jsx(Icon, {
        className: "highlight--color",
        icon: "chart-line",
        onClick: _onQueryStats
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "links media--1200",
      children: /*#__PURE__*/_jsx(LinkExternal, {
        data: address,
        isLogo: true,
        type: isMain ? 'validator' : 'intention'
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Address);