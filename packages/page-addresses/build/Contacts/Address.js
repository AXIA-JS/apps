import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Transfer from '@axia-js/app-accounts/modals/Transfer';
import { AddressInfo, AddressSmall, Button, ChainLock, ExpandButton, Forget, Icon, LinkExternal, Menu, Popup, Tags } from '@axia-js/react-components';
import { useApi, useBalancesAll, useCall, useToggle } from '@axia-js/react-hooks';
import { keyring } from '@axia-js/ui-keyring';
import { BN_ZERO, formatNumber, isFunction } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const isEditable = true;

function Address({
  address,
  className = '',
  filter,
  isFavorite,
  toggleFavorite
}) {
  var _api$api$tx$balances;

  const {
    t
  } = useTranslation();
  const {
    theme
  } = useContext(ThemeContext);
  const api = useApi();
  const info = useCall(api.api.derive.accounts.info, [address]);
  const balancesAll = useBalancesAll(address);
  const [tags, setTags] = useState([]);
  const [accName, setAccName] = useState('');
  const [current, setCurrent] = useState(null);
  const [genesisHash, setGenesisHash] = useState(null);
  const [isForgetOpen, setIsForgetOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  const _setTags = useCallback(tags => setTags(tags.sort()), []);

  useEffect(() => {
    const current = keyring.getAddress(address);
    setCurrent(current || null);
    setGenesisHash(current && current.meta.genesisHash || null); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    var _api$api$query$identi;

    const {
      identity,
      nickname
    } = info || {};

    if (isFunction((_api$api$query$identi = api.api.query.identity) === null || _api$api$query$identi === void 0 ? void 0 : _api$api$query$identi.identityOf)) {
      if (identity !== null && identity !== void 0 && identity.display) {
        setAccName(identity.display);
      }
    } else if (nickname) {
      setAccName(nickname);
    }
  }, [api, info]);
  useEffect(() => {
    var _account$meta, _account$meta2;

    const account = keyring.getAddress(address);

    _setTags((account === null || account === void 0 ? void 0 : (_account$meta = account.meta) === null || _account$meta === void 0 ? void 0 : _account$meta.tags) || []);

    setAccName((account === null || account === void 0 ? void 0 : (_account$meta2 = account.meta) === null || _account$meta2 === void 0 ? void 0 : _account$meta2.name) || '');
  }, [_setTags, address]);
  useEffect(() => {
    if (filter.length === 0) {
      setIsVisible(true);
    } else {
      const _filter = filter.toLowerCase();

      setIsVisible(tags.reduce((result, tag) => {
        return result || tag.toLowerCase().includes(_filter);
      }, accName.toLowerCase().includes(_filter)));
    }
  }, [accName, filter, tags]);

  const _onGenesisChange = useCallback(genesisHash => {
    setGenesisHash(genesisHash);
    const account = keyring.getAddress(address);
    account && keyring.saveAddress(address, _objectSpread(_objectSpread({}, account.meta), {}, {
      genesisHash
    }));
    setGenesisHash(genesisHash);
  }, [address]);

  const _onFavorite = useCallback(() => toggleFavorite(address), [address, toggleFavorite]);

  const _toggleForget = useCallback(() => setIsForgetOpen(!isForgetOpen), [isForgetOpen]);

  const _toggleTransfer = useCallback(() => setIsTransferOpen(!isTransferOpen), [isTransferOpen]);

  const _onForget = useCallback(() => {
    if (address) {
      const status = {
        account: address,
        action: 'forget'
      };

      try {
        keyring.forgetAddress(address);
        status.status = 'success';
        status.message = t('address forgotten');
      } catch (error) {
        status.status = 'error';
        status.message = error.message;
      }
    }
  }, [address, t]);

  if (!isVisible) {
    return null;
  }

  const PopupDropdown = /*#__PURE__*/_jsxs(Menu, {
    children: [/*#__PURE__*/_jsx(Menu.Item, {
      disabled: !isEditable,
      onClick: _toggleForget,
      children: t('Forget this address')
    }), isEditable && !api.isDevelopment && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Menu.Divider, {}), /*#__PURE__*/_jsx(ChainLock, {
        className: "addresses--network-toggle",
        genesisHash: genesisHash,
        onChange: _onGenesisChange
      })]
    })]
  });

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("tr", {
      className: `${className}${isExpanded ? ' noBorder' : ''}`,
      children: [/*#__PURE__*/_jsx("td", {
        className: "favorite",
        children: /*#__PURE__*/_jsx(Icon, {
          color: isFavorite ? 'orange' : 'gray',
          icon: "star",
          onClick: _onFavorite
        })
      }), /*#__PURE__*/_jsxs("td", {
        className: "address",
        children: [/*#__PURE__*/_jsx(AddressSmall, {
          value: address
        }), address && current && /*#__PURE__*/_jsxs(_Fragment, {
          children: [isForgetOpen && /*#__PURE__*/_jsx(Forget, {
            address: current.address,
            mode: "address",
            onClose: _toggleForget,
            onForget: _onForget
          }, 'modal-forget-account'), isTransferOpen && /*#__PURE__*/_jsx(Transfer, {
            onClose: _toggleTransfer,
            recipientId: address
          }, 'modal-transfer')]
        })]
      }), /*#__PURE__*/_jsx("td", {
        className: "number media--1500",
        children: (balancesAll === null || balancesAll === void 0 ? void 0 : balancesAll.accountNonce.gt(BN_ZERO)) && formatNumber(balancesAll.accountNonce)
      }), /*#__PURE__*/_jsx("td", {
        className: "number",
        children: /*#__PURE__*/_jsx(AddressInfo, {
          address: address,
          balancesAll: balancesAll,
          withBalance: {
            available: false,
            bonded: false,
            locked: false,
            redeemable: false,
            reserved: false,
            total: true,
            unlocking: false,
            vested: false
          },
          withExtended: false
        })
      }), /*#__PURE__*/_jsx("td", {
        className: "links media--1400",
        children: /*#__PURE__*/_jsx(LinkExternal, {
          className: "ui--AddressCard-exporer-link",
          data: address,
          isLogo: true,
          type: "address"
        })
      }), /*#__PURE__*/_jsx("td", {
        className: "fast-actions-addresses",
        children: /*#__PURE__*/_jsxs("div", {
          className: "fast-actions-row",
          children: [isFunction((_api$api$tx$balances = api.api.tx.balances) === null || _api$api$tx$balances === void 0 ? void 0 : _api$api$tx$balances.transfer) && /*#__PURE__*/_jsx(Button, {
            className: "send-button",
            icon: "paper-plane",
            label: t('send'),
            onClick: _toggleTransfer
          }, 'send'), /*#__PURE__*/_jsx(Popup, {
            className: `theme--${theme}`,
            value: PopupDropdown
          }), /*#__PURE__*/_jsx(ExpandButton, {
            expanded: isExpanded,
            onClick: toggleIsExpanded
          })]
        })
      })]
    }), /*#__PURE__*/_jsxs("tr", {
      className: `${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`,
      children: [/*#__PURE__*/_jsx("td", {}), /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx("div", {
          className: "tags",
          "data-testid": "tags",
          children: /*#__PURE__*/_jsx(Tags, {
            value: tags,
            withTitle: true
          })
        })
      }), /*#__PURE__*/_jsx("td", {
        className: "number media--1500"
      }), /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(AddressInfo, {
          address: address,
          balancesAll: balancesAll,
          withBalance: {
            available: true,
            bonded: true,
            locked: true,
            redeemable: true,
            reserved: true,
            total: false,
            unlocking: true,
            vested: true
          },
          withExtended: false
        })
      }), /*#__PURE__*/_jsx("td", {
        colSpan: 2
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Address).withConfig({
  displayName: "Address",
  componentId: "sc-1jj5ed9-0"
})(["&.isCollapsed{visibility:collapse;}&.isExpanded{visibility:visible;}.tags{width:100%;min-height:1.5rem;}&& td.button{padding-bottom:0.5rem;}.fast-actions-addresses{padding-left:0.2rem;padding-right:1rem;width:1%;.fast-actions-row{display:flex;align-items:center;justify-content:flex-end;& > * + *{margin-left:0.35rem;}.send-button{min-width:6.5rem;}}}"]));