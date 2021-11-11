"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Consts = _interopRequireDefault(require("./Consts.cjs"));

var _Modules = _interopRequireDefault(require("./Modules.cjs"));

var _Raw = _interopRequireDefault(require("./Raw.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

let id = -1;

function Selection({
  basePath,
  onAdd
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'modules',
    text: t('Storage')
  }, {
    name: 'constants',
    text: t('Constants')
  }, {
    name: 'raw',
    text: t('Raw storage')
  }]);

  const _onAdd = (0, _react.useCallback)(query => onAdd(_objectSpread(_objectSpread({}, query), {}, {
    id: ++id
  })), [onAdd]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/constants`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Consts.default, {
          onAdd: _onAdd
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/raw`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Raw.default, {
          onAdd: _onAdd
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Modules.default, {
          onAdd: _onAdd
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Selection);

exports.default = _default;