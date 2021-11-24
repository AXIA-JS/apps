"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _Input = _interopRequireDefault(require("../Input.cjs"));

var _Spinner = _interopRequireDefault(require("../Spinner.cjs"));

var _translate = require("../translate.cjs");

var _Available = _interopRequireDefault(require("./Available.cjs"));

var _Selected = _interopRequireDefault(require("./Selected.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function InputAddressMulti(_ref) {
  let {
    available,
    availableLabel,
    className = '',
    defaultValue,
    maxCount,
    onChange,
    valueLabel
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [_filter, setFilter] = (0, _react.useState)('');
  const [selected, setSelected] = (0, _react.useState)([]);
  const filter = (0, _reactHooks.useDebounce)(_filter);
  const isLoading = (0, _reactHooks.useLoadingDelay)();
  (0, _react.useEffect)(() => {
    defaultValue && setSelected(defaultValue);
  }, [defaultValue]);
  (0, _react.useEffect)(() => {
    selected && onChange(selected);
  }, [onChange, selected]);

  const _onSelect = (0, _react.useCallback)(address => setSelected(selected => !selected.includes(address) && selected.length < maxCount ? selected.concat(address) : selected), [maxCount]);

  const _onDeselect = (0, _react.useCallback)(address => setSelected(selected => selected.includes(address) ? selected.filter(a => a !== address) : selected), []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--InputAddressMulti ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Input.default, {
      autoFocus: true,
      className: "ui--InputAddressMulti-Input",
      isSmall: true,
      onChange: setFilter,
      placeholder: t('filter by name, address, or account index'),
      value: _filter,
      withLabel: false
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--InputAddressMulti-columns",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--InputAddressMulti-column",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          children: valueLabel
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "ui--InputAddressMulti-items",
          children: selected.map(address => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Selected.default, {
            address: address,
            onDeselect: _onDeselect
          }, address))
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--InputAddressMulti-column",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          children: availableLabel
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "ui--InputAddressMulti-items",
          children: isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.default, {}) : available.map(address => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Available.default, {
            address: address,
            filter: filter,
            isHidden: selected === null || selected === void 0 ? void 0 : selected.includes(address),
            onSelect: _onSelect
          }, address))
        })]
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InputAddressMulti).withConfig({
  displayName: "InputAddressMulti",
  componentId: "sc-18pbi1w-0"
})(["border-top-width:0px;margin-left:2rem;width:calc(100% - 2rem);.ui--InputAddressMulti-Input{.ui.input{margin-bottom:0.25rem;opacity:1 !important;}}.ui--InputAddressMulti-columns{display:inline-flex;flex-direction:row-reverse;justify-content:space-between;width:100%;.ui--InputAddressMulti-column{display:flex;flex-direction:column;min-height:15rem;max-height:15rem;width:50%;padding:0.25rem 0.5rem;.ui--InputAddressMulti-items{padding:0.5rem 0;background:var(--bg-input);border:1px solid var(--border-input);border-radius:0.286rem 0.286rem;flex:1;overflow-y:auto;overflow-x:hidden;.ui--Spinner{margin-top:2rem;}.ui--AddressToggle{padding-left:0.75rem;}.ui--AddressMini-address{min-width:auto;max-width:100%;}.ui--AddressMini-info{max-width:100%;}}}}"]));

exports.default = _default;