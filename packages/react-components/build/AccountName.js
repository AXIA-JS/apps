// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AccountSidebarToggle } from '@axia-js/app-accounts/Sidebar';
import registry from '@axia-js/react-api/typeRegistry';
import { useApi, useCall } from '@axia-js/react-hooks';
import { isFunction, stringToU8a } from '@axia-js/util';
import Badge from "./Badge.js";
import { getAddressName } from "./util/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const KNOWN = [[registry.createType('AccountId', stringToU8a('modlpy/socie'.padEnd(32, '\0'))), 'Society'], [registry.createType('AccountId', stringToU8a('modlpy/trsry'.padEnd(32, '\0'))), 'Treasury']];
const displayCache = new Map();
const indexCache = new Map();
const parentCache = new Map();
export function getParentAccount(value) {
  return parentCache.get(value);
}

function defaultOrAddr(defaultName = '', _address, _accountIndex) {
  const known = KNOWN.find(([known]) => known.eq(_address));

  if (known) {
    return [known[1], false, false, true];
  }

  const accountId = _address.toString();

  if (!accountId) {
    return [defaultName, false, false, false];
  }

  const [isAddressExtracted,, extracted] = getAddressName(accountId, null, defaultName);
  const accountIndex = (_accountIndex || '').toString() || indexCache.get(accountId);

  if (isAddressExtracted && accountIndex) {
    indexCache.set(accountId, accountIndex);
    return [accountIndex, false, true, false];
  }

  return [extracted, !isAddressExtracted, isAddressExtracted, false];
}

function extractName(address, accountIndex, defaultName) {
  const displayCached = displayCache.get(address);

  if (displayCached) {
    return displayCached;
  }

  const [displayName, isLocal, isAddress, isSpecial] = defaultOrAddr(defaultName, address, accountIndex);
  return /*#__PURE__*/_jsxs("div", {
    className: "via-identity",
    children: [isSpecial && /*#__PURE__*/_jsx(Badge, {
      color: "green",
      icon: "archway",
      isSmall: true
    }), /*#__PURE__*/_jsx("span", {
      className: `name${isLocal || isSpecial ? ' isLocal' : isAddress ? ' isAddress' : ''}`,
      children: displayName
    })]
  });
}

function createIdElem(nameElem, color, icon) {
  return /*#__PURE__*/_jsxs("div", {
    className: "via-identity",
    children: [/*#__PURE__*/_jsx(Badge, {
      color: color,
      icon: icon,
      isSmall: true
    }), nameElem]
  });
}

function extractIdentity(address, identity) {
  const judgements = identity.judgements.filter(([, judgement]) => !judgement.isFeePaid);
  const isGood = judgements.some(([, judgement]) => judgement.isKnownGood || judgement.isReasonable);
  const isBad = judgements.some(([, judgement]) => judgement.isErroneous || judgement.isLowQuality);
  const displayName = isGood ? identity.display : (identity.display || '').replace(/[^\x20-\x7E]/g, '');
  const displayParent = identity.displayParent && (isGood ? identity.displayParent : identity.displayParent.replace(/[^\x20-\x7E]/g, ''));
  const elem = createIdElem( /*#__PURE__*/_jsxs("span", {
    className: `name${isGood && !isBad ? ' isGood' : ''}`,
    children: [/*#__PURE__*/_jsx("span", {
      className: "top",
      children: displayParent || displayName
    }), displayParent && /*#__PURE__*/_jsx("span", {
      className: "sub",
      children: `/${displayName || ''}`
    })]
  }), isBad ? 'red' : isGood ? 'green' : 'gray', identity.parent ? 'link' : isGood && !isBad ? 'check' : 'minus');
  displayCache.set(address, elem);
  return elem;
}

function AccountName({
  children,
  className = '',
  defaultName,
  label,
  onClick,
  override,
  toggle,
  value,
  withSidebar
}) {
  const {
    api
  } = useApi();
  const info = useCall(api.derive.accounts.info, [value]);
  const [name, setName] = useState(() => extractName((value || '').toString(), undefined, defaultName));
  const toggleSidebar = useContext(AccountSidebarToggle); // set the actual nickname, local name, accountIndex, accountId

  useEffect(() => {
    var _api$query$identity;

    const {
      accountId,
      accountIndex,
      identity,
      nickname
    } = info || {};
    const cacheAddr = (accountId || value || '').toString();

    if (identity !== null && identity !== void 0 && identity.parent) {
      parentCache.set(cacheAddr, identity.parent.toString());
    }

    if (isFunction((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.identityOf)) {
      setName(() => identity !== null && identity !== void 0 && identity.display ? extractIdentity(cacheAddr, identity) : extractName(cacheAddr, accountIndex));
    } else if (nickname) {
      setName(nickname);
    } else {
      setName(defaultOrAddr(defaultName, cacheAddr, accountIndex));
    }
  }, [api, defaultName, info, toggle, value]);

  const _onNameEdit = useCallback(() => setName(defaultOrAddr(defaultName, (value || '').toString())), [defaultName, value]);

  const _onToggleSidebar = useCallback(() => toggleSidebar && value && toggleSidebar([value.toString(), _onNameEdit]), [_onNameEdit, toggleSidebar, value]);

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--AccountName${withSidebar ? ' withSidebar' : ''} ${className}`,
    "data-testid": "account-name",
    onClick: withSidebar ? _onToggleSidebar : onClick,
    children: [label || '', override || name, children]
  });
}

export default /*#__PURE__*/React.memo(styled(AccountName).withConfig({
  displayName: "AccountName",
  componentId: "sc-12wd6cp-0"
})(["align-items:center;border:1px dotted transparent;display:inline-flex;vertical-align:middle;white-space:nowrap;&.withSidebar:hover{border-bottom-color:#333;cursor:help !important;}.via-identity{align-items:center;display:inline-flex;width:100%;.name{align-items:center;display:inline-flex;font-weight:var(--font-weight-normal) !important;filter:grayscale(100%);line-height:1;opacity:0.6;overflow:hidden;text-overflow:ellipsis;&:not(.isAddress){text-transform:uppercase;}&.isAddress{font:var(--font-mono);text-transform:none;}&.isGood,&.isLocal{opacity:1;}.sub,.top{vertical-align:middle;}.sub{font-size:0.75rem;opacity:0.75;}}}"]));