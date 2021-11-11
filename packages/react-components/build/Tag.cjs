"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Tooltip = _interopRequireDefault(require("./Tooltip.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

let tagId = 0;

function Tag({
  className = '',
  color = 'theme',
  hover,
  label,
  size = 'small'
}) {
  const {
    theme
  } = (0, _react.useContext)(_styledComponents.ThemeContext);
  const [trigger] = (0, _react.useState)(() => `tag-hover-${Date.now()}-${tagId++}`);
  const tooltipProps = hover ? {
    'data-for': trigger,
    'data-tip': true
  } : {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", _objectSpread(_objectSpread({
    className: `ui--Tag ${color}Color ${size}Size ${theme}Theme ${className}`,
    color: color || 'grey'
  }, tooltipProps), {}, {
    children: [label, hover && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
      text: hover,
      trigger: trigger
    })]
  }));
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Tag).withConfig({
  displayName: "Tag",
  componentId: "sc-14vk48u-0"
})(["border-radius:0.25rem;color:#fff;display:inline-block;font-size:0.857rem;font-weight:var(--font-weight-normal);line-height:1.143rem;margin:0 0.125rem;padding:0.571em 0.857em;position:relative;white-space:nowrap;z-index:1;&.tinySize{font-size:.71428571rem;}&.blueColor{background:#2185d0;}&.greenColor{background:#21ba45;}&.greyColor{background:#767676;}&.orangeColor{background:#f2711c;}&.pinkColor{background:#e03997;}&.redColor{background:#db2828;}&.yellowColor{background:darkgoldenrod;}&.themeColor.darkTheme{background-color:rgba(255,255,255,0.08);}"]));

exports.default = _default;