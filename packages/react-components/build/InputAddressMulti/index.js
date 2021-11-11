// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce, useLoadingDelay } from '@axia-js/react-hooks';
import Input from "../Input.js";
import Spinner from "../Spinner.js";
import { useTranslation } from "../translate.js";
import Available from "./Available.js";
import Selected from "./Selected.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function InputAddressMulti({
  available,
  availableLabel,
  className = '',
  defaultValue,
  maxCount,
  onChange,
  valueLabel
}) {
  const {
    t
  } = useTranslation();
  const [_filter, setFilter] = useState('');
  const [selected, setSelected] = useState([]);
  const filter = useDebounce(_filter);
  const isLoading = useLoadingDelay();
  useEffect(() => {
    defaultValue && setSelected(defaultValue);
  }, [defaultValue]);
  useEffect(() => {
    selected && onChange(selected);
  }, [onChange, selected]);

  const _onSelect = useCallback(address => setSelected(selected => !selected.includes(address) && selected.length < maxCount ? selected.concat(address) : selected), [maxCount]);

  const _onDeselect = useCallback(address => setSelected(selected => selected.includes(address) ? selected.filter(a => a !== address) : selected), []);

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--InputAddressMulti ${className}`,
    children: [/*#__PURE__*/_jsx(Input, {
      autoFocus: true,
      className: "ui--InputAddressMulti-Input",
      isSmall: true,
      onChange: setFilter,
      placeholder: t('filter by name, address, or account index'),
      value: _filter,
      withLabel: false
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--InputAddressMulti-columns",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "ui--InputAddressMulti-column",
        children: [/*#__PURE__*/_jsx("label", {
          children: valueLabel
        }), /*#__PURE__*/_jsx("div", {
          className: "ui--InputAddressMulti-items",
          children: selected.map(address => /*#__PURE__*/_jsx(Selected, {
            address: address,
            onDeselect: _onDeselect
          }, address))
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "ui--InputAddressMulti-column",
        children: [/*#__PURE__*/_jsx("label", {
          children: availableLabel
        }), /*#__PURE__*/_jsx("div", {
          className: "ui--InputAddressMulti-items",
          children: isLoading ? /*#__PURE__*/_jsx(Spinner, {}) : available.map(address => /*#__PURE__*/_jsx(Available, {
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

export default /*#__PURE__*/React.memo(styled(InputAddressMulti).withConfig({
  displayName: "InputAddressMulti",
  componentId: "sc-1v7wfag-0"
})(["border-top-width:0px;margin-left:2rem;width:calc(100% - 2rem);.ui--InputAddressMulti-Input{.ui.input{margin-bottom:0.25rem;opacity:1 !important;}}.ui--InputAddressMulti-columns{display:inline-flex;flex-direction:row-reverse;justify-content:space-between;width:100%;.ui--InputAddressMulti-column{display:flex;flex-direction:column;min-height:15rem;max-height:15rem;width:50%;padding:0.25rem 0.5rem;.ui--InputAddressMulti-items{padding:0.5rem 0;background:var(--bg-input);border:1px solid var(--border-input);border-radius:0.286rem 0.286rem;flex:1;overflow-y:auto;overflow-x:hidden;.ui--Spinner{margin-top:2rem;}.ui--AddressToggle{padding-left:0.75rem;}.ui--AddressMini-address{min-width:auto;max-width:100%;}.ui--AddressMini-info{max-width:100%;}}}}"]));