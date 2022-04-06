"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _useHrmp = _interopRequireDefault(require("../useHrmp.cjs"));

var _Allychain = _interopRequireDefault(require("./Allychain.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const EMPTY_EVENTS = {
  lastBacked: {},
  lastIncluded: {},
  lastTimeout: {}
};
const optionsMulti = {
  defaultValue: [null, null, null, null]
};

function includeEntry(map, event, blockHash, blockNumber) {
  const {
    descriptor
  } = event.data[0];

  if (descriptor) {
    map[descriptor.allyId.toString()] = {
      blockHash,
      blockNumber,
      relayParent: descriptor.relayParent.toHex()
    };
  }
}

function extractScheduledIds() {
  let scheduled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return scheduled.reduce((all, _ref) => {
    let {
      scheduledIds
    } = _ref;
    return scheduledIds.reduce((all, id) => _objectSpread(_objectSpread({}, all), {}, {
      [id.toString()]: true
    }), all);
  }, {});
}

function mapValidators(startWith, ids, validators, validatorGroups, activeIndices, assignments) {
  return assignments && activeIndices && validators && validatorGroups && ids ? ids.reduce((all, id) => {
    const assignment = assignments.find(_ref2 => {
      let {
        allyId
      } = _ref2;
      return allyId.eq(id);
    });

    if (!assignment) {
      return all;
    }

    return _objectSpread(_objectSpread({}, all), {}, {
      [id.toString()]: [assignment.groupIdx, validatorGroups[assignment.groupIdx.toNumber()].map(indexActive => [indexActive, activeIndices[indexActive.toNumber()]]).filter(_ref3 => {
        let [, a] = _ref3;
        return a;
      }).map(_ref4 => {
        let [indexActive, indexValidator] = _ref4;
        return {
          indexActive,
          indexValidator,
          validatorId: validators[indexValidator.toNumber()]
        };
      })]
    });
  }, _objectSpread({}, startWith)) : startWith;
}

function extractEvents(api, lastBlock, prev) {
  const backed = {};
  const included = {};
  const timeout = {};
  const blockNumber = lastBlock.block.header.number.unwrap();
  const blockHash = lastBlock.block.header.hash.toHex();
  let wasBacked = false;
  let wasIncluded = false;
  let wasTimeout = false;
  lastBlock.events.forEach(_ref5 => {
    let {
      event,
      phase
    } = _ref5;

    if (phase.isApplyExtrinsic) {
      var _ref6, _ref7, _ref8;

      if ((_ref6 = api.events.paraInclusion || api.events.parasInclusion || api.events.inclusion) !== null && _ref6 !== void 0 && _ref6.CandidateBacked.is(event)) {
        includeEntry(backed, event, blockHash, blockNumber);
        wasBacked = true;
      } else if ((_ref7 = api.events.paraInclusion || api.events.parasInclusion || api.events.inclusion) !== null && _ref7 !== void 0 && _ref7.CandidateIncluded.is(event)) {
        includeEntry(included, event, blockHash, blockNumber);
        wasIncluded = true;
      } else if ((_ref8 = api.events.paraInclusion || api.events.parasInclusion || api.events.inclusion) !== null && _ref8 !== void 0 && _ref8.CandidateTimedOut.is(event)) {
        includeEntry(timeout, event, blockHash, blockNumber);
        wasTimeout = true;
      }
    }
  });
  return wasBacked || wasIncluded || wasTimeout ? {
    lastBacked: wasBacked ? _objectSpread(_objectSpread({}, prev.lastBacked), backed) : prev.lastBacked,
    lastIncluded: wasIncluded ? _objectSpread(_objectSpread({}, prev.lastIncluded), included) : prev.lastIncluded,
    lastTimeout: wasTimeout ? _objectSpread(_objectSpread({}, prev.lastTimeout), timeout) : prev.lastTimeout
  } : prev;
}

function extractActions(actionsQueue, knownIds) {
  return actionsQueue && knownIds ? knownIds.reduce((all, _ref9) => {
    let [id, key] = _ref9;
    return _objectSpread(_objectSpread({}, all), {}, {
      [key]: actionsQueue.find(_ref10 => {
        let {
          allyIds
        } = _ref10;
        return allyIds.some(p => p.eq(id));
      })
    });
  }, {}) : {};
}

function extractIds(hasLinksMap, ids) {
  return ids === null || ids === void 0 ? void 0 : ids.map(id => [id, id.toString()]).sort((_ref11, _ref12) => {
    let [aId, aIds] = _ref11;
    let [bId, bIds] = _ref12;
    const aKnown = hasLinksMap[aIds] || false;
    const bKnown = hasLinksMap[bIds] || false;
    return aKnown === bKnown ? aId.cmp(bId) : aKnown ? -1 : 1;
  });
}

function Allychains(_ref13) {
  var _ref14, _ref15, _ref16;

  let {
    actionsQueue,
    ids,
    leasePeriod,
    scheduled
  } = _ref13;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const lastBlock = (0, _reactHooks.useCall)(api.derive.chain.subscribeNewBlocks);
  const [{
    lastBacked,
    lastIncluded,
    lastTimeout
  }, setLastEvents] = (0, _react.useState)(EMPTY_EVENTS);
  const [validators, assignments, validatorGroups, validatorIndices] = (0, _reactHooks.useCallMulti)([api.query.session.validators, (_ref14 = api.query.parasScheduler || api.query.paraScheduler || api.query.scheduler) === null || _ref14 === void 0 ? void 0 : _ref14.scheduled, (_ref15 = api.query.parasScheduler || api.query.paraScheduler || api.query.scheduler) === null || _ref15 === void 0 ? void 0 : _ref15.validatorGroups, (_ref16 = api.query.parasShared || api.query.paraShared || api.query.shared) === null || _ref16 === void 0 ? void 0 : _ref16.activeValidatorIndices], optionsMulti);
  const hrmp = (0, _useHrmp.default)();
  const hasLinksMap = (0, _reactHooks.useIsParasLinked)(ids);
  const [validatorMap, setValidatorMap] = (0, _react.useState)({});
  const headerRef = (0, _react.useRef)([[t('allychains'), 'start', 2], ['', 'media--1400'], [t('head'), 'start media--1500'], [t('lifecycle'), 'start'], [], [t('included'), undefined, 2], [t('backed'), 'no-pad-left media--800'], [t('timeout'), 'no-pad-left media--900'], [t('chain'), 'no-pad-left'], [t('in/out (msg)'), 'media--1200', 2], [t('leases'), 'media--1000']]);
  const scheduledIds = (0, _react.useMemo)(() => extractScheduledIds(scheduled), [scheduled]);
  const knownIds = (0, _react.useMemo)(() => extractIds(hasLinksMap, ids), [ids, hasLinksMap]);
  const nextActions = (0, _react.useMemo)(() => extractActions(actionsQueue, knownIds), [actionsQueue, knownIds]);
  (0, _react.useEffect)(() => {
    lastBlock && setLastEvents(prev => extractEvents(api, lastBlock, prev));
  }, [api, lastBlock]);
  (0, _react.useEffect)(() => {
    setValidatorMap(prev => mapValidators(prev, ids, validators, validatorGroups, validatorIndices, assignments));
  }, [assignments, ids, validators, validatorGroups, validatorIndices]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
    empty: knownIds && t('There are no registered allychains'),
    header: headerRef.current,
    children: knownIds === null || knownIds === void 0 ? void 0 : knownIds.map(_ref17 => {
      let [id, key] = _ref17;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Allychain.default, {
        bestNumber: bestNumber,
        channelDst: hrmp === null || hrmp === void 0 ? void 0 : hrmp.dst[id.toString()],
        channelSrc: hrmp === null || hrmp === void 0 ? void 0 : hrmp.src[id.toString()],
        id: id,
        isScheduled: scheduledIds[key],
        lastBacked: lastBacked[key],
        lastInclusion: lastIncluded[key],
        lastTimeout: lastTimeout[key],
        leasePeriod: leasePeriod,
        nextAction: nextActions[key],
        sessionValidators: validators,
        validators: validatorMap[key]
      }, key);
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Allychains);

exports.default = _default;