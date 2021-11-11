"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _reactQuery = require("@axia-js/react-query");

var _types = require("@axia-js/types");

var _Static = _interopRequireDefault(require("./Static.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function isExtrinsic(value) {
  return !!value.signature;
} // This is no doubt NOT the way to do things - however there is no other option


function getRawSignature(value) {
  var _raw, _raw$signature;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return (_raw = value._raw) === null || _raw === void 0 ? void 0 : (_raw$signature = _raw.signature) === null || _raw$signature === void 0 ? void 0 : _raw$signature.multiSignature;
}

function extractState(value, withHash, withSignature) {
  const params = value.meta.args.map(({
    name,
    type
  }) => ({
    name: name.toString(),
    type: (0, _types.getTypeDef)(type.toString())
  }));
  const values = value.args.map(value => ({
    isValid: true,
    value
  }));
  const hash = withHash ? value.hash.toHex() : null;
  let signature = null;
  let signatureType = null;

  if (withSignature && isExtrinsic(value) && value.isSigned) {
    const raw = getRawSignature(value);
    signature = value.signature.toHex();
    signatureType = raw instanceof _types.Enum ? raw.type : null;
  }

  return {
    hash,
    params,
    signature,
    signatureType,
    values
  };
}

function Call({
  children,
  className = '',
  labelHash,
  labelSignature,
  mortality,
  onError,
  tip,
  value,
  withBorder,
  withHash,
  withSignature
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [{
    hash,
    params,
    signature,
    signatureType,
    values
  }, setExtracted] = (0, _react.useState)({
    hash: null,
    params: [],
    signature: null,
    signatureType: null,
    values: []
  });
  (0, _react.useEffect)(() => {
    setExtracted(extractState(value, withHash, withSignature));
  }, [value, withHash, withSignature]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Extrinsic ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
      isDisabled: true,
      onError: onError,
      params: params,
      registry: value.registry,
      values: values,
      withBorder: withBorder
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Extrinsic--toplevel",
      children: [signature && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, {
        className: "hash",
        label: labelSignature || t('signature {{type}}', {
          replace: {
            type: signatureType ? `(${signatureType})` : ''
          }
        }),
        value: signature,
        withCopy: true
      }), hash && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, {
        className: "hash",
        label: labelHash || t('extrinsic hash'),
        value: hash,
        withCopy: true
      }), mortality && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, {
        className: "mortality",
        label: t('lifetime'),
        value: mortality
      }), (tip === null || tip === void 0 ? void 0 : tip.gtn(0)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Static.default, {
        className: "tip",
        label: t('tip'),
        value: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: tip
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Call).withConfig({
  displayName: "Call",
  componentId: "sc-1sydihf-0"
})([".hash .ui--Static{overflow:hidden;text-overflow:ellipsis;word-break:unset;word-wrap:unset;}.ui--Extrinsic--toplevel{margin-top:0.75rem;.ui--Labelled{padding-left:0;> label{left:1.55rem !important;}}}"]));

exports.default = _default;