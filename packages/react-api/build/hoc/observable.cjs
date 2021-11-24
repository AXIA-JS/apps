"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withObservable;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _rxjs = require("rxjs");

var _echo = _interopRequireDefault(require("../transform/echo.cjs"));

var _index = require("../util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function withObservable(observable) {
  let {
    callOnResult,
    propName = 'value',
    transform = _echo.default
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (Inner) {
    let defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let render = arguments.length > 2 ? arguments[2] : undefined;

    class WithObservable extends _react.default.Component {
      constructor() {
        super(...arguments);
        this.isActive = true;
        this.state = {
          callResult: undefined,
          callUpdated: false,
          callUpdatedAt: 0,
          subscriptions: []
        };

        this.triggerUpdate = (props, callResult) => {
          try {
            if (!this.isActive || (0, _index.isEqual)(callResult, this.state.callResult)) {
              return;
            }

            (0, _index.triggerChange)(callResult, callOnResult, props.callOnResult || defaultProps.callOnResult);
            this.setState({
              callResult,
              callUpdated: true,
              callUpdatedAt: Date.now()
            });
          } catch (error) {
            console.error(this.props, error);
          }
        };
      }

      componentDidMount() {
        this.setState({
          subscriptions: [observable.pipe((0, _rxjs.map)(transform), (0, _rxjs.catchError)(() => (0, _rxjs.of)(undefined))).subscribe(value => this.triggerUpdate(this.props, value)), (0, _index.intervalObservable)(this)]
        });
      }

      componentWillUnmount() {
        this.isActive = false;
        this.state.subscriptions.forEach(subscription => subscription.unsubscribe());
      }

      render() {
        const {
          children
        } = this.props; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

        const {
          callResult,
          callUpdated,
          callUpdatedAt
        } = this.state;

        const _props = _objectSpread(_objectSpread(_objectSpread({}, defaultProps), this.props), {}, {
          callUpdated,
          callUpdatedAt,
          [propName]: callResult
        });

        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Inner, _objectSpread(_objectSpread({}, _props), {}, {
          children: [render && render(callResult), children]
        }));
      }

    }

    return WithObservable;
  };
}