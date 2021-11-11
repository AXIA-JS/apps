"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Consts({
  onAdd
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [defaultValue] = (0, _react.useState)(() => {
    const section = Object.keys(api.consts)[0];
    const method = Object.keys(api.consts[section])[0];
    return {
      meta: api.consts[section][method].meta,
      method,
      section
    };
  });
  const [value, setValue] = (0, _react.useState)(defaultValue);

  const _onAdd = (0, _react.useCallback)(() => onAdd({
    isConst: true,
    key: value
  }), [onAdd, value]);

  const {
    method,
    section
  } = value;
  const meta = api.consts[section][method].meta;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "storage--actionrow",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "storage--actionrow-value",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputConsts, {
        defaultValue: defaultValue,
        help: meta === null || meta === void 0 ? void 0 : meta.docs.join(' '),
        label: t('selected constant query'),
        onChange: setValue
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "storage--actionrow-buttons",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        onClick: _onAdd
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Consts);

exports.default = _default;