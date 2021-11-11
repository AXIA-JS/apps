"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Summary = _interopRequireDefault(require("@axia-js/app-bounties/Summary"));

var _reactComponents = require("@axia-js/react-components");

var _Bounty = _interopRequireDefault(require("./Bounty.cjs"));

var _BountyCreate = _interopRequireDefault(require("./BountyCreate.cjs"));

var _index = require("./hooks/index.cjs");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Bounties({
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    bestNumber,
    bounties
  } = (0, _index.useBounties)();
  const headerRef = (0, _react.useRef)([[t('bounties'), 'start', 3], [t('value'), 'start'], [t('curator'), 'start'], [t('next action'), 'start', 3]]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      activeBounties: bounties === null || bounties === void 0 ? void 0 : bounties.length
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyCreate.default, {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      className: "bounties-table-wrapper",
      empty: bounties && t('No open bounties'),
      header: headerRef.current,
      withCollapsibleRows: true,
      children: bounties && bestNumber && bounties.sort((a, b) => b.index.cmp(a.index)).map(({
        bounty,
        description,
        index,
        proposals
      }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Bounty.default, {
        bestNumber: bestNumber,
        bounty: bounty,
        description: description,
        index: index,
        proposals: proposals
      }, index.toNumber()))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Bounties).withConfig({
  displayName: "Bounties",
  componentId: "sc-10cn2qp-0"
})([".bounties-table-wrapper table{tr{td,&:not(.filter) th{&:last-child{padding-right:1.14rem;}}}}.ui--IdentityIcon{margin-right:0.42rem;}.via-identity .name{font-size:1rem;line-height:1.7rem;text-transform:initial;filter:initial;opacity:1;}"]));

exports.default = _default;