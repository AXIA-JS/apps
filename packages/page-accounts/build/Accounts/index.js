// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, FilterInput, SortDropdown, SummaryBox, Table } from '@axia-js/react-components';
import { useAccounts, useApi, useCall, useFavorites, useIpfs, useLedger, useLoadingDelay, useToggle } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { BN_ZERO } from '@axia-js/util';
import CreateModal from "../modals/Create.js";
import ImportModal from "../modals/Import.js";
import Ledger from "../modals/Ledger.js";
import Multisig from "../modals/MultisigCreate.js";
import Proxy from "../modals/ProxiedAdd.js";
import Qr from "../modals/Qr.js";
import { useTranslation } from "../translate.js";
import { sortAccounts, sortCategory } from "../util.js";
import Account from "./Account.js";
import BannerClaims from "./BannerClaims.js";
import BannerExtension from "./BannerExtension.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_SORT_CONTROLS = {
  sortBy: 'date',
  sortFromMax: true
};
const STORE_FAVS = 'accounts:favorites';

function Overview({
  className = '',
  onStatusChange
}) {
  var _api$query$democracy, _api$query$democracy$, _api$query$proxy;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    allAccounts,
    hasAccounts
  } = useAccounts();
  const {
    isIpfs
  } = useIpfs();
  const {
    isLedgerEnabled
  } = useLedger();
  const [isCreateOpen, toggleCreate, setIsCreateOpen] = useToggle();
  const [isImportOpen, toggleImport] = useToggle();
  const [isLedgerOpen, toggleLedger] = useToggle();
  const [isMultisigOpen, toggleMultisig] = useToggle();
  const [isProxyOpen, toggleProxy] = useToggle();
  const [isQrOpen, toggleQr] = useToggle();
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS);
  const [balances, setBalances] = useState({
    accounts: {}
  });
  const [filterOn, setFilter] = useState('');
  const [sortedAccounts, setSorted] = useState([]);
  const [{
    sortBy,
    sortFromMax
  }, setSortBy] = useState(DEFAULT_SORT_CONTROLS);
  const delegations = useCall((_api$query$democracy = api.query.democracy) === null || _api$query$democracy === void 0 ? void 0 : (_api$query$democracy$ = _api$query$democracy.votingOf) === null || _api$query$democracy$ === void 0 ? void 0 : _api$query$democracy$.multi, [allAccounts]);
  const proxies = useCall((_api$query$proxy = api.query.proxy) === null || _api$query$proxy === void 0 ? void 0 : _api$query$proxy.proxies.multi, [allAccounts], {
    transform: result => api.tx.proxy.addProxy.meta.args.length === 3 ? result : result.map(([arr, bn]) => [arr.map(([delegate, proxyType]) => api.createType('ProxyDefinition', {
      delegate,
      proxyType
    })), bn])
  });
  const isLoading = useLoadingDelay(); // We use favorites only to check if it includes some element,
  // so Object is better than array for that because hashmap access is O(1).

  const favoritesMap = useMemo(() => Object.fromEntries(favorites.map(x => [x, true])), [favorites]);
  const accountsWithInfo = useMemo(() => allAccounts.map((address, index) => {
    var _delegations$index, _delegations$index2, _favoritesMap;

    const deleg = delegations && ((_delegations$index = delegations[index]) === null || _delegations$index === void 0 ? void 0 : _delegations$index.isDelegating) && ((_delegations$index2 = delegations[index]) === null || _delegations$index2 === void 0 ? void 0 : _delegations$index2.asDelegating);
    const delegation = deleg && {
      accountDelegated: deleg.target.toString(),
      amount: deleg.balance,
      conviction: deleg.conviction
    } || undefined;
    return {
      account: keyring.getAccount(address),
      address,
      delegation,
      isFavorite: (_favoritesMap = favoritesMap[address !== null && address !== void 0 ? address : '']) !== null && _favoritesMap !== void 0 ? _favoritesMap : false
    };
  }), [allAccounts, favoritesMap, delegations]);
  const accountsMap = useMemo(() => {
    const ret = {};
    accountsWithInfo.forEach(function (x) {
      ret[x.address] = x;
    });
    return ret;
  }, [accountsWithInfo]);
  const header = useRef([[t('accounts'), 'start', 3], [t('type')], [t('transactions'), 'media--1500'], [t('balances'), 'balances'], []]);
  useEffect(() => {
    // We add new accounts to the end
    setSorted(sortedAccounts => [...sortedAccounts.map(x => accountsWithInfo.find(y => x.address === y.address)).filter(x => !!x), ...accountsWithInfo.filter(x => !sortedAccounts.find(y => x.address === y.address))]);
  }, [accountsWithInfo]);
  const accounts = balances.accounts;
  useEffect(() => {
    setSorted(sortedAccounts => sortAccounts(sortedAccounts, accountsMap, accounts, sortBy, sortFromMax));
  }, [accountsWithInfo, accountsMap, accounts, sortBy, sortFromMax]);

  const _setBalance = useCallback((account, balance) => setBalances(({
    accounts
  }) => {
    accounts[account] = balance;

    const aggregate = key => Object.values(accounts).reduce((total, value) => total.add(value[key]), BN_ZERO);

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

  const _openCreateModal = useCallback(() => setIsCreateOpen(true), [setIsCreateOpen]);

  const accountComponents = useMemo(() => {
    const ret = {};
    accountsWithInfo.forEach(({
      account,
      address,
      delegation,
      isFavorite
    }, index) => {
      ret[address] = /*#__PURE__*/_jsx(Account, {
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

  const dropdownOptions = () => sortCategory.map(x => ({
    text: x,
    value: x
  }));

  const onSortDirectionChange = () => () => setSortBy({
    sortBy,
    sortFromMax: !sortFromMax
  });

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [isCreateOpen && /*#__PURE__*/_jsx(CreateModal, {
      onClose: toggleCreate,
      onStatusChange: onStatusChange
    }), isImportOpen && /*#__PURE__*/_jsx(ImportModal, {
      onClose: toggleImport,
      onStatusChange: onStatusChange
    }), isLedgerOpen && /*#__PURE__*/_jsx(Ledger, {
      onClose: toggleLedger
    }), isMultisigOpen && /*#__PURE__*/_jsx(Multisig, {
      onClose: toggleMultisig,
      onStatusChange: onStatusChange
    }), isProxyOpen && /*#__PURE__*/_jsx(Proxy, {
      onClose: toggleProxy,
      onStatusChange: onStatusChange
    }), isQrOpen && /*#__PURE__*/_jsx(Qr, {
      onClose: toggleQr,
      onStatusChange: onStatusChange
    }), /*#__PURE__*/_jsx(BannerExtension, {}), /*#__PURE__*/_jsx(BannerClaims, {}), /*#__PURE__*/_jsx(Summary, {
      balance: balances.summary
    }), /*#__PURE__*/_jsxs(SummaryBox, {
      children: [/*#__PURE__*/_jsxs("section", {
        className: "dropdown-section",
        "data-testid": "sort-by-section",
        children: [/*#__PURE__*/_jsx(SortDropdown, {
          defaultValue: sortBy,
          label: t('sort by'),
          onChange: onDropdownChange(),
          onClick: onSortDirectionChange(),
          options: dropdownOptions(),
          sortDirection: sortFromMax ? 'ascending' : 'descending'
        }), /*#__PURE__*/_jsx(FilterInput, {
          filterOn: filterOn,
          label: t('filter by name or tags'),
          setFilter: setFilter
        })]
      }), /*#__PURE__*/_jsxs(Button.Group, {
        children: [/*#__PURE__*/_jsx(Button, {
          icon: "plus",
          isDisabled: isIpfs,
          label: t('Add account'),
          onClick: _openCreateModal
        }), /*#__PURE__*/_jsx(Button, {
          icon: "sync",
          isDisabled: isIpfs,
          label: t('Restore JSON'),
          onClick: toggleImport
        }), /*#__PURE__*/_jsx(Button, {
          icon: "qrcode",
          label: t('Add via Qr'),
          onClick: toggleQr
        }), isLedgerEnabled && /*#__PURE__*/_jsx(_Fragment, {
          children: /*#__PURE__*/_jsx(Button, {
            icon: "project-diagram",
            label: t('Add via Ledger'),
            onClick: toggleLedger
          })
        }), /*#__PURE__*/_jsx(Button, {
          icon: "plus",
          isDisabled: !(api.tx.multisig || api.tx.utility) || !hasAccounts,
          label: t('Multisig'),
          onClick: toggleMultisig
        }), /*#__PURE__*/_jsx(Button, {
          icon: "plus",
          isDisabled: !api.tx.proxy || !hasAccounts,
          label: t('Proxied'),
          onClick: toggleProxy
        })]
      })]
    }), /*#__PURE__*/_jsx(Table, {
      empty: !isLoading && sortedAccounts && t("You don't have any accounts. Some features are currently hidden and will only become available once you have accounts."),
      header: header.current,
      withCollapsibleRows: true,
      children: !isLoading && sortedAccounts.map(({
        address
      }) => accountComponents[address])
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Overview).withConfig({
  displayName: "Accounts",
  componentId: "sc-3zcmke-0"
})([".ui--Dropdown{width:15rem;}.dropdown-section{display:flex;flex-direction:row;align-items:center;}"]));