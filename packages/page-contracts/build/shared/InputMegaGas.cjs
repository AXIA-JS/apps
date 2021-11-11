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

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function InputMegaGas({
  className,
  estimatedWeight,
  help,
  isCall,
  weight: {
    executionTime,
    isValid,
    megaGas,
    percentage,
    setIsEmpty,
    setMegaGas
  }
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [withEstimate, setWithEstimate] = (0, _react.useState)(true);
  const estimatedMg = (0, _react.useMemo)(() => estimatedWeight ? estimatedWeight.div(_util.BN_MILLION).iadd(_util.BN_ONE) : null, [estimatedWeight]);
  (0, _react.useEffect)(() => {
    withEstimate && estimatedMg && setMegaGas(estimatedMg);
  }, [estimatedMg, setMegaGas, withEstimate]);
  (0, _react.useEffect)(() => {
    setIsEmpty(withEstimate && !!isCall);
  }, [isCall, setIsEmpty, withEstimate]);
  const isDisabled = !!estimatedMg && withEstimate;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputNumber, {
      defaultValue: estimatedMg && isDisabled ? estimatedMg.toString() : undefined,
      help: help,
      isDisabled: isDisabled,
      isError: !isValid,
      isZeroable: isCall,
      label: estimatedMg && (isCall ? !withEstimate : true) ? t('max gas allowed (M, {{estimatedMg}} estimated)', {
        replace: {
          estimatedMg: estimatedMg.toString()
        }
      }) : t('max gas allowed (M)'),
      onChange: isDisabled ? undefined : setMegaGas,
      value: isDisabled ? undefined : isCall && withEstimate ? _util.BN_ZERO : megaGas,
      children: (estimatedWeight || isCall) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
        isOverlay: true,
        label: isCall ? t('max read gas') : t('use estimated gas'),
        onChange: setWithEstimate,
        value: withEstimate
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "contracts--InputMegaGas-meter",
      children: [t('{{executionTime}}s execution time', {
        replace: {
          executionTime: executionTime.toFixed(3)
        }
      }), ', ', t('{{percentage}}% of block weight', {
        replace: {
          percentage: percentage.toFixed(2)
        }
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InputMegaGas).withConfig({
  displayName: "InputMegaGas",
  componentId: "sc-12jqzz7-0"
})([".contracts--InputMegaGas-meter{text-align:right;}"]));

exports.default = _default;