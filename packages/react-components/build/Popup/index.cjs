"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _index = require("@axia-js/react-components/index");

var _reactHooks = require("@axia-js/react-hooks");

var _PopupWindow = _interopRequireDefault(require("./PopupWindow.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Popup(_ref) {
  let {
    children,
    className = '',
    isDisabled = false,
    onCloseAction,
    position = 'left',
    value
  } = _ref;
  const [isOpen, toggleIsOpen, setIsOpen] = (0, _reactHooks.useToggle)(false);
  const triggerRef = (0, _react.useRef)(null);
  const dropdownRef = (0, _react.useRef)(null);
  (0, _reactHooks.useOutsideClick)([triggerRef, dropdownRef], () => setIsOpen(false));
  (0, _react.useEffect)(() => {
    if (!isOpen && onCloseAction) {
      onCloseAction();
    }
  }, [isOpen, onCloseAction]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Popup ${className}`,
    children: [isOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PopupWindow.default, {
      position: position,
      triggerRef: triggerRef,
      windowRef: dropdownRef,
      children: value
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      onClick: toggleIsOpen,
      ref: triggerRef,
      children: children !== null && children !== void 0 ? children : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Button, {
        className: isOpen ? 'isOpen' : '',
        icon: "ellipsis-v",
        isDisabled: isDisabled,
        isReadOnly: false
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Popup).withConfig({
  displayName: "Popup",
  componentId: "sc-bd8q1s-0"
})(["display:inline-flex;flex-direction:column;justify-content:center;position:relative;"]));

exports.default = _default;