import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import { Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HelpOverlay, Tabs } from '@axia-js/react-components';
import { useAccounts, useApi, useAvailableSlashes, useCall, useCallMulti, useFavorites, useOwnStashInfos } from '@axia-js/react-hooks';
import { isFunction } from '@axia-js/util';
import basicMd from "./md/basic.md";
import Summary from "./Overview/Summary.js";
import Actions from "./Actions/index.js";
import ActionsBanner from "./ActionsBanner.js";
import { STORE_FAVS_BASE } from "./constants.js";
import Overview from "./Overview/index.js";
import Payouts from "./Payouts/index.js";
import Query from "./Query/index.js";
import Slashes from "./Slashes/index.js";
import Targets from "./Targets/index.js";
import { useTranslation } from "./translate.js";
import useSortedTargets from "./useSortedTargets.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const HIDDEN_ACC = ['actions', 'payout'];
const optionsParaValidators = {
  defaultValue: [false, {}],
  transform: ([eraElectionStatus, validators, activeValidatorIndices]) => [!!eraElectionStatus && eraElectionStatus.isOpen, validators && activeValidatorIndices ? activeValidatorIndices.reduce((all, index) => _objectSpread(_objectSpread({}, all), {}, {
    [validators[index.toNumber()].toString()]: true
  }), {}) : {}]
};

function StakingApp({
  basePath,
  className = ''
}) {
  var _ref;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    areAccountsLoaded,
    hasAccounts
  } = useAccounts();
  const {
    pathname
  } = useLocation();
  const [withLedger, setWithLedger] = useState(false);
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS_BASE);
  const stakingOverview = useCall(api.derive.staking.overview);
  const [isInElection, paraValidators] = useCallMulti([api.query.staking.eraElectionStatus, api.query.session.validators, (_ref = api.query.parasShared || api.query.shared) === null || _ref === void 0 ? void 0 : _ref.activeValidatorIndices], optionsParaValidators);
  const ownStashes = useOwnStashInfos();
  const slashes = useAvailableSlashes();
  const targets = useSortedTargets(favorites, withLedger);
  const hasQueries = useMemo(() => {
    var _api$query$imOnline;

    return hasAccounts && !!((_api$query$imOnline = api.query.imOnline) !== null && _api$query$imOnline !== void 0 && _api$query$imOnline.authoredBlocks) && !!api.query.staking.activeEra;
  }, [api, hasAccounts]);
  const ownValidators = useMemo(() => (ownStashes || []).filter(({
    isStashValidating
  }) => isStashValidating), [ownStashes]);
  const toggleLedger = useCallback(() => setWithLedger(true), []);
  const items = useMemo(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    name: 'actions',
    text: t('Account actions')
  }, isFunction(api.query.staking.activeEra) && hasAccounts && ownStashes && ownStashes.length !== 0 && {
    name: 'payout',
    text: t('Payouts')
  }, {
    alias: 'returns',
    name: 'targets',
    text: t('Targets')
  }, {
    name: 'waiting',
    text: t('Waiting')
  }, {
    count: slashes.reduce((count, [, unapplied]) => count + unapplied.length, 0),
    name: 'slashes',
    text: t('Slashes')
  }, {
    hasParams: true,
    name: 'query',
    text: t('Validator stats')
  }].filter(q => !!q), [api, hasAccounts, ownStashes, slashes, t]);
  return /*#__PURE__*/_jsxs("main", {
    className: `staking--App ${className}`,
    children: [/*#__PURE__*/_jsx(HelpOverlay, {
      md: basicMd
    }), /*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      hidden: areAccountsLoaded && !hasAccounts ? HIDDEN_ACC : undefined,
      items: items
    }), /*#__PURE__*/_jsx(Summary, {
      isVisible: pathname === basePath,
      stakingOverview: stakingOverview,
      targets: targets
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/payout`,
        children: /*#__PURE__*/_jsx(Payouts, {
          isInElection: isInElection,
          ownValidators: ownValidators
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: [`${basePath}/query/:value`, `${basePath}/query`],
        children: /*#__PURE__*/_jsx(Query, {})
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/slashes`,
        children: /*#__PURE__*/_jsx(Slashes, {
          ownStashes: ownStashes,
          slashes: slashes
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/targets`,
        children: /*#__PURE__*/_jsx(Targets, {
          isInElection: isInElection,
          ownStashes: ownStashes,
          stakingOverview: stakingOverview,
          targets: targets,
          toggleFavorite: toggleFavorite,
          toggleLedger: toggleLedger
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/waiting`,
        children: /*#__PURE__*/_jsx(Overview, {
          favorites: favorites,
          hasQueries: hasQueries,
          isIntentions: true,
          stakingOverview: stakingOverview,
          targets: targets,
          toggleFavorite: toggleFavorite,
          toggleLedger: toggleLedger
        })
      })]
    }), /*#__PURE__*/_jsx(Actions, {
      className: pathname === `${basePath}/actions` ? '' : 'staking--hidden',
      isInElection: isInElection,
      ownStashes: ownStashes,
      targets: targets
    }), basePath === pathname && hasAccounts && (ownStashes === null || ownStashes === void 0 ? void 0 : ownStashes.length) === 0 && /*#__PURE__*/_jsx(ActionsBanner, {}), /*#__PURE__*/_jsx(Overview, {
      className: basePath === pathname ? '' : 'staking--hidden',
      favorites: favorites,
      hasQueries: hasQueries,
      paraValidators: paraValidators,
      stakingOverview: stakingOverview,
      targets: targets,
      toggleFavorite: toggleFavorite
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(StakingApp).withConfig({
  displayName: "src",
  componentId: "sc-6fze3u-0"
})(({
  theme
}) => `
  .staking--hidden {
    display: none;
  }

  .staking--Chart {
    margin-top: 1.5rem;

    h1 {
      margin-bottom: 0.5rem;
    }

    .ui--Spinner {
      margin: 2.5rem auto;
    }
  }

  .staking--optionsBar {
    margin: 0.5rem 0 1rem;
    text-align: center;
    white-space: normal;

    .staking--buttonToggle {
      display: inline-block;
      margin-right: 1rem;
      margin-top: 0.5rem;
    }
  }

  .ui--Expander.stakeOver {
    .ui--Expander-summary {
      color: var(--color-error);

    ${theme.theme === 'dark' ? `font-weight: bold;
      .ui--FormatBalance-value {

        > .ui--FormatBalance-postfix {
          opacity: 1;
        }
      }` : ''};
    }
  }
`));