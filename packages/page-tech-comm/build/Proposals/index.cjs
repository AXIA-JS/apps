"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Proposal = _interopRequireDefault(require("./Proposal.cjs"));

var _Propose = _interopRequireDefault(require("./Propose.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Proposals(_ref) {
  let {
    className = '',
    isMember,
    members,
    prime,
    proposalHashes,
    type
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const headerRef = (0, _react.useRef)([[t('proposals'), 'start', 2], [t('threshold')], [t('voting end')], [t('aye'), 'address'], [t('nay'), 'address'], []]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Propose.default, {
        isMember: isMember,
        members: members,
        type: type
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: proposalHashes && t('No committee proposals'),
      header: headerRef.current,
      children: proposalHashes === null || proposalHashes === void 0 ? void 0 : proposalHashes.map(hash => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Proposal.default, {
        imageHash: hash,
        isMember: isMember,
        members: members,
        prime: prime,
        type: type
      }, hash.toHex()))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Proposals);

exports.default = _default;