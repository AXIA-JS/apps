"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Tip(_ref) {
  let {
    className,
    onChange
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [tip, setTip] = (0, _react.useState)(_util.BN_ZERO);
  const [showTip, setShowTip] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    onChange(showTip ? tip : _util.BN_ZERO);
  }, [onChange, showTip, tip]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
    className: className,
    hint: t('Adding an optional tip to the transaction could allow for higher priority, especially when the chain is busy.'),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
      className: "tipToggle",
      label: showTip ? t('Include an optional tip for faster processing') : t('Do not include a tip for the block author'),
      onChange: setShowTip,
      value: showTip
    }), showTip && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
      help: t('Add a tip to this extrinsic, paying the block author for greater priority'),
      isZeroable: true,
      label: t('Tip (optional)'),
      onChange: setTip
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Tip);

exports.default = _default;