"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Static = _interopRequireDefault(require("./Static.cjs"));

var _Unknown = _interopRequireDefault(require("./Unknown.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function isDispatchError(value) {
  return !!(value && (value.isModule || value.isToken));
}

function ErrorDisplay(props) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const [{
    details,
    type
  }, setDetails] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    const {
      value
    } = props.defaultValue || {};

    if (isDispatchError(value)) {
      if (value.isModule) {
        try {
          const mod = value.asModule;
          const {
            docs,
            name,
            section
          } = mod.registry.findMetaError(mod);
          return setDetails({
            details: docs.join(', '),
            type: `${section}.${name}`
          });
        } catch (error) {
          // Errors may not actually be exposed, in this case, just return the default representation
          console.error(error);
        }
      } else if (value.isToken) {
        return setDetails({
          details: value.asToken.type,
          type: value.type
        });
      }
    }

    setDetails({
      details: null
    });
  }, [props.defaultValue]);

  if (!props.isDisabled || !details) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unknown.default, _objectSpread({}, props));
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Static.default, _objectSpread(_objectSpread({}, props), {}, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      className: "full",
      isDisabled: true,
      label: t('type'),
      value: type
    }), details && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
      className: "full",
      isDisabled: true,
      label: t('details'),
      value: details
    })]
  }));
}

var _default = /*#__PURE__*/_react.default.memo(ErrorDisplay);

exports.default = _default;