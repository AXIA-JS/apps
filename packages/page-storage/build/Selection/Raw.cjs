"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-storage authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Raw({
  onAdd
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [{
    isValid,
    key
  }, setValue] = (0, _react.useState)({
    isValid: false,
    key: new Uint8Array([])
  });

  const _onAdd = (0, _react.useCallback)(() => {
    isValid && onAdd({
      isConst: false,
      key
    });
  }, [isValid, key, onAdd]);

  const _onChangeKey = (0, _react.useCallback)(key => {
    const u8a = (0, _util.u8aToU8a)(key);
    setValue({
      isValid: u8a.length !== 0,
      key: (0, _util.compactAddLength)(u8a)
    });
  }, []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "storage--actionrow",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "storage--actionrow-value",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        autoFocus: true,
        label: t('hex-encoded storage key'),
        onChange: _onChangeKey,
        onEnter: _onAdd
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "storage--actionrow-buttons",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        isDisabled: !isValid,
        onClick: _onAdd
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Raw);

exports.default = _default;