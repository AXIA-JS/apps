"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidatorsContext = exports.BlockAuthorsContext = exports.BlockAuthors = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
const MAX_HEADERS = 75;
const byAuthor = {};
const eraPoints = {};

const BlockAuthorsContext = /*#__PURE__*/_react.default.createContext({
  byAuthor,
  eraPoints,
  lastBlockAuthors: [],
  lastHeaders: []
});

exports.BlockAuthorsContext = BlockAuthorsContext;

const ValidatorsContext = /*#__PURE__*/_react.default.createContext([]);

exports.ValidatorsContext = ValidatorsContext;

function BlockAuthorsBase(_ref) {
  var _api$derive$staking;

  let {
    children
  } = _ref;
  const {
    api,
    isApiReady
  } = (0, _reactHooks.useApi)();
  const queryPoints = (0, _reactHooks.useCall)(isApiReady && ((_api$derive$staking = api.derive.staking) === null || _api$derive$staking === void 0 ? void 0 : _api$derive$staking.currentPoints));
  const [state, setState] = (0, _react.useState)({
    byAuthor,
    eraPoints,
    lastBlockAuthors: [],
    lastHeaders: []
  });
  const [validators, setValidators] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    // No unsub, global context - destroyed on app close
    api.isReady.then(() => {
      var _api$query$authorMapp, _api$query$authorMapp2;

      let lastHeaders = [];
      let lastBlockAuthors = [];
      let lastBlockNumber = '';
      const isAuthorIds = (0, _util.isFunction)((_api$query$authorMapp = api.query.authorMapping) === null || _api$query$authorMapp === void 0 ? void 0 : _api$query$authorMapp.authorIds); // TODO-MOONBEAM reevaluate in a month: 07/16/21

      const isAuthorMappingWithDeposit = (0, _util.isFunction)((_api$query$authorMapp2 = api.query.authorMapping) === null || _api$query$authorMapp2 === void 0 ? void 0 : _api$query$authorMapp2.mappingWithDeposit); // subscribe to all validators

      api.query.session && api.query.session.validators(validatorIds => {
        setValidators(validatorIds.map(validatorId => validatorId.toString()));
      }).catch(console.error); // subscribe to new headers

      api.derive.chain.subscribeNewHeads(async lastHeader => {
        if (lastHeader !== null && lastHeader !== void 0 && lastHeader.number) {
          const blockNumber = lastHeader.number.unwrap();
          let thisBlockAuthor = '';

          if (lastHeader.author) {
            thisBlockAuthor = lastHeader.author.toString();
          } else if (isAuthorMappingWithDeposit && lastHeader.digest.logs && lastHeader.digest.logs[0] && lastHeader.digest.logs[0].isConsensus && lastHeader.digest.logs[0].asConsensus[1]) {
            // Some blockchains such as Moonbeam need to fetch the author accountId from a mapping
            thisBlockAuthor = (await api.query.authorMapping.mappingWithDeposit(lastHeader.digest.logs[0].asConsensus[1])).toHuman().account;
            lastHeader.authorFromMapping = thisBlockAuthor;
          } else if (isAuthorIds && lastHeader.digest.logs && lastHeader.digest.logs[0] && lastHeader.digest.logs[0].isConsensus && lastHeader.digest.logs[0].asConsensus[1]) {
            // TODO-MOONBEAM reevaluate in a month: 07/16/21
            // Some blockchains such as Moonbeam need to fetch the author accountId from a mapping (function call may differ according to pallet version)
            thisBlockAuthor = (await api.query.authorMapping.authorIds(lastHeader.digest.logs[0].asConsensus[1])).toString();
            lastHeader.authorFromMapping = thisBlockAuthor;
          }

          const thisBlockNumber = (0, _util.formatNumber)(blockNumber);

          if (thisBlockAuthor) {
            byAuthor[thisBlockAuthor] = thisBlockNumber;

            if (thisBlockNumber !== lastBlockNumber) {
              lastBlockNumber = thisBlockNumber;
              lastBlockAuthors = [thisBlockAuthor];
            } else {
              lastBlockAuthors.push(thisBlockAuthor);
            }
          }

          lastHeaders = lastHeaders.filter((old, index) => index < MAX_HEADERS && old.number.unwrap().lt(blockNumber)).reduce((next, header) => {
            next.push(header);
            return next;
          }, [lastHeader]).sort((a, b) => b.number.unwrap().cmp(a.number.unwrap()));
          setState({
            byAuthor,
            eraPoints,
            lastBlockAuthors: lastBlockAuthors.slice(),
            lastBlockNumber,
            lastHeader,
            lastHeaders
          });
        }
      }).catch(console.error);
    }).catch(console.error); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(() => {
    if (queryPoints) {
      const entries = [...queryPoints.individual.entries()].map(_ref2 => {
        let [accountId, points] = _ref2;
        return [accountId.toString(), (0, _util.formatNumber)(points)];
      });
      const current = Object.keys(eraPoints); // we have an update, clear all previous

      if (current.length !== entries.length) {
        current.forEach(accountId => {
          delete eraPoints[accountId];
        });
      }

      entries.forEach(_ref3 => {
        let [accountId, points] = _ref3;
        eraPoints[accountId] = points;
      });
    }
  }, [queryPoints]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ValidatorsContext.Provider, {
    value: validators,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(BlockAuthorsContext.Provider, {
      value: state,
      children: children
    })
  });
}

const BlockAuthors = /*#__PURE__*/_react.default.memo(BlockAuthorsBase);

exports.BlockAuthors = BlockAuthors;