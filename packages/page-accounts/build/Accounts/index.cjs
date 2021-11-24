"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _Create = _interopRequireDefault(require("../modals/Create.cjs"));

var _Import = _interopRequireDefault(require("../modals/Import.cjs"));

var _Ledger = _interopRequireDefault(require("../modals/Ledger.cjs"));

var _MultisigCreate = _interopRequireDefault(require("../modals/MultisigCreate.cjs"));

var _ProxiedAdd = _interopRequireDefault(require("../modals/ProxiedAdd.cjs"));

var _Qr = _interopRequireDefault(require("../modals/Qr.cjs"));

var _translate = require("../translate.cjs");

var _util2 = require("../util.cjs");

var _Account = _interopRequireDefault(require("./Account.cjs"));

var _BannerClaims = _interopRequireDefault(require("./BannerClaims.cjs"));

var _BannerExtension = _interopRequireDefault(require("./BannerExtension.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_SORT_CONTROLS = {
  sortBy: 'date',
  sortFromMax: true
};
const STORE_FAVS = 'accounts:favorites';

function Overview(_ref) {
  var _api$query$democracy, _api$query$democracy$, _api$query$proxy;

  let {
    className = '',
    onStatusChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts,
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    isIpfs
  } = (0, _reactHooks.useIpfs)();
  const {
    isLedgerEnabled
  } = (0, _reactHooks.useLedger)();
  const [isCreateOpen, toggleCreate, setIsCreateOpen] = (0, _reactHooks.useToggle)();
  const [isImportOpen, toggleImport] = (0, _reactHooks.useToggle)();
  const [isLedgerOpen, toggleLedger] = (0, _reactHooks.useToggle)();
  const [isMultisigOpen, toggleMultisig] = (0, _reactHooks.useToggle)();
  const [isProxyOpen, toggleProxy] = (0, _reactHooks.useToggle)();
  const [isQrOpen, toggleQr] = (0, _reactHooks.useToggle)();
  const [favorites, toggleFavorite] = (0, _reactHooks.useFavorites)(STORE_FAVS);
  const [balances, setBalances] = (0, _react.useState)({
    accounts: {}
  });
  const [filterOn, setFilter] = (0, _react.useState)('');
  const [sortedAccounts, setSorted] = (0, _react.useState)([]);
  const [{
    sortBy,
    sortFromMax
  }, setSortBy] = (0, _react.useState)(DEFAULT_SORT_CONTROLS);
  const delegations = (0, _reactHooks.useCall)((_api$query$democracy = api.query.democracy) === null || _api$query$democracy === void 0 ? void 0 : (_api$query$democracy$ = _api$query$democracy.votingOf) === null || _api$query$democracy$ === void 0 ? void 0 : _api$query$democracy$.multi, [allAccounts]);
  const proxies = (0, _reactHooks.useCall)((_api$query$proxy = api.query.proxy) === null || _api$query$proxy === void 0 ? void 0 : _api$query$proxy.proxies.multi, [allAccounts], {
    transform: result => api.tx.proxy.addProxy.meta.args.length === 3 ? result : result.map(_ref2 => {
      let [arr, bn] = _ref2;
      return [arr.map(_ref3 => {
        let [delegate, proxyType] = _ref3;
        return api.createType('ProxyDefinition', {
          delegate,
          proxyType
        });
      }), bn];
    })
  });
  const isLoading = (0, _reactHooks.useLoadingDelay)(); // We use favorites only to check if it includes some element,
  // so Object is better than array for that because hashmap access is O(1).

  const favoritesMap = (0, _react.useMemo)(() => Object.fromEntries(favorites.map(x => [x, true])), [favorites]);
  const accountsWithInfo = (0, _react.useMemo)(() => allAccounts.map((address, index) => {
    var _delegations$index, _delegations$index2, _favoritesMap;

    const deleg = delegations && ((_delegations$index = delegations[index]) === null || _delegations$index === void 0 ? void 0 : _delegations$index.isDelegating) && ((_delegations$index2 = delegations[index]) === null || _delegations$index2 === void 0 ? void 0 : _delegations$index2.asDelegating);
    const delegation = deleg && {
      accountDelegated: deleg.target.toString(),
      amount: deleg.balance,
      conviction: deleg.conviction
    } || undefined;
    return {
      account: _uiKeyring.keyring.getAccount(address),
      address,
      delegation,
      isFavorite: (_favoritesMap = favoritesMap[address !== null && address !== void 0 ? address : '']) !== null && _favoritesMap !== void 0 ? _favoritesMap : false
    };
  }), [allAccounts, favoritesMap, delegations]);
  const accountsMap = (0, _react.useMemo)(() => {
    const ret = {};
    accountsWithInfo.forEach(function (x) {
      ret[x.address] = x;
    });
    return ret;
  }, [accountsWithInfo]);
  const header = (0, _react.useRef)([[t('accounts'), 'start', 3], [t('type')], [t('transactions'), 'media--1500'], [t('balances'), 'balances'], []]);
  (0, _react.useEffect)(() => {
    // We add new accounts to the end
    setSorted(sortedAccounts => [...sortedAccounts.map(x => accountsWithInfo.find(y => x.address === y.address)).filter(x => !!x), ...accountsWithInfo.filter(x => !sortedAccounts.find(y => x.address === y.address))]);
  }, [accountsWithInfo]);
  const accounts = balances.accounts;
  (0, _react.useEffect)(() => {
    setSorted(sortedAccounts => (0, _util2.sortAccounts)(sortedAccounts, accountsMap, accounts, sortBy, sortFromMax));
  }, [accountsWithInfo, accountsMap, accounts, sortBy, sortFromMax]);

  const _setBalance = (0, _react.useCallback)((account, balance) => setBalances(_ref4 => {
    let {
      accounts
    } = _ref4;
    accounts[account] = balance;

    const aggregate = key => Object.values(accounts).reduce((total, value) => total.add(value[key]), _util.BN_ZERO);

    return {
      accounts,
      summary: {
        bonded: aggregate('bonded'),
        locked: aggregate('locked'),
        redeemable: aggregate('redeemable'),
        total: aggregate('total'),
        transferrable: aggregate('transferrable'),
        unbonding: aggregate('unbonding')
      }
    };
  }), []);

  const _openCreateModal = (0, _react.useCallback)(() => setIsCreateOpen(true), [setIsCreateOpen]);

  const accountComponents = (0, _react.useMemo)(() => {
    const ret = {};
    accountsWithInfo.forEach((_ref5, index) => {
      let {
        account,
        address,
        delegation,
        isFavorite
      } = _ref5;
      ret[address] = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Account.default, {
        account: account,
        delegation: delegation,
        filter: filterOn,
        isFavorite: isFavorite,
        proxy: proxies === null || proxies === void 0 ? void 0 : proxies[index],
        setBalance: _setBalance,
        toggleFavorite: toggleFavorite
      }, `${index}:${address}`);
    });
    return ret;
  }, [accountsWithInfo, filterOn, proxies, _setBalance, toggleFavorite]);

  const onDropdownChange = () => item => setSortBy({
    sortBy: item,
    sortFromMax
  });

  const dropdownOptions = () => _util2.sortCategory.map(x => ({
    text: x,
    value: x
  }));

  const onSortDirectionChange = () => () => setSortBy({
    sortBy,
    sortFromMax: !sortFromMax
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [isCreateOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Create.default, {
      onClose: toggleCreate,
      onStatusChange: onStatusChange
    }), isImportOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Import.default, {
      onClose: toggleImport,
      onStatusChange: onStatusChange
    }), isLedgerOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ledger.default, {
      onClose: toggleLedger
    }), isMultisigOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MultisigCreate.default, {
      onClose: toggleMultisig,
      onStatusChange: onStatusChange
    }), isProxyOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProxiedAdd.default, {
      onClose: toggleProxy,
      onStatusChange: onStatusChange
    }), isQrOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Qr.default, {
      onClose: toggleQr,
      onStatusChange: onStatusChange
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BannerExtension.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BannerClaims.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      balance: balances.summary
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
        className: "dropdown-section",
        "data-testid": "sort-by-section",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.SortDropdown, {
          defaultValue: sortBy,
          label: t('sort by'),
          onChange: onDropdownChange(),
          onClick: onSortDirectionChange(),
          options: dropdownOptions(),
          sortDirection: sortFromMax ? 'ascending' : 'descending'
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.FilterInput, {
          filterOn: filterOn,
          label: t('filter by name or tags'),
          setFilter: setFilter
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "plus",
          isDisabled: isIpfs,
          label: t('Add account'),
          onClick: _openCreateModal
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "sync",
          isDisabled: isIpfs,
          label: t('Restore JSON'),
          onClick: toggleImport
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "qrcode",
          label: t('Add via Qr'),
          onClick: toggleQr
        }), isLedgerEnabled && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "project-diagram",
            label: t('Add via Ledger'),
            onClick: toggleLedger
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "plus",
          isDisabled: !(api.tx.multisig || api.tx.utility) || !hasAccounts,
          label: t('Multisig'),
          onClick: toggleMultisig
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "plus",
          isDisabled: !api.tx.proxy || !hasAccounts,
          label: t('Proxied'),
          onClick: toggleProxy
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: !isLoading && sortedAccounts && t("You don't have any accounts. Some features are currently hidden and will only become available once you have accounts."),
      header: header.current,
      withCollapsibleRows: true,
      children: !isLoading && sortedAccounts.map(_ref6 => {
        let {
          address
        } = _ref6;
        return accountComponents[address];
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Overview).withConfig({
  displayName: "Accounts",
  componentId: "sc-1rxjfmz-0"
})([".ui--Dropdown{width:15rem;}.dropdown-section{display:flex;flex-direction:row;align-items:center;}"]));

exports.default = _default;