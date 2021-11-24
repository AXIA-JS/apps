"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _basic = _interopRequireDefault(require("./md/basic.md"));

var _Summary = _interopRequireDefault(require("./Overview/Summary.cjs"));

var _index = _interopRequireDefault(require("./Actions/index.cjs"));

var _ActionsBanner = _interopRequireDefault(require("./ActionsBanner.cjs"));

var _constants = require("./constants.cjs");

var _index2 = _interopRequireDefault(require("./Overview/index.cjs"));

var _index3 = _interopRequireDefault(require("./Payouts/index.cjs"));

var _index4 = _interopRequireDefault(require("./Query/index.cjs"));

var _index5 = _interopRequireDefault(require("./Slashes/index.cjs"));

var _index6 = _interopRequireDefault(require("./Targets/index.cjs"));

var _translate = require("./translate.cjs");

var _useSortedTargets = _interopRequireDefault(require("./useSortedTargets.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const HIDDEN_ACC = ['actions', 'payout'];
const optionsParaValidators = {
  defaultValue: [false, {}],
  transform: _ref => {
    let [eraElectionStatus, validators, activeValidatorIndices] = _ref;
    return [!!eraElectionStatus && eraElectionStatus.isOpen, validators && activeValidatorIndices ? activeValidatorIndices.reduce((all, index) => _objectSpread(_objectSpread({}, all), {}, {
      [validators[index.toNumber()].toString()]: true
    }), {}) : {}];
  }
};

function StakingApp(_ref2) {
  var _ref3;

  let {
    basePath,
    className = ''
  } = _ref2;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    areAccountsLoaded,
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const [withLedger, setWithLedger] = (0, _react.useState)(false);
  const [favorites, toggleFavorite] = (0, _reactHooks.useFavorites)(_constants.STORE_FAVS_BASE);
  const stakingOverview = (0, _reactHooks.useCall)(api.derive.staking.overview);
  const [isInElection, paraValidators] = (0, _reactHooks.useCallMulti)([api.query.staking.eraElectionStatus, api.query.session.validators, (_ref3 = api.query.parasShared || api.query.shared) === null || _ref3 === void 0 ? void 0 : _ref3.activeValidatorIndices], optionsParaValidators);
  const ownStashes = (0, _reactHooks.useOwnStashInfos)();
  const slashes = (0, _reactHooks.useAvailableSlashes)();
  const targets = (0, _useSortedTargets.default)(favorites, withLedger);
  const hasQueries = (0, _react.useMemo)(() => {
    var _api$query$imOnline;

    return hasAccounts && !!((_api$query$imOnline = api.query.imOnline) !== null && _api$query$imOnline !== void 0 && _api$query$imOnline.authoredBlocks) && !!api.query.staking.activeEra;
  }, [api, hasAccounts]);
  const ownValidators = (0, _react.useMemo)(() => (ownStashes || []).filter(_ref4 => {
    let {
      isStashValidating
    } = _ref4;
    return isStashValidating;
  }), [ownStashes]);
  const toggleLedger = (0, _react.useCallback)(() => setWithLedger(true), []);
  const items = (0, _react.useMemo)(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    name: 'actions',
    text: t('Account actions')
  }, (0, _util.isFunction)(api.query.staking.activeEra) && hasAccounts && ownStashes && ownStashes.length !== 0 && {
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
    count: slashes.reduce((count, _ref5) => {
      let [, unapplied] = _ref5;
      return count + unapplied.length;
    }, 0),
    name: 'slashes',
    text: t('Slashes')
  }, {
    hasParams: true,
    name: 'query',
    text: t('Validator stats')
  }].filter(q => !!q), [api, hasAccounts, ownStashes, slashes, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: `staking--App ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.HelpOverlay, {
      md: _basic.default
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      hidden: areAccountsLoaded && !hasAccounts ? HIDDEN_ACC : undefined,
      items: items
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      isVisible: pathname === basePath,
      stakingOverview: stakingOverview,
      targets: targets
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/payout`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {
          isInElection: isInElection,
          ownValidators: ownValidators
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: [`${basePath}/query/:value`, `${basePath}/query`],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.default, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/slashes`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.default, {
          ownStashes: ownStashes,
          slashes: slashes
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/targets`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.default, {
          isInElection: isInElection,
          ownStashes: ownStashes,
          stakingOverview: stakingOverview,
          targets: targets,
          toggleFavorite: toggleFavorite,
          toggleLedger: toggleLedger
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/waiting`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
          favorites: favorites,
          hasQueries: hasQueries,
          isIntentions: true,
          stakingOverview: stakingOverview,
          targets: targets,
          toggleFavorite: toggleFavorite,
          toggleLedger: toggleLedger
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      className: pathname === `${basePath}/actions` ? '' : 'staking--hidden',
      isInElection: isInElection,
      ownStashes: ownStashes,
      targets: targets
    }), basePath === pathname && hasAccounts && (ownStashes === null || ownStashes === void 0 ? void 0 : ownStashes.length) === 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ActionsBanner.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
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

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(StakingApp).withConfig({
  displayName: "src",
  componentId: "sc-6fze3u-0"
})(_ref6 => {
  let {
    theme
  } = _ref6;
  return `
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
`;
}));

exports.default = _default;