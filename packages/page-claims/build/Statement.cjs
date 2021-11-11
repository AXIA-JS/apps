"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _translate = require("./translate.cjs");

var _util = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Get the full hardcoded text for a statement
function StatementFullText({
  statementUrl,
  systemChain
}) {
  const {
    t
  } = (0, _translate.useTranslation)();

  switch (systemChain) {
    case 'AXIA':
    case 'AXIA CC1':
      return statementUrl ? /*#__PURE__*/(0, _jsxRuntime.jsx)("iframe", {
        src: statementUrl
      }) : null;

    default:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('Warning: we did not find any attest statement for {{chain}}', {
          replace: {
            chain: systemChain
          }
        })
      });
  }
}

function Statement({
  className,
  kind,
  systemChain
}) {
  var _getStatement;

  const {
    t
  } = (0, _translate.useTranslation)();
  const statementUrl = (_getStatement = (0, _util.getStatement)(systemChain, kind)) === null || _getStatement === void 0 ? void 0 : _getStatement.url;

  if (!statementUrl) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [t('Please read these terms and conditions carefully. By submitting this statement, you are deemed to have accepted these Terms and Conditions. If you do not agree to these terms, please refrain from accessing or proceeding. You can also find them at:'), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      className: "statementUrl",
      href: statementUrl,
      rel: "noopener noreferrer",
      target: "_blank",
      children: statementUrl
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "statement",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StatementFullText, {
        statementUrl: statementUrl,
        systemChain: systemChain
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Statement).withConfig({
  displayName: "Statement",
  componentId: "sc-1mhmhc-0"
})([".statement{border:1px solid #c2c2c2;background:#f2f2f2;height:15rem;padding:1rem;width:100%;margin:1rem 0;white-space:normal;p{color:var(--color-text) !important;}iframe{border:0;height:100%;width:100%;}}.statementUrl{margin-left:0.3rem}"]));

exports.default = _default;