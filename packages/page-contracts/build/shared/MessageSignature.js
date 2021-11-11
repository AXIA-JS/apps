// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Icon, Tooltip } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { encodeTypeDef } from '@axia-js/types/create';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const MAX_PARAM_LENGTH = 20;

function truncate(param) {
  return param.length > MAX_PARAM_LENGTH ? `${param.substring(0, MAX_PARAM_LENGTH / 2)}…${param.substring(param.length - MAX_PARAM_LENGTH / 2)}` : param;
}

function MessageSignature({
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
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("span", {
      className: "ui--MessageSignature-name",
      children: method
    }), ' ', "(", args.map(({
      name,
      type
    }, index) => {
      return /*#__PURE__*/_jsxs(React.Fragment, {
        children: [name, ":", ' ', /*#__PURE__*/_jsx("span", {
          className: "ui--MessageSignature-type",
          children: params && params[index] ? /*#__PURE__*/_jsx("b", {
            children: truncate(params[index].toString())
          }) : encodeTypeDef(api.registry, type)
        }), index < args.length - 1 && ', ']
      }, `${name}-args-${index}`);
    }), ")", !isConstructor && returnType && /*#__PURE__*/_jsxs(_Fragment, {
      children: [":", ' ', /*#__PURE__*/_jsx("span", {
        className: "ui--MessageSignature-returnType",
        children: encodeTypeDef(api.registry, returnType)
      })]
    }), isMutating && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Icon, {
        className: "ui--MessageSignature-mutates",
        icon: "database",
        tooltip: `mutates-${method}`
      }), withTooltip && /*#__PURE__*/_jsx(Tooltip, {
        text: t('Mutates contract state'),
        trigger: `mutates-${method}`
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(MessageSignature).withConfig({
  displayName: "MessageSignature",
  componentId: "sc-1m60y83-0"
})(["font:var(--font-mono);font-weight:var(--font-weight-normal);flex-grow:1;.ui--MessageSignature-mutates{color:#ff8600;margin-left:0.5rem;opacity:0.6;}.ui--MessageSignature-name{color:#2f8ddb;font-weight:var(--font-weight-normal);}.ui--MessageSignature-type{color:#21a2b2;}.ui--MessageSignature-returnType{color:#ff8600;}"]));