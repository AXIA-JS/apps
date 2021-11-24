// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { HelpOverlay, Tabs } from '@axia-js/react-components';
import { useApi, useCollectiveMembers } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';
import basicMd from "./md/basic.md";
import Overview from "./Overview/index.js";
import Tips from "./Tips/index.js";
import { useTranslation } from "./translate.js";
import useTipHashes from "./useTipHashes.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { default as useCounter } from "./useCounter.js";

function TreasuryApp({
  basePath
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
  } = useCollectiveMembers('council');
  const tipHashes = useTipHashes();
  const items = useMemo(() => {
    var _ref;

    return [{
      isRoot: true,
      name: 'overview',
      text: t('Overview')
    }, isFunction((_ref = api.query.tips || api.query.treasury) === null || _ref === void 0 ? void 0 : _ref.tips) && {
      count: tipHashes === null || tipHashes === void 0 ? void 0 : tipHashes.length,
      name: 'tips',
      text: t('Tips')
    }].filter(t => !!t);
  }, [api, t, tipHashes]);
  return /*#__PURE__*/_jsxs("main", {
    className: "treasury--App",
    children: [/*#__PURE__*/_jsx(HelpOverlay, {
      md: basicMd
    }), /*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: items
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/tips`,
        children: /*#__PURE__*/_jsx(Tips, {
          hashes: tipHashes,
          isMember: isMember,
          members: members
        })
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Overview, {
          isMember: isMember,
          members: members
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(TreasuryApp);