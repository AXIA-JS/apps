"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _Dropdown = _interopRequireDefault(require("./Dropdown.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const CONVICTIONS = [1, 2, 4, 8, 16, 32].map((lock, index) => [index + 1, lock, new _bn.default(lock)]);
const SEC_DAY = 60 * 60 * 24;

function createOptions(api, t, blockTime) {
  return [{
    text: t('0.1x voting balance, no lockup period'),
    value: 0
  }, ...CONVICTIONS.map(_ref => {
    let [value, lock, bnLock] = _ref;
    return {
      text: t('{{value}}x voting balance, locked for {{lock}}x enactment ({{period}} days)', {
        replace: {
          lock,
          period: (bnLock.mul(api.consts.democracy.enactmentPeriod.muln(blockTime).div(_util.BN_THOUSAND)).toNumber() / SEC_DAY).toFixed(2),
          value
        }
      }),
      value
    };
  })];
}

function Convictions(_ref2) {
  let {
    className = '',
    help,
    label,
    onChange,
    value
  } = _ref2;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const [blockTime] = (0, _reactHooks.useBlockTime)();
  const optionsRef = (0, _react.useRef)(createOptions(api, t, blockTime));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Dropdown.default, {
    className: className,
    help: help,
    label: label,
    onChange: onChange,
    options: optionsRef.current,
    value: value
  });
}

var _default = /*#__PURE__*/_react.default.memo(Convictions);

exports.default = _default;