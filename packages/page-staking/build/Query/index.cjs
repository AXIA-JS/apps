"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Validator = _interopRequireDefault(require("./Validator.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Query(_ref) {
  let {
    className
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    value
  } = (0, _reactRouterDom.useParams)();
  const [validatorId, setValidatorId] = (0, _react.useState)(value || null);

  const _onQuery = (0, _react.useCallback)(() => {
    if (validatorId) {
      window.location.hash = `/staking/query/${validatorId}`;
    }
  }, [validatorId]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddressSimple, {
      className: "staking--queryInput",
      defaultValue: value,
      help: t('Display overview information for the selected validator, including blocks produced.'),
      label: t('validator to query'),
      onChange: setValidatorId,
      onEnter: _onQuery,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "play",
        isDisabled: !validatorId,
        onClick: _onQuery
      })
    }), value && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Validator.default, {
      validatorId: value
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Query);

exports.default = _default;