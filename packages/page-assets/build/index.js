// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import { useAccounts } from '@axia-js/react-hooks';
import { BN_ONE } from '@axia-js/util';
import Balances from "./Balances/index.js";
import Overview from "./Overview/index.js";
import { useTranslation } from "./translate.js";
import useAssetIds from "./useAssetIds.js";
import useAssetInfos from "./useAssetInfos.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function findOpenId(ids) {
  if (!ids || !ids.length) {
    return BN_ONE;
  }

  const lastTaken = ids.find((id, index) => index === 0 ? !id.eq(BN_ONE) : !id.sub(BN_ONE).eq(ids[index - 1]));
  return lastTaken ? lastTaken.sub(BN_ONE) : ids[ids.length - 1].add(BN_ONE);
}

function AssetApp({
  basePath,
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    hasAccounts
  } = useAccounts();
  const ids = useAssetIds();
  const infos = useAssetInfos(ids);
  const tabsRef = useRef([{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    name: 'balances',
    text: t('Balances')
  }]);
  const hidden = useMemo(() => hasAccounts && infos && infos.some(({
    details,
    metadata
  }) => !!(details && metadata)) ? [] : ['balances'], [hasAccounts, infos]);
  const openId = useMemo(() => findOpenId(ids), [ids]);
  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      hidden: hidden,
      items: tabsRef.current
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/balances`,
        children: /*#__PURE__*/_jsx(Balances, {
          infos: infos
        })
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Overview, {
          ids: ids,
          infos: infos,
          openId: openId
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(AssetApp);