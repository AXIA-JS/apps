// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import store from 'store';
import styled from 'styled-components';
import { withMulti, withObservable } from '@axia-js/react-api/hoc';
import { keyring } from '@axia-js/ui-keyring';
import { createOptionItem } from '@axia-js/ui-keyring/options/item';
import { isNull, isUndefined } from '@axia-js/util';
import Dropdown from "../Dropdown.js";
import Static from "../Static.js";
import { getAddressName, toAddress } from "../util/index.js";
import createHeader from "./createHeader.js";
import createItem from "./createItem.js";
import { jsx as _jsx } from "react/jsx-runtime";
const STORAGE_KEY = 'options:InputAddress';
const DEFAULT_TYPE = 'all';
const MULTI_DEFAULT = [];

function transformToAddress(value) {
  try {
    return toAddress(value) || null;
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
  const pair = keyring.getAccount(address);
  let name;

  if (pair) {
    name = pair.meta.name;
  } else {
    const addr = keyring.getAddress(address);

    if (addr) {
      name = addr.meta.name;
      isRecent = addr.meta.isRecent;
    } else {
      isRecent = true;
    }
  }

  return createItem(createOptionItem(address, name), !isRecent);
}

function readOptions() {
  return store.get(STORAGE_KEY) || {
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
  store.set(STORAGE_KEY, options);
}

class InputAddress extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {};

    this.renderLabel = ({
      value
    }) => {
      if (!value) {
        return undefined;
      }

      return getAddressName(value);
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
          matches.push(keyring.saveRecent(accountId.toString()).option);
        }
      }

      return matches.filter((item, index) => {
        const isLast = index === matches.length - 1;
        const nextItem = matches[index + 1];
        const hasNext = nextItem && nextItem.value;
        return !(isNull(item.value) || isUndefined(item.value)) || !isLast && !!hasNext;
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
        value: Array.isArray(value) ? value.map(v => toAddress(v)) : toAddress(value) || undefined
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
      return /*#__PURE__*/_jsx(Static, {
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
    const actualOptions = options ? options.map(o => createItem(o)) : isDisabled && actualValue ? [createOption(actualValue)] : this.getFiltered();

    const _defaultValue = isMultiple || !isUndefined(value) ? undefined : actualValue;

    return /*#__PURE__*/_jsx(Dropdown, {
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

const ExportedComponent = withMulti(styled(InputAddress).withConfig({
  displayName: "InputAddress__ExportedComponent",
  componentId: "sc-1371tpi-0"
})([".ui.dropdown .text{width:100%;}.ui.disabled.search{pointer-events:all;}.ui.search.selection.dropdown{> .text > .ui--KeyPair{.ui--IdentityIcon{left:-2.75rem;top:-1.05rem;> div,img,svg{height:32px !important;width:32px !important;}}.name{margin-left:0;> .ui--AccountName{height:auto;}}}> .menu > div.item > .ui--KeyPair > .name  > .ui--AccountName{height:auto;}}&.hideAddress .ui.search.selection.dropdown > .text > .ui--KeyPair .address{flex:0;max-width:0;}"]), withObservable(keyring.keyringOption.optionsSubject, {
  propName: 'optionsAll',
  transform: optionsAll => Object.entries(optionsAll).reduce((result, [type, options]) => {
    result[type] = options.map(option => option.value === null ? createHeader(option) : createItem(option));
    return result;
  }, {})
}));
ExportedComponent.createOption = createItem;
ExportedComponent.setLastValue = setLastValue;
export default ExportedComponent;