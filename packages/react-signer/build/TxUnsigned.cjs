"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _Transaction = _interopRequireDefault(require("./Transaction.cjs"));

var _translate = require("./translate.cjs");

var _util = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
async function send(queueSetTxStatus, currentItem, tx) {
  currentItem.txStartCb && currentItem.txStartCb();

  try {
    const unsubscribe = await tx.send((0, _util.handleTxResults)('send', queueSetTxStatus, currentItem, () => {
      unsubscribe();
    }));
  } catch (error) {
    console.error('send: error:', error);
    queueSetTxStatus(currentItem.id, 'error', {}, error);
    currentItem.txFailedCb && currentItem.txFailedCb(null);
  }
}

function TxUnsigned({
  className,
  currentItem
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    queueSetTxStatus
  } = (0, _react.useContext)(_reactComponents.StatusContext);
  const [isRenderError, toggleRenderError] = (0, _reactHooks.useToggle)();

  const _onSend = (0, _react.useCallback)(async () => {
    if (currentItem.extrinsic) {
      await send(queueSetTxStatus, currentItem, currentItem.extrinsic);
    }
  }, [currentItem, queueSetTxStatus]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
      className: className,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ErrorBoundary, {
        onError: toggleRenderError,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Transaction.default, {
          currentItem: currentItem,
          onError: toggleRenderError
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "sign-in-alt",
        isDisabled: isRenderError,
        label: t('Submit (no signature)'),
        onClick: _onSend,
        tabIndex: 2
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(TxUnsigned);

exports.default = _default;