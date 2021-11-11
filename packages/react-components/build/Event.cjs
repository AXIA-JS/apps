"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactParams = _interopRequireDefault(require("@axia-js/react-params"));

var _types = require("@axia-js/types");

var _translate = require("./translate.cjs");

var _index = require("./util/index.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function EventDisplay({
  children,
  className = '',
  value
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const params = value.typeDef.map(({
    type
  }) => ({
    type: (0, _types.getTypeDef)(type)
  }));
  const values = value.data.map(value => ({
    isValid: true,
    value
  }));
  const abiEvent = (0, _react.useMemo)(() => {
    // for contracts, we decode the actual event
    if (value.section === 'contracts' && value.method === 'ContractExecution' && value.data.length === 2) {
      // see if we have info for this contract
      const [accountId, encoded] = value.data;

      try {
        const abi = (0, _index.getContractAbi)(accountId.toString());

        if (abi) {
          const decoded = abi.decodeEvent(encoded);
          return _objectSpread(_objectSpread({}, decoded), {}, {
            values: decoded.args.map(value => ({
              isValid: true,
              value
            }))
          });
        }
      } catch (error) {
        // ABI mismatch?
        console.error(error);
      }
    }

    return null;
  }, [value]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Event ${className}`,
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
      isDisabled: true,
      params: params,
      values: values,
      children: abiEvent && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          isDisabled: true,
          label: t('contract event'),
          value: abiEvent.event.identifier
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.default, {
          isDisabled: true,
          params: abiEvent.event.args,
          values: abiEvent.values
        })]
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(EventDisplay);

exports.default = _default;