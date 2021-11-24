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

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [parts.map((part, index) => index % 2 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("em", {
      children: ["[", part, "]"]
    }, index) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: part
    }, index)), "\xA0"]
  });
}

function Expander(_ref) {
  let {
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
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isExpanded, toggleExpanded] = (0, _reactHooks.useToggle)(isOpen, onClick);
  const demandChildren = (0, _react.useMemo)(() => isExpanded && renderChildren && renderChildren(), [isExpanded, renderChildren]);
  const headerMain = (0, _react.useMemo)(() => summary || formatMeta(summaryMeta), [summary, summaryMeta]);
  const headerSub = (0, _react.useMemo)(() => summary ? formatMeta(summaryMeta) || summarySub : null, [summary, summaryMeta, summarySub]);
  const hasContent = (0, _react.useMemo)(() => !!renderChildren || !!children && (!Array.isArray(children) || children.length !== 0), [children, renderChildren]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Expander${isExpanded ? ' isExpanded' : ''}${isPadded ? ' isPadded' : ''}${hasContent ? ' hasContent' : ''}${withBreaks ? ' withBreaks' : ''} ${className}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--Expander-summary",
      onClick: toggleExpanded,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--Expander-summary-header",
        children: [help && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LabelHelp, {
          help: help,
          icon: helpIcon
        }), summaryHead, headerMain || t('Details'), headerSub && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "ui--Expander-summary-header-sub",
          children: headerSub
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
        color: hasContent ? undefined : 'transparent',
        icon: isExpanded ? 'caret-up' : 'caret-down'
      })]
    }), hasContent && (isExpanded || withHidden) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--Expander-content",
      children: children || demandChildren
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Expander).withConfig({
  displayName: "Expander",
  componentId: "sc-qatdzy-0"
})(["max-width:100%;overflow:hidden;text-overflow:ellipsis;&:not(.isExpanded) .ui--Expander-content{display:none;}&.isExpanded .ui--Expander-content{margin-top:0.5rem;.body.column{justify-content:end;}}&.hasContent .ui--Expander-summary{cursor:pointer;}&.isPadded{.ui--Expander-summary{margin-left:2.25rem;}}&.withBreaks .ui--Expander-content{white-space:normal;}.ui--Expander-summary{margin:0;min-width:13.5rem;overflow:hidden;.ui--Expander-summary-header{display:inline-block;max-width:calc(100% - 2rem);overflow:hidden;text-overflow:ellipsis;vertical-align:middle;white-space:nowrap;span{white-space:normal;}}.ui--Icon{margin-left:0.75rem;vertical-align:middle;}.ui--LabelHelp{.ui--Icon{margin-left:0;margin-right:0.5rem;vertical-align:text-bottom;}}.ui--Expander-summary-header-sub{font-size:1rem;opacity:0.6;overflow:hidden;text-overflow:ellipsis;}}"]));

exports.default = _default;