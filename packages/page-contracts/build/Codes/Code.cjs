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

var _index = require("../shared/index.cjs");

var _store = _interopRequireDefault(require("../store.cjs"));

var _translate = require("../translate.cjs");

var _useAbi = _interopRequireDefault(require("../useAbi.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Code({
  className,
  code,
  onShowDeploy
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const optCode = (0, _reactHooks.useCall)(api.query.contracts.codeStorage, [code.json.codeHash]);
  const [isForgetOpen, toggleIsForgetOpen] = (0, _reactHooks.useToggle)();
  const {
    contractAbi
  } = (0, _useAbi.default)([code.json.abi, code.contractAbi], code.json.codeHash, true);

  const _onShowDeploy = (0, _react.useCallback)(() => onShowDeploy(code.json.codeHash, 0), [code, onShowDeploy]);

  const _onDeployConstructor = (0, _react.useCallback)((constructorIndex = 0) => {
    onShowDeploy && onShowDeploy(code.json.codeHash, constructorIndex);
  }, [code, onShowDeploy]);

  const _onForget = (0, _react.useCallback)(() => {
    try {
      _store.default.forgetCode(code.json.codeHash);
    } catch (error) {
      console.error(error);
    } finally {
      toggleIsForgetOpen();
    }
  }, [code, toggleIsForgetOpen]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address top",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Card, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.CodeRow, {
          code: code,
          withTags: false
        }), isForgetOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Forget, {
          mode: "code",
          onClose: toggleIsForgetOpen,
          onForget: _onForget,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.CodeRow, {
            code: code || '',
            isInline: true,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('You are about to remove this code from your list of available code hashes. Once completed, should you need to access it again, you will have to manually add the code hash again.')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: t('This operation does not remove the uploaded code WASM and ABI from the chain, nor any deployed contracts. The forget operation only limits your access to the code on this browser.')
            })]
          })
        }, 'modal-forget-account')]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all top",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Messages, {
        contractAbi: contractAbi,
        onSelectConstructor: _onDeployConstructor,
        withConstructors: true
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "together codeHash",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: `${code.json.codeHash.substr(0, 8)}…${code.json.codeHash.slice(-6)}`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CopyButton, {
        value: code.json.codeHash
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start together",
      children: optCode && (optCode.isSome ? t('Available') : t('Not on-chain'))
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "button",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "trash",
        onClick: toggleIsForgetOpen
      }), !contractAbi && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "upload",
        label: t('deploy'),
        onClick: _onShowDeploy
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Code).withConfig({
  displayName: "Code",
  componentId: "sc-mx29m2-0"
})([".codeHash{div{display:inline;&:first-child{font-family:monospace;margin-right:0.5rem;}}}"]));

exports.default = _default;