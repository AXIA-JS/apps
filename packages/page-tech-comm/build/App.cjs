"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = _interopRequireDefault(require("./Overview/index.cjs"));

var _index2 = _interopRequireDefault(require("./Proposals/index.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
const HIDDEN_EMPTY = [];
const HIDDEN_PROPOSALS = ['proposals'];

function TechCommApp(_ref) {
  let {
    basePath,
    className,
    type
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    isMember,
    members
  } = (0, _reactHooks.useCollectiveMembers)(type);
  const prime = (0, _reactHooks.useCall)(api.derive[type].prime);
  const hasProposals = (0, _reactHooks.useCall)(api.derive[type].hasProposals);
  const proposalHashes = (0, _reactHooks.useCall)(api.derive[type].proposalHashes);
  const items = (0, _react.useMemo)(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    name: 'proposals',
    text: t('Proposals ({{count}})', {
      replace: {
        count: proposalHashes && proposalHashes.length || 0
      }
    })
  }], [proposalHashes, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      hidden: hasProposals ? HIDDEN_EMPTY : HIDDEN_PROPOSALS,
      items: items
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/proposals`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
          isMember: isMember,
          members: members,
          prime: prime,
          proposalHashes: proposalHashes,
          type: type
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: basePath,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
          isMember: isMember,
          members: members,
          prime: prime,
          proposalHashes: proposalHashes,
          type: type
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(TechCommApp);

exports.default = _default;