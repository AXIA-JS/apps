"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _appsConfig = require("@axia-js/apps-config");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Era = _interopRequireDefault(require("./Era.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function calcSlashEras(slashes, ownStashes) {
  const slashEras = [];
  slashes.reduce((rows, _ref) => {
    let [era, slashes] = _ref;
    return slashes.reduce((rows, slash) => {
      const totalOther = slash.others.reduce((total, _ref2) => {
        let [, value] = _ref2;
        return total.add(value);
      }, new _bn.default(0));
      const isMine = ownStashes.some(_ref3 => {
        let {
          stashId
        } = _ref3;
        return slash.validator.eq(stashId) || slash.others.some(_ref4 => {
          let [nominatorId] = _ref4;
          return nominatorId.eq(stashId);
        });
      });
      rows.push({
        era,
        isMine,
        slash,
        total: slash.own.add(totalOther),
        totalOther
      });
      return rows;
    }, rows);
  }, []).forEach(slash => {
    let slashEra = slashEras.find(_ref5 => {
      let {
        era
      } = _ref5;
      return era.eq(slash.era);
    });

    if (!slashEra) {
      slashEra = {
        era: slash.era,
        nominators: [],
        payout: new _bn.default(0),
        reporters: [],
        slashes: [],
        total: new _bn.default(0),
        validators: []
      };
      slashEras.push(slashEra);
    }

    slashEra.payout.iadd(slash.slash.payout);
    slashEra.total.iadd(slash.total);
    slashEra.slashes.push(slash);
    const validatorId = slash.slash.validator.toString();

    if (!slashEra.validators.includes(validatorId)) {
      slashEra.validators.push(validatorId);
    }

    slash.slash.others.forEach(_ref6 => {
      let [accountId] = _ref6;
      const nominatorId = accountId.toString();

      if (slashEra && !slashEra.nominators.includes(nominatorId)) {
        slashEra.nominators.push(nominatorId);
      }
    });
    slash.slash.reporters.forEach(accountId => {
      const reporterId = accountId.toString();

      if (slashEra && !slashEra.reporters.includes(reporterId)) {
        slashEra.reporters.push(reporterId);
      }
    });
  });
  return slashEras.sort((a, b) => b.era.cmp(a.era));
}

function Slashes(_ref7) {
  let {
    ownStashes = [],
    slashes
  } = _ref7;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    members
  } = (0, _reactHooks.useCollectiveMembers)('council');
  const [selectedIndex, setSelectedIndex] = (0, _react.useState)(0);
  const rows = (0, _react.useMemo)(() => calcSlashEras(slashes, ownStashes), [ownStashes, slashes]);
  const eraOpts = (0, _react.useMemo)(() => rows.map(_ref8 => {
    let {
      era
    } = _ref8;
    return {
      text: t('era {{era}}', {
        replace: {
          era: (0, _util.formatNumber)(era)
        }
      }),
      value: era.toString()
    };
  }), [rows, t]);
  const councilId = (0, _react.useMemo)(() => allAccounts.find(accountId => members.includes(accountId)) || null, [allAccounts, members]);

  if (!rows.length) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: t('There are no unapplied/pending slashes'),
      header: [[t('unapplied'), 'start']]
    });
  }

  const councilThreshold = Math.ceil((members.length || 0) * (0, _appsConfig.getSlashProposalThreshold)(api));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Era.default, {
    buttons: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ToggleGroup, {
      onChange: setSelectedIndex,
      options: eraOpts,
      value: selectedIndex
    }),
    councilId: councilId,
    councilThreshold: councilThreshold,
    slash: rows[selectedIndex]
  }, rows[selectedIndex].era.toString());
}

var _default = /*#__PURE__*/_react.default.memo(Slashes);

exports.default = _default;