"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _Motion = _interopRequireDefault(require("./Motion.cjs"));

var _ProposeExternal = _interopRequireDefault(require("./ProposeExternal.cjs"));

var _ProposeMotion = _interopRequireDefault(require("./ProposeMotion.cjs"));

var _Slashing = _interopRequireDefault(require("./Slashing.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Proposals({
  className = '',
  motions,
  prime
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    isMember,
    members
  } = (0, _reactHooks.useCollectiveMembers)('council');
  const headerRef = (0, _react.useRef)([[t('motions'), 'start', 2], [t('threshold')], [t('voting end')], [t('votes'), 'expand'], [], [undefined, 'badge'], []]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposeMotion.default, {
        isMember: isMember,
        members: members
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposeExternal.default, {
        isMember: isMember,
        members: members
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Slashing.default, {
        isMember: isMember,
        members: members
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: motions && t('No council motions'),
      header: headerRef.current,
      children: motions === null || motions === void 0 ? void 0 : motions.map(motion => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Motion.default, {
        isMember: isMember,
        members: members,
        motion: motion,
        prime: prime
      }, motion.hash.toHex()))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Proposals);

exports.default = _default;