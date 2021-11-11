"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Selection({
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    apiDefaultTxSudo
  } = (0, _reactHooks.useApi)();
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [error, setError] = (0, _react.useState)(null);
  const [extrinsic, setExtrinsic] = (0, _react.useState)(null);

  const _onExtrinsicChange = (0, _react.useCallback)(method => setExtrinsic(() => method || null), []);

  const _onExtrinsicError = (0, _react.useCallback)(error => setError(error ? error.message : null), []);

  const [extrinsicHex, extrinsicHash] = (0, _react.useMemo)(() => {
    if (!extrinsic) {
      return ['0x', '0x'];
    }

    const u8a = extrinsic.method.toU8a(); // don't use the built-in hash, we only want to convert once

    return [(0, _util.u8aToHex)(u8a), extrinsic.registry.hash(u8a).toHex()];
  }, [extrinsic]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
      label: t('using the selected account'),
      labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BalanceFree, {
        label: /*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          children: t('free balance')
        }),
        params: accountId
      }),
      onChange: setAccountId,
      type: "account"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Extrinsic, {
      defaultValue: apiDefaultTxSudo,
      label: t('submit the following extrinsic'),
      onChange: _onExtrinsicChange,
      onError: _onExtrinsicError
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
      isDisabled: true,
      isTrimmed: true,
      label: "encoded call data",
      value: extrinsicHex,
      withCopy: true
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
      isDisabled: true,
      label: "encoded call hash",
      value: extrinsicHash,
      withCopy: true
    }), error && !extrinsic && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
      content: error
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        extrinsic: extrinsic,
        icon: "sign-in-alt",
        isUnsigned: true,
        label: t('Submit Unsigned'),
        withSpinner: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        extrinsic: extrinsic,
        icon: "sign-in-alt",
        label: t('Submit Transaction')
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Selection);

exports.default = _default;