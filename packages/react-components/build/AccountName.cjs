"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getParentAccount = getParentAccount;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Sidebar = require("@axia-js/app-accounts/Sidebar");

var _typeRegistry = _interopRequireDefault(require("@axia-js/react-api/typeRegistry"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _Badge = _interopRequireDefault(require("./Badge.cjs"));

var _index = require("./util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
const KNOWN = [[_typeRegistry.default.createType('AccountId', (0, _util.stringToU8a)('modlpy/socie'.padEnd(32, '\0'))), 'Society'], [_typeRegistry.default.createType('AccountId', (0, _util.stringToU8a)('modlpy/trsry'.padEnd(32, '\0'))), 'Treasury']];
const displayCache = new Map();
const indexCache = new Map();
const parentCache = new Map();

function getParentAccount(value) {
  return parentCache.get(value);
}

function defaultOrAddr() {
  let defaultName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  let _address = arguments.length > 1 ? arguments[1] : undefined;

  let _accountIndex = arguments.length > 2 ? arguments[2] : undefined;

  const known = KNOWN.find(_ref => {
    let [known] = _ref;
    return known.eq(_address);
  });

  if (known) {
    return [known[1], false, false, true];
  }

  const accountId = _address.toString();

  if (!accountId) {
    return [defaultName, false, false, false];
  }

  const [isAddressExtracted,, extracted] = (0, _index.getAddressName)(accountId, null, defaultName);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "via-identity",
    children: [isSpecial && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Badge.default, {
      color: "green",
      icon: "archway",
      isSmall: true
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: `name${isLocal || isSpecial ? ' isLocal' : isAddress ? ' isAddress' : ''}`,
      children: displayName
    })]
  });
}

function createIdElem(nameElem, color, icon) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "via-identity",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Badge.default, {
      color: color,
      icon: icon,
      isSmall: true
    }), nameElem]
  });
}

function extractIdentity(address, identity) {
  const judgements = identity.judgements.filter(_ref2 => {
    let [, judgement] = _ref2;
    return !judgement.isFeePaid;
  });
  const isGood = judgements.some(_ref3 => {
    let [, judgement] = _ref3;
    return judgement.isKnownGood || judgement.isReasonable;
  });
  const isBad = judgements.some(_ref4 => {
    let [, judgement] = _ref4;
    return judgement.isErroneous || judgement.isLowQuality;
  });
  const displayName = isGood ? identity.display : (identity.display || '').replace(/[^\x20-\x7E]/g, '');
  const displayParent = identity.displayParent && (isGood ? identity.displayParent : identity.displayParent.replace(/[^\x20-\x7E]/g, ''));
  const elem = createIdElem( /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: `name${isGood && !isBad ? ' isGood' : ''}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "top",
      children: displayParent || displayName
    }), displayParent && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "sub",
      children: `/${displayName || ''}`
    })]
  }), isBad ? 'red' : isGood ? 'green' : 'gray', identity.parent ? 'link' : isGood && !isBad ? 'check' : 'minus');
  displayCache.set(address, elem);
  return elem;
}

function AccountName(_ref5) {
  let {
    children,
    className = '',
    defaultName,
    label,
    onClick,
    override,
    toggle,
    value,
    withSidebar
  } = _ref5;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const info = (0, _reactHooks.useCall)(api.derive.accounts.info, [value]);
  const [name, setName] = (0, _react.useState)(() => extractName((value || '').toString(), undefined, defaultName));
  const toggleSidebar = (0, _react.useContext)(_Sidebar.AccountSidebarToggle); // set the actual nickname, local name, accountIndex, accountId

  (0, _react.useEffect)(() => {
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

    if ((0, _util.isFunction)((_api$query$identity = api.query.identity) === null || _api$query$identity === void 0 ? void 0 : _api$query$identity.identityOf)) {
      setName(() => identity !== null && identity !== void 0 && identity.display ? extractIdentity(cacheAddr, identity) : extractName(cacheAddr, accountIndex));
    } else if (nickname) {
      setName(nickname);
    } else {
      setName(defaultOrAddr(defaultName, cacheAddr, accountIndex));
    }
  }, [api, defaultName, info, toggle, value]);

  const _onNameEdit = (0, _react.useCallback)(() => setName(defaultOrAddr(defaultName, (value || '').toString())), [defaultName, value]);

  const _onToggleSidebar = (0, _react.useCallback)(() => toggleSidebar && value && toggleSidebar([value.toString(), _onNameEdit]), [_onNameEdit, toggleSidebar, value]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--AccountName${withSidebar ? ' withSidebar' : ''} ${className}`,
    "data-testid": "account-name",
    onClick: withSidebar ? _onToggleSidebar : onClick,
    children: [label || '', override || name, children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AccountName).withConfig({
  displayName: "AccountName",
  componentId: "sc-12wd6cp-0"
})(["align-items:center;border:1px dotted transparent;display:inline-flex;vertical-align:middle;white-space:nowrap;&.withSidebar:hover{border-bottom-color:#333;cursor:help !important;}.via-identity{align-items:center;display:inline-flex;width:100%;.name{align-items:center;display:inline-flex;font-weight:var(--font-weight-normal) !important;filter:grayscale(100%);line-height:1;opacity:0.6;overflow:hidden;text-overflow:ellipsis;&:not(.isAddress){text-transform:uppercase;}&.isAddress{font:var(--font-mono);text-transform:none;}&.isGood,&.isLocal{opacity:1;}.sub,.top{vertical-align:middle;}.sub{font-size:0.75rem;opacity:0.75;}}}"]));

exports.default = _default;