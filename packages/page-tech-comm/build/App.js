// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import { useApi, useCall, useCollectiveMembers } from '@axia-js/react-hooks';
import Overview from "./Overview/index.js";
import Proposals from "./Proposals/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const HIDDEN_EMPTY = [];
const HIDDEN_PROPOSALS = ['proposals'];

function TechCommApp({
  basePath,
  className,
  type
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    isMember,
    members
  } = useCollectiveMembers(type);
  const prime = useCall(api.derive[type].prime);
  const hasProposals = useCall(api.derive[type].hasProposals);
  const proposalHashes = useCall(api.derive[type].proposalHashes);
  const items = useMemo(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    name: 'proposals',
    text: t('Proposals ({{count}})', {
      replace: {
        count: proposalHashes && proposalHashes.length || 0
      }
    })
  }], [proposalHashes, t]);
  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      hidden: hasProposals ? HIDDEN_EMPTY : HIDDEN_PROPOSALS,
      items: items
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/proposals`,
        children: /*#__PURE__*/_jsx(Proposals, {
          isMember: isMember,
          members: members,
          prime: prime,
          proposalHashes: proposalHashes,
          type: type
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: basePath,
        children: /*#__PURE__*/_jsx(Overview, {
          isMember: isMember,
          members: members,
          prime: prime,
          proposalHashes: proposalHashes,
          type: type
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(TechCommApp);