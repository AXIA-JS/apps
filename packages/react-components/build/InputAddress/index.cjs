"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _store = _interopRequireDefault(require("store"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _hoc = require("@axia-js/react-api/hoc");

var _uiKeyring = require("@axia-js/ui-keyring");

var _item = require("@axia-js/ui-keyring/options/item");

var _util = require("@axia-js/util");

var _Dropdown = _interopRequireDefault(require("../Dropdown.cjs"));

var _Static = _interopRequireDefault(require("../Static.cjs"));

var _index = require("../util/index.cjs");

var _createHeader = _interopRequireDefault(require("./createHeader.cjs"));

var _createItem = _interopRequireDefault(require("./createItem.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const STORAGE_KEY = 'options:InputAddress';
const DEFAULT_TYPE = 'all';
const MULTI_DEFAULT = [];

function transformToAddress(value) {
  try {
    return (0, _index.toAddress)(value) || null;
  } catch (error) {// noop, handled by return
  }

  return null;
}

function transformToAccountId(value) {
  if (!value) {
    return null;
  }

  const accountId = transformToAddress(value);
  return !accountId ? null : accountId;
}

function createOption(address) {
  let isRecent;

  const pair = _uiKeyring.keyring.getAccount(address);

  let name;

  if (pair) {
    name = pair.meta.name;
  } else {
    const addr = _uiKeyring.keyring.getAddress(address);

    if (addr) {
      name = addr.meta.name;
      isRecent = addr.meta.isRecent;
    } else {
      isRecent = true;
    }
  }

  return (0, _createItem.default)((0, _item.createOptionItem)(address, name), !isRecent);
}

function readOptions() {
  return _store.default.get(STORAGE_KEY) || {
    defaults: {}
  };
}

function getLastValue(type = DEFAULT_TYPE) {
  const options = readOptions();
  return options.defaults[type];
}

function setLastValue(type = DEFAULT_TYPE, value) {
  const options = readOptions();
  options.defaults[type] = value;

  _store.default.set(STORAGE_KEY, options);
}

class InputAddress extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {};

    this.renderLabel = ({
      value
    }) => {
      if (!value) {
        return undefined;
      }

      return (0, _index.getAddressName)(value);
    };

    this.onChange = address => {
      const {
        filter,
        onChange,
        type
      } = this.props;
      !filter && setLastValue(type, address);
      onChange && onChange(this.hasValue(address) ? transformToAccountId(address) : null);
    };

    this.onChangeMulti = addresses => {
      const {
        onChangeMulti
      } = this.props;

      if (onChangeMulti) {
        onChangeMulti(addresses.map(transformToAccountId).filter(address => address));
      }
    };

    this.onSearch = (filteredOptions, _query) => {
      const {
        isInput = true
      } = this.props;

      const query = _query.trim();

      const queryLower = query.toLowerCase();
      const matches = filteredOptions.filter(item => !!item.value && (item.name.toLowerCase && item.name.toLowerCase().includes(queryLower) || item.value.toLowerCase().includes(queryLower)));

      if (isInput && matches.length === 0) {
        const accountId = transformToAccountId(query);

        if (accountId) {
          matches.push(_uiKeyring.keyring.saveRecent(accountId.toString()).option);
        }
      }

      return matches.filter((item, index) => {
        const isLast = index === matches.length - 1;
        const nextItem = matches[index + 1];
        const hasNext = nextItem && nextItem.value;
        return !((0, _util.isNull)(item.value) || (0, _util.isUndefined)(item.value)) || !isLast && !!hasNext;
      });
    };
  }

  static getDerivedStateFromProps({
    type,
    value
  }, {
    lastValue
  }) {
    try {
      return {
        lastValue: lastValue || getLastValue(type),
        value: Array.isArray(value) ? value.map(v => (0, _index.toAddress)(v)) : (0, _index.toAddress)(value) || undefined
      };
    } catch (error) {
      return null;
    }
  }

  render() {
    const {
      className = '',
      defaultValue,
      help,
      hideAddress = false,
      isDisabled = false,
      isError,
      isMultiple,
      label,
      labelExtra,
      options,
      optionsAll,
      placeholder,
      type = DEFAULT_TYPE,
      withEllipsis,
      withLabel
    } = this.props;
    const hasOptions = options && options.length !== 0 || optionsAll && Object.keys(optionsAll[type]).length !== 0; // the options could be delayed, don't render without

    if (!hasOptions && !isDisabled) {
      // This is nasty, but since this things is non-functional, there is not much
      // we can do (well, wrap it, however that approach is deprecated here)
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, {
        className: className,
        help: help,
        label: label,
        children: "No accounts are available for selection."
      });
    }

    const {
      lastValue,
      value
    } = this.state;
    const lastOption = this.getLastOptionValue();
    const actualValue = transformToAddress(isDisabled || defaultValue && this.hasValue(defaultValue) ? defaultValue : this.hasValue(lastValue) ? lastValue : lastOption && lastOption.value);
    const actualOptions = options ? options.map(o => (0, _createItem.default)(o)) : isDisabled && actualValue ? [createOption(actualValue)] : this.getFiltered();

    const _defaultValue = isMultiple || !(0, _util.isUndefined)(value) ? undefined : actualValue;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dropdown.default, {
      className: `ui--InputAddress${hideAddress ? ' hideAddress' : ''} ${className}`,
      defaultValue: _defaultValue,
      help: help,
      isDisabled: isDisabled,
      isError: isError,
      isMultiple: isMultiple,
      label: label,
      labelExtra: labelExtra,
      onChange: isMultiple ? this.onChangeMulti : this.onChange,
      onSearch: this.onSearch,
      options: actualOptions,
      placeholder: placeholder,
      renderLabel: isMultiple ? this.renderLabel : undefined,
      value: isMultiple && !value ? MULTI_DEFAULT : value,
      withEllipsis: withEllipsis,
      withLabel: withLabel
    });
  }

  getLastOptionValue() {
    const available = this.getFiltered();
    return available.length ? available[available.length - 1] : undefined;
  }

  hasValue(test) {
    return this.getFiltered().some(({
      value
    }) => test === value);
  }

  getFiltered() {
    const {
      filter,
      optionsAll,
      type = DEFAULT_TYPE
    } = this.props;
    return !optionsAll ? [] : optionsAll[type].filter(({
      value
    }) => !filter || !!value && filter.includes(value));
  }

}

const ExportedComponent = (0, _hoc.withMulti)((0, _styledComponents.default)(InputAddress).withConfig({
  displayName: "InputAddress__ExportedComponent",
  componentId: "sc-1v2cy2l-0"
})([".ui.dropdown .text{width:100%;}.ui.disabled.search{pointer-events:all;}.ui.search.selection.dropdown{> .text > .ui--KeyPair{.ui--IdentityIcon{left:-2.75rem;top:-1.05rem;> div,img,svg{height:32px !important;width:32px !important;}}.name{margin-left:0;> .ui--AccountName{height:auto;}}}> .menu > div.item > .ui--KeyPair > .name  > .ui--AccountName{height:auto;}}&.hideAddress .ui.search.selection.dropdown > .text > .ui--KeyPair .address{flex:0;max-width:0;}"]), (0, _hoc.withObservable)(_uiKeyring.keyring.keyringOption.optionsSubject, {
  propName: 'optionsAll',
  transform: optionsAll => Object.entries(optionsAll).reduce((result, [type, options]) => {
    result[type] = options.map(option => option.value === null ? (0, _createHeader.default)(option) : (0, _createItem.default)(option));
    return result;
  }, {})
}));
ExportedComponent.createOption = _createItem.default;
ExportedComponent.setLastValue = setLastValue;
var _default = ExportedComponent;
exports.default = _default;