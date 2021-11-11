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

var _translate = require("../translate.cjs");

var _Tip = _interopRequireDefault(require("./Tip.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
const TIP_OPTS = {
  withParams: true
};

function extractTips(tipsWithHashes, inHashes) {
  if (!tipsWithHashes || !inHashes) {
    return undefined;
  }

  const [[hashes], optTips] = tipsWithHashes;
  return optTips.map((opt, index) => [hashes[index], opt.unwrapOr(null)]).filter(val => inHashes.includes(val[0]) && !!val[1]).sort((a, b) => a[1].closes.isNone ? b[1].closes.isNone ? 0 : -1 : b[1].closes.isSome ? b[1].closes.unwrap().cmp(a[1].closes.unwrap()) : 1);
}

function Tips({
  className = '',
  defaultId,
  hashes,
  isMember,
  members,
  onSelectTip
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [onlyUntipped, setOnlyUntipped] = (0, _react.useState)(false);
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const tipsWithHashes = (0, _reactHooks.useCall)(hashes && (api.query.tips || api.query.treasury).tips.multi, [hashes], TIP_OPTS);
  const tips = (0, _react.useMemo)(() => extractTips(tipsWithHashes, hashes), [hashes, tipsWithHashes]);
  const headerRef = (0, _react.useRef)([[t('tips'), 'start'], [t('finder'), 'address media--1400'], [t('reason'), 'start'], [undefined, 'media--1100'], [], [undefined, 'badge media--1700'], [], [undefined, 'media--1700']]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: tips && t('No open tips'),
    filter: isMember && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "tipsFilter",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        label: t('show only untipped/closing'),
        onChange: setOnlyUntipped,
        value: onlyUntipped
      })
    }),
    header: headerRef.current,
    children: tips && tips.map(([hash, tip]) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tip.default, {
      bestNumber: bestNumber,
      defaultId: defaultId,
      hash: hash,
      isMember: isMember,
      members: members,
      onSelect: onSelectTip,
      onlyUntipped: onlyUntipped,
      tip: tip
    }, hash))
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Tips).withConfig({
  displayName: "Tips",
  componentId: "sc-1ug6dvp-0"
})([".tipsFilter{text-align:right;.ui--Toggle{margin-right:1rem;margin-top:0.75rem;}}"]));

exports.default = _default;