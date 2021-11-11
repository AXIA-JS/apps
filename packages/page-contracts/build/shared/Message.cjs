"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _valueToText = _interopRequireDefault(require("@axia-js/react-params/valueToText"));

var _translate = require("../translate.cjs");

var _MessageSignature = _interopRequireDefault(require("./MessageSignature.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function filterDocs(docs) {
  let skip = false;
  return docs.map(line => line.trim()).filter(line => line).filter((line, index) => {
    if (skip) {
      return false;
    } else if (index || line.startsWith('#')) {
      skip = true;
      return false;
    }

    return true;
  });
}

function Message({
  className = '',
  index,
  lastResult,
  message,
  onSelect
}) {
  const {
    t
  } = (0, _translate.useTranslation)();

  const _onSelect = (0, _react.useCallback)(() => onSelect && onSelect(index), [index, onSelect]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className} ${!onSelect ? 'exempt-hover' : ''} ${message.isConstructor ? 'constructor' : ''}`,
    children: [onSelect && (message.isConstructor ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      className: "accessory",
      icon: "upload",
      label: t('deploy'),
      onClick: _onSelect
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      className: "accessory",
      icon: "play",
      isDisabled: message.isMutating ? false : !message.args.length && (lastResult === null || lastResult === void 0 ? void 0 : lastResult.result.isOk),
      label: message.isMutating ? t('exec') : t('read'),
      onClick: _onSelect
    })), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "info",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MessageSignature.default, {
        asConstructor: message.isConstructor,
        message: message,
        withTooltip: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "docs",
        children: message.docs.length ? filterDocs(message.docs).map((line, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: line
        }, `${message.identifier}-docs-${index}`)) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("i", {
          children: ["\xA0", t('No documentation provided'), "\xA0"]
        })
      })]
    }), lastResult && lastResult.result.isOk && lastResult.output && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
      className: "result",
      isFull: true,
      label: t('current value'),
      children: (0, _valueToText.default)('Text', lastResult.output)
    })]
  }, `${message.identifier}-${index}`);
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Message).withConfig({
  displayName: "Message",
  componentId: "sc-1tpvykq-0"
})(["align-items:center;border-radius:0.25rem;display:flex;padding:0.25rem 0.75rem 0.25rem 0;&.disabled{opacity:1 !important;background:#eee !important;color:#555 !important;}.info{flex:1 1;margin-left:1.5rem;.docs{font-size:0.9rem;font-weight:var(--font-weight-normal);}}.result{min-width:15rem;}&+&{margin-top:0.5rem;}"]));

exports.default = _default;