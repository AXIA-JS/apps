import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Input } from '@axia-js/react-components';
import Params from '@axia-js/react-params';
import { getTypeDef } from '@axia-js/types';
import { useTranslation } from "./translate.js";
import { getContractAbi } from "./util/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function EventDisplay({
  children,
  className = '',
  value
}) {
  const {
    t
  } = useTranslation();
  const params = value.typeDef.map(({
    type
  }) => ({
    type: getTypeDef(type)
  }));
  const values = value.data.map(value => ({
    isValid: true,
    value
  }));
  const abiEvent = useMemo(() => {
    // for contracts, we decode the actual event
    if (value.section === 'contracts' && value.method === 'ContractExecution' && value.data.length === 2) {
      // see if we have info for this contract
      const [accountId, encoded] = value.data;

      try {
        const abi = getContractAbi(accountId.toString());

        if (abi) {
          const decoded = abi.decodeEvent(encoded);
          return _objectSpread(_objectSpread({}, decoded), {}, {
            values: decoded.args.map(value => ({
              isValid: true,
              value
            }))
          });
        }
      } catch (error) {
        // ABI mismatch?
        console.error(error);
      }
    }

    return null;
  }, [value]);
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Event ${className}`,
    children: [children, /*#__PURE__*/_jsx(Params, {
      isDisabled: true,
      params: params,
      values: values,
      children: abiEvent && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Input, {
          isDisabled: true,
          label: t('contract event'),
          value: abiEvent.event.identifier
        }), /*#__PURE__*/_jsx(Params, {
          isDisabled: true,
          params: abiEvent.event.args,
          values: abiEvent.values
        })]
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(EventDisplay);