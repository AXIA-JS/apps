"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
const CMD_HASH = 1;
const CMD_MORTAL = 2;

function Qr(_ref) {
  let {
    address,
    className,
    genesisHash,
    isHashed,
    onSignature,
    payload
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [sigError, setSigError] = (0, _react.useState)(null);

  const _onSignature = (0, _react.useCallback)(data => {
    if ((0, _util.isHex)(data.signature)) {
      onSignature(data);
    } else {
      const signature = data.signature;
      setSigError(t('Non-signature, non-hex data received from QR. Data contains "{{sample}}" instead of a hex-only signature. Please present the correct signature generated from the QR presented for submission.', {
        replace: {
          sample: signature.length > 47 ? `${signature.substr(0, 24)}…${signature.substr(-22)}` : signature
        }
      }));
    }
  }, [onSignature, t]);

  if (!address) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
      label: t('Preparing QR for signing')
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "qrDisplay",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.QrDisplayPayload, {
            address: address,
            cmd: isHashed ? CMD_HASH : CMD_MORTAL,
            genesisHash: genesisHash,
            payload: payload
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "qrDisplay",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.QrScanSignature, {
            onScan: _onSignature
          })
        })
      })]
    }), sigError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkError, {
      className: "nomargin",
      content: sigError
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Qr).withConfig({
  displayName: "Qr",
  componentId: "sc-1glzn0y-0"
})([".qrDisplay{margin:0 auto;max-width:30rem;img{border:1px solid white;}}"]));

exports.default = _default;