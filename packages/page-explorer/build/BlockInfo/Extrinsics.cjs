"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _Extrinsic = _interopRequireDefault(require("./Extrinsic.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Extrinsics(_ref) {
  let {
    blockNumber,
    className = '',
    events,
    label,
    value
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const header = (0, _react.useMemo)(() => [[label || t('extrinsics'), 'start', 2], [t('events'), 'start media--1000', 2], [t('weight'), 'media--1400'], [t('signer'), 'address media--1200']], [label, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: t('No extrinsics available'),
    header: header,
    isFixed: true,
    children: value === null || value === void 0 ? void 0 : value.map((extrinsic, index) => {
      var _api$consts$system$bl;

      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Extrinsic.default, {
        blockNumber: blockNumber,
        events: events,
        index: index,
        maxBlockWeight: (_api$consts$system$bl = api.consts.system.blockWeights) === null || _api$consts$system$bl === void 0 ? void 0 : _api$consts$system$bl.maxBlock,
        value: extrinsic
      }, `extrinsic:${index}`);
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Extrinsics);

exports.default = _default;