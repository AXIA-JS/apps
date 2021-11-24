"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withCall;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _util = require("@axia-js/util");

var _echo = _interopRequireDefault(require("../transform/echo.cjs"));

var _index = require("../util/index.cjs");

var _api = _interopRequireDefault(require("./api.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const NOOP = () => {// ignore
};

const NO_SKIP = () => false; // a mapping of actual error messages that has already been shown


const errorred = {};

function withCall(endpoint) {
  let {
    at,
    atProp,
    callOnResult,
    fallbacks,
    isMulti = false,
    params = [],
    paramName,
    paramPick,
    paramValid = false,
    propName,
    skipIf = NO_SKIP,
    transform = _echo.default,
    withIndicator = false
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Inner => {
    class WithPromise extends _react.default.Component {
      constructor(props) {
        super(props);
        this.state = {
          callResult: undefined,
          callUpdated: false,
          callUpdatedAt: 0
        };
        this.destroy = void 0;
        this.isActive = false;
        this.propName = void 0;
        this.timerId = -1;

        this.constructApiSection = endpoint => {
          const {
            api
          } = this.props;
          const [area, section, method, ...others] = endpoint.split('.');
          (0, _util.assert)(area.length && section.length && method.length && others.length === 0, `Invalid API format, expected <area>.<section>.<method>, found ${endpoint}`);
          (0, _util.assert)(['consts', 'rpc', 'query', 'derive'].includes(area), `Unknown api.${area}, expected consts, rpc, query or derive`);
          (0, _util.assert)(!at || area === 'query', 'Only able to do an \'at\' query on the api.query interface');
          const apiSection = api[area][section];
          return [apiSection, area, section, method];
        };

        const [, _section, _method] = endpoint.split('.');
        this.propName = `${_section}_${_method}`;
      }

      componentDidUpdate(prevProps) {
        const oldParams = this.getParams(prevProps);
        const newParams = this.getParams(this.props);

        if (this.isActive && !(0, _index.isEqual)(newParams, oldParams)) {
          this.subscribe(newParams).then(NOOP).catch(NOOP);
        }
      }

      componentDidMount() {
        this.isActive = true;

        if (withIndicator) {
          this.timerId = window.setInterval(() => {
            const elapsed = Date.now() - (this.state.callUpdatedAt || 0);
            const callUpdated = elapsed <= 1500;

            if (callUpdated !== this.state.callUpdated) {
              this.nextState({
                callUpdated
              });
            }
          }, 500);
        } // The attachment takes time when a lot is available, set a timeout
        // to first handle the current queue before subscribing


        setTimeout(() => {
          this.subscribe(this.getParams(this.props)).then(NOOP).catch(NOOP);
        }, 0);
      }

      componentWillUnmount() {
        this.isActive = false;
        this.unsubscribe().then(NOOP).catch(NOOP);

        if (this.timerId !== -1) {
          clearInterval(this.timerId);
        }
      }

      nextState(state) {
        if (this.isActive) {
          this.setState(state);
        }
      }

      getParams(props) {
        const paramValue = paramPick ? paramPick(props) : paramName ? props[paramName] : undefined;

        if (atProp) {
          at = props[atProp];
        } // When we are specifying a param and have an invalid, don't use it. For 'params',
        // we default to the original types, i.e. no validation (query app uses this)


        if (!paramValid && paramName && ((0, _util.isUndefined)(paramValue) || (0, _util.isNull)(paramValue))) {
          return [false, []];
        }

        const values = (0, _util.isUndefined)(paramValue) ? params : params.concat(Array.isArray(paramValue) && !paramValue.toU8a ? paramValue : [paramValue]);
        return [true, values];
      }

      getApiMethod(newParams) {
        if (endpoint === 'subscribe') {
          const [fn, ...params] = newParams;
          return [fn, params, 'subscribe'];
        }

        const endpoints = [endpoint].concat(fallbacks || []);
        const expanded = endpoints.map(this.constructApiSection);
        const [apiSection, area, section, method] = expanded.find(_ref => {
          let [apiSection] = _ref;
          return !!apiSection;
        }) || [{}, expanded[0][1], expanded[0][2], expanded[0][3]];
        (0, _util.assert)(apiSection && apiSection[method], `Unable to find api.${area}.${section}.${method}`);
        const meta = apiSection[method].meta;

        if (area === 'query' && meta !== null && meta !== void 0 && meta.type.isMap) {
          const arg = newParams[0];
          (0, _util.assert)(!(0, _util.isUndefined)(arg) && !(0, _util.isNull)(arg) || meta.type.asMap.kind.isLinkedMap, `${meta.name} expects one argument`);
        }

        return [apiSection[method], newParams, method.startsWith('subscribe') ? 'subscribe' : area];
      }

      async subscribe(_ref2) {
        let [isValid, newParams] = _ref2;

        if (!isValid || skipIf(this.props)) {
          return;
        }

        const {
          api
        } = this.props;
        let info;
        await api.isReady;

        try {
          (0, _util.assert)(at || !atProp, 'Unable to perform query on non-existent at hash');
          info = this.getApiMethod(newParams);
        } catch (error) {
          // don't flood the console with the same errors each time, just do it once, then
          // ignore it going forward
          if (!errorred[error.message]) {
            console.warn(endpoint, '::', error);
            errorred[error.message] = true;
          }
        }

        if (!info) {
          return;
        }

        const [apiMethod, params, area] = info;

        const updateCb = value => this.triggerUpdate(this.props, value);

        await this.unsubscribe();

        try {
          if (['derive', 'subscribe'].includes(area) || area === 'query' && !at && !atProp) {
            this.destroy = isMulti ? await apiMethod.multi(params, updateCb) : await apiMethod(...params, updateCb);
          } else if (area === 'consts') {
            updateCb(apiMethod);
          } else {
            updateCb(at ? await apiMethod.at(at, ...params) : await apiMethod(...params));
          }
        } catch (error) {// console.warn(endpoint, '::', error);
        }
      } // eslint-disable-next-line @typescript-eslint/require-await


      async unsubscribe() {
        if (this.destroy) {
          this.destroy();
          this.destroy = undefined;
        }
      }

      triggerUpdate(props, value) {
        try {
          const callResult = (props.transform || transform)(value);

          if (!this.isActive || (0, _index.isEqual)(callResult, this.state.callResult)) {
            return;
          }

          (0, _index.triggerChange)(callResult, callOnResult, props.callOnResult);
          this.nextState({
            callResult,
            callUpdated: true,
            callUpdatedAt: Date.now()
          });
        } catch (error) {// console.warn(endpoint, '::', (error as Error).message);
        }
      }

      render() {
        const {
          callResult,
          callUpdated,
          callUpdatedAt
        } = this.state;

        const _props = _objectSpread(_objectSpread({}, this.props), {}, {
          callUpdated,
          callUpdatedAt
        });

        if (!(0, _util.isUndefined)(callResult)) {
          _props[propName || this.propName] = callResult;
        }

        return /*#__PURE__*/(0, _jsxRuntime.jsx)(Inner, _objectSpread({}, _props));
      }

    }

    return (0, _api.default)(WithPromise);
  };
}