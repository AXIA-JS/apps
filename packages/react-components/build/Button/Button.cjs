"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("../Icon.cjs"));

var _Spinner = _interopRequireDefault(require("../Spinner.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Button({
  activeOnEnter,
  children,
  className = '',
  dataTestId = '',
  icon,
  isBasic,
  isBusy,
  isCircular,
  isDisabled,
  isFull,
  isIcon,
  isSelected,
  isToplevel,
  label,
  onClick,
  isReadOnly = !onClick,
  onMouseEnter,
  onMouseLeave,
  tabIndex,
  withoutLink
}) {
  const _onClick = (0, _react.useCallback)(() => !(isBusy || isDisabled) && onClick && onClick(), [isBusy, isDisabled, onClick]);

  const listenKeyboard = (0, _react.useCallback)(event => {
    if (!isBusy && !isDisabled && event.key === 'Enter') {
      onClick && onClick();
    }
  }, [isBusy, isDisabled, onClick]);
  (0, _react.useEffect)(() => {
    if (activeOnEnter) {
      window.addEventListener('keydown', listenKeyboard, true);
    }

    return () => {
      if (activeOnEnter) {
        window.removeEventListener('keydown', listenKeyboard, true);
      }
    };
  }, [activeOnEnter, listenKeyboard]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    className: `ui--Button${label ? ' hasLabel' : ''}${isBasic ? ' isBasic' : ''}${isCircular ? ' isCircular' : ''}${isFull ? ' isFull' : ''}${isIcon ? ' isIcon' : ''}${isBusy || isDisabled ? ' isDisabled' : ''}${isBusy ? ' isBusy' : ''}${isReadOnly ? ' isReadOnly' : ''}${isSelected ? ' isSelected' : ''}${isToplevel ? ' isToplevel' : ''}${withoutLink ? ' withoutLink' : ''} ${className}`,
    "data-testid": dataTestId,
    onClick: _onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    tabIndex: tabIndex,
    children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
      icon: icon
    }), label, children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.default, {
      className: "ui--Button-spinner",
      variant: "cover"
    })]
  });
}

const ICON_PADDING = 0.5;

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Button).withConfig({
  displayName: "Button",
  componentId: "sc-1jumd80-0"
})(["background:transparent;border:none;color:inherit;cursor:pointer;line-height:1;margin:0;outline:none;position:relative;vertical-align:middle;text-align:center;&:not(.hasLabel){padding:0.7em;.ui--Icon{padding:0.6rem;margin:-0.6rem;}}&:not(.isCircular){border-radius:0.25rem;}&:focus{outline:0;}&.hasLabel{padding:0.7rem 1.1rem 0.7rem ", "rem;.ui--Icon{margin-right:0.425rem !important;}}&.isBasic{background:var(--bg-table);}&.isCircular{border-radius:10rem;}&.isDisabled,&.isReadOnly{background:none;box-shadow:none;cursor:not-allowed;}&.isBusy{cursor:wait;}&.isFull{display:block;width:100%;}&.isIcon{background:transparent;}.ui--Button-spinner{visibility:hidden;}.ui--Button-overlay{background:rgba(253,252,251,0.75);bottom:0;left:0;position:absolute;right:0;top:0;visibility:hidden;}.ui--Icon{border-radius:50%;box-sizing:content-box;height:1rem;margin:-", "rem 0;padding:", "rem;width:1rem;}&.isBusy{.ui--Button-spinner{visibility:visible;}}&.isDisabled{color:#bcbbba;}"], 1.1 - ICON_PADDING, ICON_PADDING, ICON_PADDING));

exports.default = _default;