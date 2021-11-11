"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Transfer = _interopRequireDefault(require("@axia-js/app-accounts/modals/Transfer"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _uiKeyring = require("@axia-js/ui-keyring");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  } = (0, _translate.useTranslation)();
  const {
    theme
  } = (0, _react.useContext)(_styledComponents.ThemeContext);
  const api = (0, _reactHooks.useApi)();
  const info = (0, _reactHooks.useCall)(api.api.derive.accounts.info, [address]);
  const balancesAll = (0, _reactHooks.useBalancesAll)(address);
  const [tags, setTags] = (0, _react.useState)([]);
  const [accName, setAccName] = (0, _react.useState)('');
  const [current, setCurrent] = (0, _react.useState)(null);
  const [genesisHash, setGenesisHash] = (0, _react.useState)(null);
  const [isForgetOpen, setIsForgetOpen] = (0, _react.useState)(false);
  const [isTransferOpen, setIsTransferOpen] = (0, _react.useState)(false);
  const [isVisible, setIsVisible] = (0, _react.useState)(true);
  const [isExpanded, toggleIsExpanded] = (0, _reactHooks.useToggle)(false);

  const _setTags = (0, _react.useCallback)(tags => setTags(tags.sort()), []);

  (0, _react.useEffect)(() => {
    const current = _uiKeyring.keyring.getAddress(address);

    setCurrent(current || null);
    setGenesisHash(current && current.meta.genesisHash || null); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(() => {
    var _api$api$query$identi;

    const {
      identity,
      nickname
    } = info || {};

    if ((0, _util.isFunction)((_api$api$query$identi = api.api.query.identity) === null || _api$api$query$identi === void 0 ? void 0 : _api$api$query$identi.identityOf)) {
      if (identity !== null && identity !== void 0 && identity.display) {
        setAccName(identity.display);
      }
    } else if (nickname) {
      setAccName(nickname);
    }
  }, [api, info]);
  (0, _react.useEffect)(() => {
    var _account$meta, _account$meta2;

    const account = _uiKeyring.keyring.getAddress(address);

    _setTags((account === null || account === void 0 ? void 0 : (_account$meta = account.meta) === null || _account$meta === void 0 ? void 0 : _account$meta.tags) || []);

    setAccName((account === null || account === void 0 ? void 0 : (_account$meta2 = account.meta) === null || _account$meta2 === void 0 ? void 0 : _account$meta2.name) || '');
  }, [_setTags, address]);
  (0, _react.useEffect)(() => {
    if (filter.length === 0) {
      setIsVisible(true);
    } else {
      const _filter = filter.toLowerCase();

      setIsVisible(tags.reduce((result, tag) => {
        return result || tag.toLowerCase().includes(_filter);
      }, accName.toLowerCase().includes(_filter)));
    }
  }, [accName, filter, tags]);

  const _onGenesisChange = (0, _react.useCallback)(genesisHash => {
    setGenesisHash(genesisHash);

    const account = _uiKeyring.keyring.getAddress(address);

    account && _uiKeyring.keyring.saveAddress(address, _objectSpread(_objectSpread({}, account.meta), {}, {
      genesisHash
    }));
    setGenesisHash(genesisHash);
  }, [address]);

  const _onFavorite = (0, _react.useCallback)(() => toggleFavorite(address), [address, toggleFavorite]);

  const _toggleForget = (0, _react.useCallback)(() => setIsForgetOpen(!isForgetOpen), [isForgetOpen]);

  const _toggleTransfer = (0, _react.useCallback)(() => setIsTransferOpen(!isTransferOpen), [isTransferOpen]);

  const _onForget = (0, _react.useCallback)(() => {
    if (address) {
      const status = {
        account: address,
        action: 'forget'
      };

      try {
        _uiKeyring.keyring.forgetAddress(address);

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

  const PopupDropdown = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Menu, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
      disabled: !isEditable,
      onClick: _toggleForget,
      children: t('Forget this address')
    }), isEditable && !api.isDevelopment && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Divider, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ChainLock, {
        className: "addresses--network-toggle",
        genesisHash: genesisHash,
        onChange: _onGenesisChange
      })]
    })]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      className: `${className}${isExpanded ? ' noBorder' : ''}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "favorite",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
          color: isFavorite ? 'orange' : 'gray',
          icon: "star",
          onClick: _onFavorite
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
        className: "address",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
          value: address
        }), address && current && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [isForgetOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Forget, {
            address: current.address,
            mode: "address",
            onClose: _toggleForget,
            onForget: _onForget
          }, 'modal-forget-account'), isTransferOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Transfer.default, {
            onClose: _toggleTransfer,
            recipientId: address
          }, 'modal-transfer')]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number media--1500",
        children: (balancesAll === null || balancesAll === void 0 ? void 0 : balancesAll.accountNonce.gt(_util.BN_ZERO)) && (0, _util.formatNumber)(balancesAll.accountNonce)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressInfo, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "links media--1400",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
          className: "ui--AddressCard-exporer-link",
          data: address,
          isLogo: true,
          type: "address"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "fast-actions-addresses",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "fast-actions-row",
          children: [(0, _util.isFunction)((_api$api$tx$balances = api.api.tx.balances) === null || _api$api$tx$balances === void 0 ? void 0 : _api$api$tx$balances.transfer) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            className: "send-button",
            icon: "paper-plane",
            label: t('send'),
            onClick: _toggleTransfer
          }, 'send'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Popup, {
            className: `theme--${theme}`,
            value: PopupDropdown
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ExpandButton, {
            expanded: isExpanded,
            onClick: toggleIsExpanded
          })]
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
      className: `${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "tags",
          "data-testid": "tags",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tags, {
            value: tags,
            withTitle: true
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        className: "number media--1500"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressInfo, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
        colSpan: 2
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Address).withConfig({
  displayName: "Address",
  componentId: "sc-1slihin-0"
})(["&.isCollapsed{visibility:collapse;}&.isExpanded{visibility:visible;}.tags{width:100%;min-height:1.5rem;}&& td.button{padding-bottom:0.5rem;}.fast-actions-addresses{padding-left:0.2rem;padding-right:1rem;width:1%;.fast-actions-row{display:flex;align-items:center;justify-content:flex-end;& > * + *{margin-left:0.35rem;}.send-button{min-width:6.5rem;}}}"]));

exports.default = _default;