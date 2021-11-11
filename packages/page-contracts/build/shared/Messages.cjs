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

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Message = _interopRequireDefault(require("./Message.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const READ_ADDR = '0x'.padEnd(66, '0');

function sortMessages(messages) {
  return messages.map((m, index) => [m, index]).sort((a, b) => a[0].identifier.localeCompare(b[0].identifier)).sort((a, b) => a[0].isMutating === b[0].isMutating ? 0 : a[0].isMutating ? -1 : 1);
}

function Messages({
  className = '',
  contract,
  contractAbi: {
    constructors,
    messages,
    project: {
      source
    }
  },
  isLabelled,
  isWatching,
  onSelect,
  onSelectConstructor,
  withConstructors,
  withMessages,
  withWasm
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const optInfo = (0, _reactHooks.useCall)(contract && api.query.contracts.contractInfoOf, [contract === null || contract === void 0 ? void 0 : contract.address]);
  const [isUpdating, setIsUpdating] = (0, _react.useState)(false);
  const [lastResults, setLastResults] = (0, _react.useState)([]);

  const _onExpander = (0, _react.useCallback)(isOpen => {
    isWatching && setIsUpdating(isOpen);
  }, [isWatching]);

  (0, _react.useEffect)(() => {
    isUpdating && optInfo && contract && Promise.all(messages.map(m => m.isMutating || m.args.length !== 0 ? Promise.resolve(undefined) : contract.query[m.method](READ_ADDR, 0, -1).catch(() => undefined))).then(setLastResults).catch(console.error);
  }, [contract, isUpdating, isWatching, messages, optInfo]);

  const _setMessageResult = (0, _react.useCallback)( // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (messageIndex, result) => {// ignore... for now
    // setLastResults((all) => all.map((r, index) => index === messageIndex ? result : r));
  }, []);

  const _onSelect = (0, _react.useCallback)(index => onSelect && onSelect(index, _setMessageResult), [_setMessageResult, onSelect]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Messages ${className}${isLabelled ? ' isLabelled' : ''}`,
    children: [withConstructors && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      summary: t('Constructors ({{count}})', {
        replace: {
          count: constructors.length
        }
      }),
      children: sortMessages(constructors).map(([message, index]) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message.default, {
        index: index,
        message: message,
        onSelect: onSelectConstructor
      }, index))
    }), withMessages && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
      onClick: _onExpander,
      summary: t('Messages ({{count}})', {
        replace: {
          count: messages.length
        }
      }),
      children: sortMessages(messages).map(([message, index]) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message.default, {
        index: index,
        lastResult: lastResults[index],
        message: message,
        onSelect: _onSelect
      }, index))
    }), withWasm && source.wasm.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: t('{{size}} WASM bytes', {
        replace: {
          size: (0, _util.formatNumber)(source.wasm.length)
        }
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Messages).withConfig({
  displayName: "Messages",
  componentId: "sc-185dsrc-0"
})(["padding-bottom:0.75rem !important;&.isLabelled{background:var(--bg-input);box-sizing:border-box;border:1px solid var(--border-input);border-radius:.28571429rem;padding:1rem 1rem 0.5rem;width:100%;}"]));

exports.default = _default;