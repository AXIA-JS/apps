// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import Auctions from "./Auctions/index.js";
import Crowdloan from "./Crowdloan/index.js";
import Overview from "./Overview/index.js";
import Parathreads from "./Parathreads/index.js";
import Proposals from "./Proposals/index.js";
import { useTranslation } from "./translate.js";
import useActionsQueue from "./useActionsQueue.js";
import useAuctionInfo from "./useAuctionInfo.js";
import useFunds from "./useFunds.js";
import useLeasePeriod from "./useLeasePeriod.js";
import useOwnedIds from "./useOwnedIds.js";
import useProposals from "./useProposals.js";
import useUpcomingIds from "./useUpcomingIds.js";
import useWinningData from "./useWinningData.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ParachainsApp({
  basePath,
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    pathname
  } = useLocation();
  const auctionInfo = useAuctionInfo();
  const campaigns = useFunds();
  const leasePeriod = useLeasePeriod();
  const ownedIds = useOwnedIds();
  const winningData = useWinningData(auctionInfo);
  const proposals = useProposals();
  const actionsQueue = useActionsQueue();
  const upcomingIds = useUpcomingIds();
  const paraIds = useCall(api.query.paras.parachains);
  const items = useRef([{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    name: 'parathreads',
    text: t('Parathreads')
  }, api.query.proposeParachain && {
    name: 'proposals',
    text: t('Proposals')
  }, api.query.auctions && {
    name: 'auctions',
    text: t('Auctions')
  }, api.query.crowdloan && {
    name: 'crowdloan',
    text: t('Crowdloan')
  }].filter(q => !!q));
  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: items.current
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/auctions`,
        children: /*#__PURE__*/_jsx(Auctions, {
          auctionInfo: auctionInfo,
          campaigns: campaigns,
          ownedIds: ownedIds,
          winningData: winningData
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/crowdloan`,
        children: /*#__PURE__*/_jsx(Crowdloan, {
          auctionInfo: auctionInfo,
          campaigns: campaigns,
          leasePeriod: leasePeriod,
          ownedIds: ownedIds
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/proposals`,
        children: /*#__PURE__*/_jsx(Proposals, {
          proposals: proposals
        })
      })]
    }), /*#__PURE__*/_jsx(Overview, {
      actionsQueue: actionsQueue,
      className: pathname === basePath ? '' : 'parachains--hidden',
      leasePeriod: leasePeriod,
      paraIds: paraIds,
      proposals: proposals,
      threadIds: upcomingIds
    }), /*#__PURE__*/_jsx(Parathreads, {
      actionsQueue: actionsQueue,
      className: pathname === `${basePath}/parathreads` ? '' : 'parachains--hidden',
      ids: upcomingIds,
      leasePeriod: leasePeriod,
      ownedIds: ownedIds
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(ParachainsApp).withConfig({
  displayName: "src",
  componentId: "sc-2k58f1-0"
})([".parachains--hidden{display:none;}"]));