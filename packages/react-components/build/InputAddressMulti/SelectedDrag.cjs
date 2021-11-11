"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Apps = require("../../../apps/src/Apps.cjs");

var _AddressToggle = _interopRequireDefault(require("../AddressToggle.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const portal = document.getElementById(_Apps.PORTAL_ID);

function Selected({
  address,
  index,
  onDeselect
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBeautifulDnd.Draggable, {
    draggableId: address,
    index: index,
    children: (provided, snapshot) => {
      const element = /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread(_objectSpread(_objectSpread({
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: provided.innerRef
      }, provided.draggableProps), provided.dragHandleProps), {}, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AddressToggle.default, {
          address: address,
          className: snapshot.isDragging ? 'isDragging' : '',
          noToggle: true,
          onChange: onDeselect
        })
      }));
      return snapshot.isDragging ? /*#__PURE__*/_reactDom.default.createPortal(element, portal) : element;
    }
  }, address);
}

var _default = /*#__PURE__*/_react.default.memo(Selected);

exports.default = _default;