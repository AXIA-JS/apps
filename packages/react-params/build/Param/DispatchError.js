import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { Input } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Static from "./Static.js";
import Unknown from "./Unknown.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function isDispatchError(value) {
  return !!(value && (value.isModule || value.isToken));
}

function ErrorDisplay(props) {
  const {
    t
  } = useTranslation();
  const [{
    details,
    type
  }, setDetails] = useState({});
  useEffect(() => {
    const {
      value
    } = props.defaultValue || {};

    if (isDispatchError(value)) {
      if (value.isModule) {
        try {
          const mod = value.asModule;
          const {
            docs,
            name,
            section
          } = mod.registry.findMetaError(mod);
          return setDetails({
            details: docs.join(', '),
            type: `${section}.${name}`
          });
        } catch (error) {
          // Errors may not actually be exposed, in this case, just return the default representation
          console.error(error);
        }
      } else if (value.isToken) {
        return setDetails({
          details: value.asToken.type,
          type: value.type
        });
      }
    }

    setDetails({
      details: null
    });
  }, [props.defaultValue]);

  if (!props.isDisabled || !details) {
    return /*#__PURE__*/_jsx(Unknown, _objectSpread({}, props));
  }

  return /*#__PURE__*/_jsxs(Static, _objectSpread(_objectSpread({}, props), {}, {
    children: [/*#__PURE__*/_jsx(Input, {
      className: "full",
      isDisabled: true,
      label: t('type'),
      value: type
    }), details && /*#__PURE__*/_jsx(Input, {
      className: "full",
      isDisabled: true,
      label: t('details'),
      value: details
    })]
  }));
}

export default /*#__PURE__*/React.memo(ErrorDisplay);