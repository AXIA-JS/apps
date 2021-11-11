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

var _Create = _interopRequireDefault(require("../modals/Create.cjs"));

var _translate = require("../translate.cjs");

var _Address = _interopRequireDefault(require("./Address.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0
const STORE_FAVS = 'accounts:favorites';

function Overview({
  className = '',
  onStatusChange
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    allAddresses
  } = (0, _reactHooks.useAddresses)();
  const [isCreateOpen, toggleCreate] = (0, _reactHooks.useToggle)(false);
  const [favorites, toggleFavorite] = (0, _reactHooks.useFavorites)(STORE_FAVS);
  const [sortedAddresses, setSortedAddresses] = (0, _react.useState)();
  const [filterOn, setFilter] = (0, _react.useState)('');
  const isLoading = (0, _reactHooks.useLoadingDelay)();
  const headerRef = (0, _react.useRef)([[t('contacts'), 'start', 2], [t('transactions'), 'number media--1500'], [t('balances'), 'balances'], [undefined, 'media--1400'], []]);
  (0, _react.useEffect)(() => {
    setSortedAddresses(allAddresses.map(address => ({
      address,
      isFavorite: favorites.includes(address)
    })).sort((a, b) => a.isFavorite === b.isFavorite ? 0 : b.isFavorite ? 1 : -1));
  }, [allAddresses, favorites]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [isCreateOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Create.default, {
      onClose: toggleCreate,
      onStatusChange: onStatusChange
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
      className: "summary-box-contacts",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.FilterInput, {
          filterOn: filterOn,
          label: t('filter by name or tags'),
          setFilter: setFilter
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "plus",
          label: t('Add contact'),
          onClick: toggleCreate
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: !isLoading && sortedAddresses && t('no addresses saved yet, add any existing address'),
      header: headerRef.current,
      withCollapsibleRows: true,
      children: !isLoading && (sortedAddresses === null || sortedAddresses === void 0 ? void 0 : sortedAddresses.map(({
        address,
        isFavorite
      }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Address.default, {
        address: address,
        filter: filterOn,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite
      }, address)))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Overview).withConfig({
  displayName: "Contacts",
  componentId: "sc-1ihptlm-0"
})([".summary-box-contacts{align-items:center;}"]));

exports.default = _default;