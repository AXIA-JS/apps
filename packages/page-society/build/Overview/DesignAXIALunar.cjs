"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _canary = _interopRequireWildcard(require("../draw/canary.cjs"));

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
const CANVAS_STYLE = {
  display: 'block',
  margin: '0 auto'
};
const HEIGHT = _canary.SIZE * 2 + _canary.PADD * 1;
const WIDTH = _canary.SIZE * 3 + _canary.PADD * 2;

function DesignAXIALunar({
  accountId
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const canvasRef = (0, _react.useRef)(null);
  const [onAXIALunar] = (0, _react.useState)(() => api.genesisHash.eq(_appsConfig.AXIALUNAR_GENESIS));
  const [isShowing, toggleDesign] = (0, _reactHooks.useToggle)();
  (0, _react.useEffect)(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        (0, _canary.default)(ctx, accountId);
      }
    }
  });

  if (!onAXIALunar) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "pen-nib",
      onClick: toggleDesign
    }), isShowing && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal, {
      header: t('design samples'),
      onClose: toggleDesign,
      size: "large",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Content, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("canvas", {
          height: HEIGHT,
          ref: canvasRef,
          style: CANVAS_STYLE,
          width: WIDTH
        })
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(DesignAXIALunar);

exports.default = _default;