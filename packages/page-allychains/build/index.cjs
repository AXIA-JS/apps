"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = _interopRequireDefault(require("./Auctions/index.cjs"));

var _index2 = _interopRequireDefault(require("./Crowdloan/index.cjs"));

var _index3 = _interopRequireDefault(require("./Overview/index.cjs"));

var _index4 = _interopRequireDefault(require("./Allythreads/index.cjs"));

var _index5 = _interopRequireDefault(require("./Proposals/index.cjs"));

var _translate = require("./translate.cjs");

var _useActionsQueue = _interopRequireDefault(require("./useActionsQueue.cjs"));

var _useAuctionInfo = _interopRequireDefault(require("./useAuctionInfo.cjs"));

var _useFunds = _interopRequireDefault(require("./useFunds.cjs"));

var _useLeasePeriod = _interopRequireDefault(require("./useLeasePeriod.cjs"));

var _useOwnedIds = _interopRequireDefault(require("./useOwnedIds.cjs"));

var _useProposals = _interopRequireDefault(require("./useProposals.cjs"));

var _useUpcomingIds = _interopRequireDefault(require("./useUpcomingIds.cjs"));

var _useWinningData = _interopRequireDefault(require("./useWinningData.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function AllychainsApp(_ref) {
  let {
    basePath,
    className
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const auctionInfo = (0, _useAuctionInfo.default)();
  const campaigns = (0, _useFunds.default)();
  const leasePeriod = (0, _useLeasePeriod.default)();
  const ownedIds = (0, _useOwnedIds.default)();
  const winningData = (0, _useWinningData.default)(auctionInfo);
  const proposals = (0, _useProposals.default)();
  const actionsQueue = (0, _useActionsQueue.default)();
  const upcomingIds = (0, _useUpcomingIds.default)();
  const allyIds = (0, _reactHooks.useCall)(api.query.paras.allychains);
  const items = (0, _react.useRef)([{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    name: 'allythreads',
    text: t('Allythreads')
  }, api.query.proposeAllychain && {
    name: 'proposals',
    text: t('Proposals')
  }, api.query.auctions && {
    name: 'auctions',
    text: t('Auctions')
  }, api.query.crowdloan && {
    name: 'crowdloan',
    text: t('Crowdloan')
  }].filter(q => !!q));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: items.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouter.Switch, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/auctions`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
          auctionInfo: auctionInfo,
          campaigns: campaigns,
          ownedIds: ownedIds,
          winningData: winningData
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/crowdloan`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
          auctionInfo: auctionInfo,
          campaigns: campaigns,
          leasePeriod: leasePeriod,
          ownedIds: ownedIds
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouter.Route, {
        path: `${basePath}/proposals`,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.default, {
          proposals: proposals
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {
      actionsQueue: actionsQueue,
      className: pathname === basePath ? '' : 'allychains--hidden',
      leasePeriod: leasePeriod,
      allyIds: allyIds,
      proposals: proposals,
      threadIds: upcomingIds
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.default, {
      actionsQueue: actionsQueue,
      className: pathname === `${basePath}/allythreads` ? '' : 'allychains--hidden',
      ids: upcomingIds,
      leasePeriod: leasePeriod,
      ownedIds: ownedIds
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AllychainsApp).withConfig({
  displayName: "src",
  componentId: "sc-izok9j-0"
})([".allychains--hidden{display:none;}"]));

exports.default = _default;