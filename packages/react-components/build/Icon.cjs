"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// one-time init of FA libraries
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas);

function Icon(_ref) {
  let {
    className = '',
    color = 'normal',
    icon,
    isPadded,
    isSpinning,
    onClick,
    size = '1x',
    tooltip
  } = _ref;

  const extraProps = _objectSpread({
    'data-testid': icon
  }, tooltip ? {
    'data-for': tooltip,
    'data-tip': true
  } : {});

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, _objectSpread(_objectSpread({}, extraProps), {}, {
    className: `ui--Icon ${color}Color${onClick ? ' isClickable' : ''}${isPadded ? ' isPadded' : ''} ${className}`,
    icon: icon,
    onClick: onClick,
    size: size,
    spin: isSpinning,
    tabIndex: -1
  }));
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Icon).withConfig({
  displayName: "Icon",
  componentId: "sc-1d8fh0h-0"
})(["outline:none;&.isClickable{cursor:pointer;}&.isPadded{margin:0 0.25rem;}&.grayColor{opacity:0.25;}&.greenColor{color:green;}&.orangeColor{color:darkorange;}&.redColor{color:darkred;}&.transparentColor{color:transparent;}&.whiteColor{color:white;}&.darkGrayColor{color:#8B8B8B;}"]));

exports.default = _default;