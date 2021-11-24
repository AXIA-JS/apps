"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ActionButtons(_ref) {
  let {
    className = '',
    isCustomExample,
    isRunning,
    removeSnippet,
    runJs,
    saveSnippet,
    stopJs
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [snippetName, setSnippetName] = (0, _react.useState)('');

  const _onChangeName = (0, _react.useCallback)(snippetName => setSnippetName(snippetName), []);

  const _onPopupClose = (0, _react.useCallback)(() => {
    setSnippetName('');
  }, []);

  const _saveSnippet = (0, _react.useCallback)(() => {
    saveSnippet(snippetName);

    _onPopupClose();
  }, [_onPopupClose, saveSnippet, snippetName]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
    className: `${className} action-button`,
    children: [isCustomExample ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "trash",
      onClick: removeSnippet
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Popup, {
      className: "popup-local",
      onCloseAction: _onPopupClose,
      value: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          autoFocus: true,
          maxLength: 50,
          min: 1,
          onChange: _onChangeName,
          onEnter: _saveSnippet,
          placeholder: t('Name your example'),
          value: snippetName,
          withLabel: false
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
          icon: "save",
          isDisabled: !snippetName.length,
          label: t('Save snippet to local storage'),
          onClick: _saveSnippet
        })]
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "save",
        isReadOnly: false
      })
    }), isRunning ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "times",
      onClick: stopJs
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      className: "play-button",
      icon: "play",
      onClick: runJs
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ActionButtons);

exports.default = _default;