"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _create = require("@axia-js/types/create");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_PARAM_LENGTH = 20;

function truncate(param) {
  return param.length > MAX_PARAM_LENGTH ? `${param.substring(0, MAX_PARAM_LENGTH / 2)}…${param.substring(param.length - MAX_PARAM_LENGTH / 2)}` : param;
}

function MessageSignature(_ref) {
  let {
    className,
    message: {
      args,
      isConstructor,
      isMutating,
      method,
      returnType
    },
    params = [],
    withTooltip = false
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "ui--MessageSignature-name",
      children: method
    }), ' ', "(", args.map((_ref2, index) => {
      let {
        name,
        type
      } = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
        children: [name, ":", ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "ui--MessageSignature-type",
          children: params && params[index] ? /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
            children: truncate(params[index].toString())
          }) : (0, _create.encodeTypeDef)(api.registry, type)
        }), index < args.length - 1 && ', ']
      }, `${name}-args-${index}`);
    }), ")", !isConstructor && returnType && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [":", ' ', /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "ui--MessageSignature-returnType",
        children: (0, _create.encodeTypeDef)(api.registry, returnType)
      })]
    }), isMutating && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        className: "ui--MessageSignature-mutates",
        icon: "database",
        tooltip: `mutates-${method}`
      }), withTooltip && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tooltip, {
        text: t('Mutates contract state'),
        trigger: `mutates-${method}`
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(MessageSignature).withConfig({
  displayName: "MessageSignature",
  componentId: "sc-1xl68ia-0"
})(["font:var(--font-mono);font-weight:var(--font-weight-normal);flex-grow:1;.ui--MessageSignature-mutates{color:#ff8600;margin-left:0.5rem;opacity:0.6;}.ui--MessageSignature-name{color:#2f8ddb;font-weight:var(--font-weight-normal);}.ui--MessageSignature-type{color:#21a2b2;}.ui--MessageSignature-returnType{color:#ff8600;}"]));

exports.default = _default;