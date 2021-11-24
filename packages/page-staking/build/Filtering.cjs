"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _queryString = _interopRequireDefault(require("query-string"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Filtering(_ref) {
  let {
    children,
    className,
    nameFilter,
    setNameFilter,
    setWithIdentity,
    withIdentity
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)(); // on load, parse the query string and extract the filter

  (0, _react.useEffect)(() => {
    const queryFilter = _queryString.default.parse(location.href.split('?')[1]).filter;

    if ((0, _util.isString)(queryFilter)) {
      setNameFilter(queryFilter, true);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const _setNameFilter = (0, _react.useCallback)(value => setNameFilter(value, false), [setNameFilter]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      autoFocus: true,
      isFull: true,
      label: t('filter by name, address or index'),
      onChange: _setNameFilter,
      value: nameFilter
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "staking--optionsBar",
      children: [children, api.query.identity && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        className: "staking--buttonToggle",
        label: t('only with an identity'),
        onChange: setWithIdentity,
        value: withIdentity
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Filtering);

exports.default = _default;