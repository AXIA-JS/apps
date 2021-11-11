"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
const EMPTY_PROOF = new Uint8Array();

function SessionKey({
  className = '',
  controllerId,
  onChange,
  stashId,
  withFocus,
  withSenders
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [keys, setKeys] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    try {
      onChange({
        sessionTx: (0, _util.isHex)(keys) // this is weird... :(
        ? api.tx.session.setKeys(keys, EMPTY_PROOF) : null
      });
    } catch {
      onChange({
        sessionTx: null
      });
    }
  }, [api, keys, onChange]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [withSenders && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
      hint: t('The stash and controller pair. This transaction, setting the session keys, will be sent from the controller.'),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        defaultValue: stashId,
        isDisabled: true,
        label: t('stash account')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
        className: "medium",
        defaultValue: controllerId,
        isDisabled: true,
        label: t('controller account')
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
      hint: t('The hex output from author_rotateKeys, as executed on the validator node. The keys will show as pending until applied at the start of a new session.'),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        autoFocus: withFocus,
        help: t('Changing the key only takes effect at the start of the next session. The input here is generated from the author_rotateKeys command'),
        isError: !keys,
        label: t('Keys from rotateKeys'),
        onChange: setKeys,
        placeholder: "0x..."
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SessionKey);

exports.default = _default;