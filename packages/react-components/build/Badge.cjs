"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Icon = _interopRequireDefault(require("./Icon.cjs"));

var _Tooltip = _interopRequireDefault(require("./Tooltip.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

let badgeId = 0;

function Badge(_ref) {
  let {
    className = '',
    color = 'normal',
    hover,
    icon,
    info,
    isSmall,
    onClick
  } = _ref;
  const [trigger] = (0, _react.useState)(() => `badge-hover-${Date.now()}-${badgeId++}`);
  const extraProps = hover ? {
    'data-for': trigger,
    'data-tip': true
  } : {};
  const isHighlight = color === 'highlight';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", _objectSpread(_objectSpread({}, extraProps), {}, {
    className: `ui--Badge${hover ? ' isTooltip' : ''}${isSmall ? ' isSmall' : ''}${onClick ? ' isClickable' : ''}${isHighlight ? ' highlight--bg' : ''} ${color}Color ${className}`,
    onClick: onClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: isHighlight ? 'highlight--color-contrast' : '',
      children: info || icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
        icon: icon
      })
    }), hover && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tooltip.default, {
      text: hover,
      trigger: trigger
    })]
  }));
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Badge).withConfig({
  displayName: "Badge",
  componentId: "sc-6utzhi-0"
})(["border-radius:16px;box-sizing:border-box;color:#eeedec;display:inline-block;font-size:12px;height:22px;line-height:22px;margin-right:0.25rem;min-width:22px;padding:0 4px;overflow:hidden;text-align:center;vertical-align:middle;width:22px;&.isTooltip{cursor:help;}.ui--Icon{cursor:inherit;margin-top:5px;vertical-align:top;width:1em;}&.isClickable{cursor:pointer;}&.isSmall{font-size:10px;height:16px;line-height:16px;min-width:16px;padding:0;width:16px;.ui--Icon{margin-top:3px;}}&.blueColor{background:steelblue;}&.counterColor{margin:0 0.5rem;vertical-align:middle;}&.grayColor{background:#eeedec !important;color:#aaa9a8;}&.redColor{background:darkred;}&.greenColor{background:green;}&.orangeColor{background:darkorange;}&.purpleColor{background:indigo;}&.transparentColor{background:transparent;box-shadow:none;}&.whiteColor{background:rgba(255,255,255,0.3);}"]));

exports.default = _default;