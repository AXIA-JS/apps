"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _useExtensions = _interopRequireDefault(require("../useExtensions.cjs"));

var _iconOption = _interopRequireDefault(require("./iconOption.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Extensions(_ref) {
  let {
    chainInfo,
    className
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    extensions
  } = (0, _useExtensions.default)();
  const [selectedIndex, setSelectedIndex] = (0, _react.useState)(0);
  const [isBusy, toggleBusy] = (0, _reactHooks.useToggle)();
  const options = (0, _react.useMemo)(() => (extensions || []).map((_ref2, value) => {
    let {
      extension: {
        name,
        version
      }
    } = _ref2;
    return (0, _iconOption.default)(`${name} ${version}`, value, _appsConfig.extensionLogos[name]);
  }), [extensions]);

  const _updateMeta = (0, _react.useCallback)(() => {
    if (chainInfo && extensions !== null && extensions !== void 0 && extensions[selectedIndex]) {
      toggleBusy();
      extensions[selectedIndex].update(chainInfo).catch(() => false).then(() => toggleBusy()).catch(console.error);
    }
  }, [chainInfo, extensions, selectedIndex, toggleBusy]);

  const headerRef = (0, _react.useRef)([[t('Extensions'), 'start']]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    className: className,
    empty: t('No Upgradable extensions'),
    header: headerRef.current,
    children: extensions ? options.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
        className: "noBorder",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Dropdown, {
            label: t('upgradable extensions'),
            onChange: setSelectedIndex,
            options: options,
            value: selectedIndex
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
        className: "hasOddRowColoring",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
              icon: "upload",
              isDisabled: isBusy,
              label: t('Update metadata'),
              onClick: _updateMeta
            })
          })
        })
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {})
  });
}

var _default = /*#__PURE__*/_react.default.memo(Extensions);

exports.default = _default;