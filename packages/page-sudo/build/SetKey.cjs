"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SetKey(_ref) {
  let {
    allAccounts,
    className = '',
    isMine,
    sudoKey
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [selected, setSelected] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    sudoKey && !selected && setSelected(sudoKey);
  }, [selected, sudoKey]);
  const willLose = isMine && !!selected && selected !== sudoKey && allAccounts.some(s => s === selected);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: `${className} ui--row`,
      children: isMine ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
          className: "sudoInputAddress",
          isInput: true,
          label: t('sudo key'),
          onChange: setSelected,
          type: "all",
          value: selected
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: sudoKey,
          icon: "sign-in-alt",
          isDisabled: !isMine || sudoKey === selected,
          label: t('Reassign'),
          params: [selected],
          tx: api.tx.sudo.setKey
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Labelled, {
        className: "ui--Dropdown sudoLabelled",
        label: t('sudo key'),
        withLabel: true,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
          value: sudoKey
        })
      })
    }), willLose && /*#__PURE__*/(0, _jsxRuntime.jsx)("article", {
      className: "warning padded",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: t('You will no longer have sudo access')
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(SetKey).withConfig({
  displayName: "SetKey",
  componentId: "sc-q69nmt-0"
})(["align-items:flex-end;justify-content:center;.summary{text-align:center;}.sudoInputAddress{margin:-0.25rem 0.5rem -0.25rem 0;}.sudoLabelled{align-items:center;}"]));

exports.default = _default;