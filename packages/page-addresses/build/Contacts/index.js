// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, FilterInput, SummaryBox, Table } from '@axia-js/react-components';
import { useAddresses, useFavorites, useLoadingDelay, useToggle } from '@axia-js/react-hooks';
import CreateModal from "../modals/Create.js";
import { useTranslation } from "../translate.js";
import Address from "./Address.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const STORE_FAVS = 'accounts:favorites';

function Overview({
  className = '',
  onStatusChange
}) {
  const {
    t
  } = useTranslation();
  const {
    allAddresses
  } = useAddresses();
  const [isCreateOpen, toggleCreate] = useToggle(false);
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS);
  const [sortedAddresses, setSortedAddresses] = useState();
  const [filterOn, setFilter] = useState('');
  const isLoading = useLoadingDelay();
  const headerRef = useRef([[t('contacts'), 'start', 2], [t('transactions'), 'number media--1500'], [t('balances'), 'balances'], [undefined, 'media--1400'], []]);
  useEffect(() => {
    setSortedAddresses(allAddresses.map(address => ({
      address,
      isFavorite: favorites.includes(address)
    })).sort((a, b) => a.isFavorite === b.isFavorite ? 0 : b.isFavorite ? 1 : -1));
  }, [allAddresses, favorites]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [isCreateOpen && /*#__PURE__*/_jsx(CreateModal, {
      onClose: toggleCreate,
      onStatusChange: onStatusChange
    }), /*#__PURE__*/_jsxs(SummaryBox, {
      className: "summary-box-contacts",
      children: [/*#__PURE__*/_jsx("section", {
        children: /*#__PURE__*/_jsx(FilterInput, {
          filterOn: filterOn,
          label: t('filter by name or tags'),
          setFilter: setFilter
        })
      }), /*#__PURE__*/_jsx(Button.Group, {
        children: /*#__PURE__*/_jsx(Button, {
          icon: "plus",
          label: t('Add contact'),
          onClick: toggleCreate
        })
      })]
    }), /*#__PURE__*/_jsx(Table, {
      empty: !isLoading && sortedAddresses && t('no addresses saved yet, add any existing address'),
      header: headerRef.current,
      withCollapsibleRows: true,
      children: !isLoading && (sortedAddresses === null || sortedAddresses === void 0 ? void 0 : sortedAddresses.map(({
        address,
        isFavorite
      }) => /*#__PURE__*/_jsx(Address, {
        address: address,
        filter: filterOn,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite
      }, address)))
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Overview).withConfig({
  displayName: "Contacts",
  componentId: "sc-1ihptlm-0"
})([".summary-box-contacts{align-items:center;}"]));