"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utilCrypto = require("@axia-js/util-crypto");

var _index = _interopRequireDefault(require("./backgrounds/index.cjs"));

var _index2 = _interopRequireDefault(require("./sets/index.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Robots lovingly delivered by Robohash.org
// https://github.com/e1ven/Robohash
//
// The "set1" artwork (and robohash backgrounds) were created by Zikri Kader. They are available under CC-BY-3.0 or CC-BY-4.0 license.
// The "set2" artwork was created by Hrvoje Novakovic. They are available under CC-BY-3.0 license.
// The "set3" artwork was created by Julian Peter Arias. They are available under CC-BY-3.0 license.
// The Cats/"set4" were created by David Revoy, used under CC-BY-4.0 https://www.peppercarrot.com/en/article391/cat-avatar-generator
// The avatars used in "set5" were created by Pablo Stanley, for https://avataaars.com/ They are "Free for personal and commercial use. 😇"
function getIndex(list, hash) {
  let value = 0; // grab 48 bits worth of data (last increment before max int)
  // (6 also doesn't divide into 32, so we have a rolling window)

  for (let i = 0; i < 6; i++) {
    value = value * 256 + hash.hash[hash.index];
    hash.index++;

    if (hash.index === 32) {
      hash.index = 0;
    }
  }

  return list[value % list.length];
}

function createInfo(value) {
  const hash = {
    hash: (0, _utilCrypto.blake2AsU8a)(value),
    index: 0
  };
  const result = [getIndex(_index.default, hash)];
  getIndex(_index2.default, hash).forEach(section => {
    result.push(getIndex(section, hash));
  });
  return result;
}

function RoboHash(_ref) {
  let {
    className,
    publicKey,
    size
  } = _ref;
  const info = (0, _react.useMemo)(() => createInfo(publicKey), [publicKey]);
  const style = (0, _react.useMemo)(() => ({
    height: `${size}px`,
    width: `${size}px`
  }), [size]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    style: style,
    children: info.map((src, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      src: src
    }, index))
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(RoboHash).withConfig({
  displayName: "RoboHash",
  componentId: "sc-cllx2i-0"
})(["background:var(--bg-page);border-radius:50%;position:relative;overflow:hidden;img{height:100%;left:0;position:absolute;top:0;width:100%;&:first-child{opacity:0.35;}}"]));

exports.default = _default;