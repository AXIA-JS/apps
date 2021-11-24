import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Consts from "./Consts.js";
import Modules from "./Modules.js";
import Raw from "./Raw.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
let id = -1;

function Selection({
  basePath,
  onAdd
}) {
  const {
    t
  } = useTranslation();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'modules',
    text: t('Storage')
  }, {
    name: 'constants',
    text: t('Constants')
  }, {
    name: 'raw',
    text: t('Raw storage')
  }]);

  const _onAdd = useCallback(query => onAdd(_objectSpread(_objectSpread({}, query), {}, {
    id: ++id
  })), [onAdd]);

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/constants`,
        children: /*#__PURE__*/_jsx(Consts, {
          onAdd: _onAdd
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/raw`,
        children: /*#__PURE__*/_jsx(Raw, {
          onAdd: _onAdd
        })
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Modules, {
          onAdd: _onAdd
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Selection);