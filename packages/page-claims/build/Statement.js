// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "./translate.js";
import { getStatement } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

// Get the full hardcoded text for a statement
function StatementFullText({
  statementUrl,
  systemChain
}) {
  const {
    t
  } = useTranslation();

  switch (systemChain) {
    case 'AXIA':
    case 'AXIA CC1':
      return statementUrl ? /*#__PURE__*/_jsx("iframe", {
        src: statementUrl
      }) : null;

    default:
      return /*#__PURE__*/_jsx("p", {
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
  } = useTranslation();
  const statementUrl = (_getStatement = getStatement(systemChain, kind)) === null || _getStatement === void 0 ? void 0 : _getStatement.url;

  if (!statementUrl) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [t('Please read these terms and conditions carefully. By submitting this statement, you are deemed to have accepted these Terms and Conditions. If you do not agree to these terms, please refrain from accessing or proceeding. You can also find them at:'), /*#__PURE__*/_jsx("a", {
      className: "statementUrl",
      href: statementUrl,
      rel: "noopener noreferrer",
      target: "_blank",
      children: statementUrl
    }), /*#__PURE__*/_jsx("div", {
      className: "statement",
      children: /*#__PURE__*/_jsx(StatementFullText, {
        statementUrl: statementUrl,
        systemChain: systemChain
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Statement).withConfig({
  displayName: "Statement",
  componentId: "sc-zojaub-0"
})([".statement{border:1px solid #c2c2c2;background:#f2f2f2;height:15rem;padding:1rem;width:100%;margin:1rem 0;white-space:normal;p{color:var(--color-text) !important;}iframe{border:0;height:100%;width:100%;}}.statementUrl{margin-left:0.3rem}"]));