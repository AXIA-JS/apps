"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TabsContext = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _CurrentSection = _interopRequireDefault(require("./CurrentSection.cjs"));

var _Tab = _interopRequireDefault(require("./Tab.cjs"));

var _TabsSectionDelimiter = _interopRequireDefault(require("./TabsSectionDelimiter.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const TabsContext = /*#__PURE__*/_react.default.createContext({});

exports.TabsContext = TabsContext;

// redirect on invalid tabs
function redirect(basePath, location, items, hidden) {
  if (location.pathname !== basePath) {
    // Has the form /staking/query/<something>
    const [,, section] = location.pathname.split('/');
    const alias = items.find(({
      alias
    }) => alias === section);

    if (alias) {
      window.location.hash = alias.isRoot ? basePath : `${basePath}/${alias.name}`;
    } else if (hidden && (hidden.includes(section) || !items.some(({
      isRoot,
      name
    }) => !isRoot && name === section))) {
      window.location.hash = basePath;
    }
  }
}

function Tabs({
  basePath,
  className = '',
  hidden,
  items
}) {
  const location = (0, _reactRouterDom.useLocation)();

  const {
    icon,
    text
  } = _react.default.useContext(TabsContext);

  (0, _react.useEffect)(() => redirect(basePath, location, items, hidden), [basePath, hidden, items, location]);
  const filtered = hidden ? items.filter(({
    name
  }) => !hidden.includes(name)) : items;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("header", {
    className: `ui--Tabs ${className}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "tabs-container",
      children: [text && icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CurrentSection.default, {
        icon: icon,
        text: text
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TabsSectionDelimiter.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
        className: "ui--TabsList",
        children: filtered.map((tab, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: /*#__PURE__*/(0, _react.createElement)(_Tab.default, _objectSpread(_objectSpread({}, tab), {}, {
            basePath: basePath,
            index: index,
            key: tab.name
          }))
        }, index))
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Tabs).withConfig({
  displayName: "Tabs",
  componentId: "sc-1ubxreb-0"
})(["background:var(--bg-tabs);border-bottom:1px solid var(--border-tabs);text-align:left;z-index:1;& .tabs-container{display:flex;align-items:center;width:100%;margin:0 auto;max-width:var(--width-full);padding:0 1.5rem 0 0;height:3.286rem;}&::-webkit-scrollbar{display:none;width:0px;}.ui--TabsList{display:flex;list-style:none;height:100%;margin:0 1.4rem;white-space:nowrap;padding:0;@media only screen and (max-width:900px){margin:0 2.72rem 0 2.35rem;}}"]));

exports.default = _default;