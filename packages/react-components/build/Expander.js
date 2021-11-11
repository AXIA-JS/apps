// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { LabelHelp } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import Icon from "./Icon.js";
import { useTranslation } from "./translate.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function splitSingle(value, sep) {
  return value.reduce((result, value) => {
    return value.split(sep).reduce((result, value) => result.concat(value), result);
  }, []);
}

function splitParts(value) {
  return ['[', ']'].reduce((result, sep) => splitSingle(result, sep), [value]);
}

function formatMeta(meta) {
  if (!meta || !meta.docs.length) {
    return null;
  }

  const strings = meta.docs.map(d => d.toString().trim());
  const firstEmpty = strings.findIndex(d => !d.length);
  const combined = (firstEmpty === -1 ? strings : strings.slice(0, firstEmpty)).join(' ').replace(/#(<weight>| <weight>).*<\/weight>/, '');
  const parts = splitParts(combined.replace(/\\/g, '').replace(/`/g, ''));
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [parts.map((part, index) => index % 2 ? /*#__PURE__*/_jsxs("em", {
      children: ["[", part, "]"]
    }, index) : /*#__PURE__*/_jsx("span", {
      children: part
    }, index)), "\xA0"]
  });
}

function Expander({
  children,
  className = '',
  help,
  helpIcon,
  isOpen,
  isPadded,
  onClick,
  renderChildren,
  summary,
  summaryHead,
  summaryMeta,
  summarySub,
  withBreaks,
  withHidden
}) {
  const {
    t
  } = useTranslation();
  const [isExpanded, toggleExpanded] = useToggle(isOpen, onClick);
  const demandChildren = useMemo(() => isExpanded && renderChildren && renderChildren(), [isExpanded, renderChildren]);
  const headerMain = useMemo(() => summary || formatMeta(summaryMeta), [summary, summaryMeta]);
  const headerSub = useMemo(() => summary ? formatMeta(summaryMeta) || summarySub : null, [summary, summaryMeta, summarySub]);
  const hasContent = useMemo(() => !!renderChildren || !!children && (!Array.isArray(children) || children.length !== 0), [children, renderChildren]);
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Expander${isExpanded ? ' isExpanded' : ''}${isPadded ? ' isPadded' : ''}${hasContent ? ' hasContent' : ''}${withBreaks ? ' withBreaks' : ''} ${className}`,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "ui--Expander-summary",
      onClick: toggleExpanded,
      children: [/*#__PURE__*/_jsxs("div", {
        className: "ui--Expander-summary-header",
        children: [help && /*#__PURE__*/_jsx(LabelHelp, {
          help: help,
          icon: helpIcon
        }), summaryHead, headerMain || t('Details'), headerSub && /*#__PURE__*/_jsx("div", {
          className: "ui--Expander-summary-header-sub",
          children: headerSub
        })]
      }), /*#__PURE__*/_jsx(Icon, {
        color: hasContent ? undefined : 'transparent',
        icon: isExpanded ? 'caret-up' : 'caret-down'
      })]
    }), hasContent && (isExpanded || withHidden) && /*#__PURE__*/_jsx("div", {
      className: "ui--Expander-content",
      children: children || demandChildren
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Expander).withConfig({
  displayName: "Expander",
  componentId: "sc-cwzc21-0"
})(["max-width:100%;overflow:hidden;text-overflow:ellipsis;&:not(.isExpanded) .ui--Expander-content{display:none;}&.isExpanded .ui--Expander-content{margin-top:0.5rem;.body.column{justify-content:end;}}&.hasContent .ui--Expander-summary{cursor:pointer;}&.isPadded{.ui--Expander-summary{margin-left:2.25rem;}}&.withBreaks .ui--Expander-content{white-space:normal;}.ui--Expander-summary{margin:0;min-width:13.5rem;overflow:hidden;.ui--Expander-summary-header{display:inline-block;max-width:calc(100% - 2rem);overflow:hidden;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap;span{white-space:normal;}}.ui--Icon{margin-left:0.75rem;vertical-align:middle;}.ui--LabelHelp{.ui--Icon{margin-left:0;margin-right:0.5rem;vertical-align:text-bottom;}}.ui--Expander-summary-header-sub{font-size:1rem;opacity:0.6;overflow:hidden;text-overflow:ellipsis;}}"]));