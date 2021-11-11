"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Header = _interopRequireDefault(require("./Header.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const ESC_KEYCODE = 27;

function Base(props) {
  const {
    theme
  } = (0, _react.useContext)(_styledComponents.ThemeContext);
  const {
    children,
    className = '',
    header,
    onClose,
    size = 'medium',
    testId = 'modal'
  } = props;
  const listenKeyboard = (0, _react.useCallback)(event => {
    if (event.key === 'Escape' || event.keyCode === ESC_KEYCODE) {
      onClose();
    }
  }, [onClose]);
  (0, _react.useEffect)(() => {
    window.addEventListener('keydown', listenKeyboard, true);
    return () => {
      window.removeEventListener('keydown', listenKeyboard, true);
    };
  }, [listenKeyboard]);
  return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `theme--${theme} ui--Modal ${className} size-${size}`,
    "data-testid": testId,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(DisableGlobalScroll, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--Modal__overlay",
      onClick: onClose
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Modal__body",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
        header: header,
        onClose: onClose
      }), children]
    })]
  }), document.body);
}

const DisableGlobalScroll = (0, _styledComponents.createGlobalStyle)(["body{overflow:hidden;}"]);

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Base).withConfig({
  displayName: "Base",
  componentId: "sc-1dkorvk-0"
})(["position:fixed;top:0;left:0;width:100%;height:100%;min-height:100vh;z-index:1000;overflow-y:auto;.ui--Modal__overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(96,96,96,0.5);}.ui--Modal__body{margin-top:30px;background:var(--bg-page);border-radius:4px;box-shadow:none;display:flex;flex-direction:column;position:absolute;top:0;left:50%;transform:translate(-50%,0);max-width:900px;width:calc(100% - 16px);color:var(--color-text);font:var(--font-sans);}&.size-small .ui--Modal__body{max-width:720px;}&.size-large .ui--Modal__body{max-width:1080px;}"]));

exports.default = _default;