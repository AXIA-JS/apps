"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactCopyToClipboard = _interopRequireDefault(require("react-copy-to-clipboard"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Context = _interopRequireDefault(require("./Status/Context.cjs"));

var _index = _interopRequireDefault(require("./Button/index.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const NOOP = () => undefined;

function CopyButton({
  children,
  className = '',
  icon = 'copy',
  label,
  type,
  value
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    queueAction
  } = (0, _react.useContext)(_Context.default);

  const _onCopy = (0, _react.useCallback)(() => {
    queueAction && queueAction({
      action: t('clipboard'),
      message: t('{{type}} copied', {
        replace: {
          type: type || t('value')
        }
      }),
      status: 'queued'
    });
  }, [type, queueAction, t]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--CopyButton ${className}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactCopyToClipboard.default, {
      onCopy: _onCopy,
      text: value,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "copyContainer",
        children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "copySpan",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
            className: "icon-button show-on-hover",
            icon: icon,
            isDisabled: !value,
            label: label,
            onClick: NOOP
          })
        })]
      })
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(CopyButton).withConfig({
  displayName: "CopyButton",
  componentId: "sc-1d73v6z-0"
})([".copySpan{white-space:nowrap;}"]));

exports.default = _default;