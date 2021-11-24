"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withApi;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _util = require("@axia-js/util");

var _ApiContext = require("../ApiContext.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function withApi(Inner) {
  let defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  class WithApi extends _react.default.PureComponent {
    constructor() {
      super(...arguments);
      this.component = /*#__PURE__*/_react.default.createRef();
    }

    render() {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ApiContext.ApiConsumer, {
        children: apiProps => {
          (0, _util.assert)(apiProps && apiProps.api, 'Application root must be wrapped inside \'react-api/Api\' to provide API context');
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(Inner, _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultProps), apiProps), this.props), {}, {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ref: this.component
          }));
        }
      });
    }

  }

  return WithApi;
}