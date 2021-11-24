"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _index = _interopRequireDefault(require("./Button/index.cjs"));

var _index2 = require("./Status/index.cjs");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function TxButton(_ref) {
  let {
    accountId,
    className = '',
    extrinsic: propsExtrinsic,
    icon,
    isBasic,
    isBusy,
    isDisabled,
    isIcon,
    isToplevel,
    isUnsigned,
    label,
    onClick,
    onFailed,
    onSendRef,
    onStart,
    onSuccess,
    onUpdate,
    params,
    tooltip,
    tx,
    withSpinner,
    withoutLink
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const mountedRef = (0, _reactHooks.useIsMountedRef)();
  const {
    queueExtrinsic
  } = (0, _react.useContext)(_index2.StatusContext);
  const [isSending, setIsSending] = (0, _react.useState)(false);
  const [isStarted, setIsStarted] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    isStarted && onStart && onStart();
  }, [isStarted, onStart]);

  const _onFailed = (0, _react.useCallback)(result => {
    mountedRef.current && setIsSending(false);
    onFailed && onFailed(result);
  }, [onFailed, setIsSending, mountedRef]);

  const _onSuccess = (0, _react.useCallback)(result => {
    mountedRef.current && setIsSending(false);
    onSuccess && onSuccess(result);
  }, [onSuccess, setIsSending, mountedRef]);

  const _onStart = (0, _react.useCallback)(() => {
    mountedRef.current && setIsStarted(true);
  }, [setIsStarted, mountedRef]);

  const _onSend = (0, _react.useCallback)(() => {
    var _extrinsics;

    let extrinsics;

    if (propsExtrinsic) {
      extrinsics = Array.isArray(propsExtrinsic) ? propsExtrinsic : [propsExtrinsic];
    } else if (tx) {
      extrinsics = [tx(...((0, _util.isFunction)(params) ? params() : params || []))];
    }

    (0, _util.assert)((_extrinsics = extrinsics) === null || _extrinsics === void 0 ? void 0 : _extrinsics.length, 'Expected generated extrinsic passed to TxButton');
    mountedRef.current && withSpinner && setIsSending(true);
    extrinsics.forEach(extrinsic => {
      queueExtrinsic({
        accountId: accountId && accountId.toString(),
        extrinsic,
        isUnsigned,
        txFailedCb: withSpinner ? _onFailed : onFailed,
        txStartCb: _onStart,
        txSuccessCb: withSpinner ? _onSuccess : onSuccess,
        txUpdateCb: onUpdate
      });
    });
    onClick && onClick();
  }, [_onFailed, _onStart, _onSuccess, accountId, isUnsigned, onClick, onFailed, onSuccess, onUpdate, params, propsExtrinsic, queueExtrinsic, setIsSending, tx, withSpinner, mountedRef]);

  if (onSendRef) {
    onSendRef.current = _onSend;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    className: className,
    icon: icon || 'check',
    isBasic: isBasic,
    isBusy: isBusy,
    isDisabled: isSending || isDisabled || !isUnsigned && !accountId || (tx ? false : Array.isArray(propsExtrinsic) ? propsExtrinsic.length === 0 : !propsExtrinsic),
    isIcon: isIcon,
    isToplevel: isToplevel,
    label: label || (isIcon ? '' : t('Submit')),
    onClick: _onSend,
    tooltip: tooltip,
    withoutLink: withoutLink
  });
}

var _default = /*#__PURE__*/_react.default.memo(TxButton);

exports.default = _default;