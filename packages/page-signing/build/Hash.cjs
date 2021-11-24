"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Hash() {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [{
    data,
    hash,
    isHexData
  }, setState] = (0, _react.useState)({
    data: '',
    hash: (0, _utilCrypto.blake2AsHex)((0, _util.stringToU8a)(''), 256),
    isHexData: false
  });

  const _onChangeData = (0, _react.useCallback)(data => {
    const isHexData = (0, _util.isHex)(data);
    setState({
      data,
      hash: (0, _utilCrypto.blake2AsHex)(isHexData ? (0, _util.hexToU8a)(data) : (0, _util.stringToU8a)(data), 256),
      isHexData
    });
  }, []);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "toolbox--Hash",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        autoFocus: true,
        className: "full",
        help: t('The input data to hash. This can be either specified as a hex value (0x-prefix) or as a string.'),
        label: t('from the following data'),
        onChange: _onChangeData,
        value: data
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
        className: "medium",
        help: t('Detection on the input string to determine if it is hex or non-hex.'),
        label: t('hex input data'),
        value: isHexData ? t('Yes') : t('No')
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--row",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
        className: "full",
        help: t('The blake2b 256-bit hash of the actual input data.'),
        isHidden: hash.length === 0,
        isMonospace: true,
        label: t('the resulting hash is'),
        value: hash,
        withCopy: true
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Hash);

exports.default = _default;