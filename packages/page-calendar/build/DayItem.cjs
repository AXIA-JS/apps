"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0
const FORMAT_OPTIONS = {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric'
};

function assertUnreachable(type) {
  throw new Error(`We should not get here, unhandled ${type}`);
}

function exportCalendar(date, description) {
  const startDate = (0, _util2.dateCalendarFormat)(date); // For now just add 1 hour for each event

  const endDate = (0, _util2.dateCalendarFormat)(new Date(new Date(date).setHours(new Date(date).getHours() + 1)));
  const calData = 'BEGIN:VCALENDAR\n' + 'CALSCALE:GREGORIAN\n' + 'METHOD:PUBLISH\n' + 'PRODID:-//Test Cal//EN\n' + 'VERSION:2.0\n' + 'BEGIN:VEVENT\n' + 'UID:test-1\n' + 'DTSTART;VALUE=DATE:' + startDate + '\n' + 'DTEND;VALUE=DATE:' + endDate + '\n' + 'SUMMARY:' + description + '\n' + 'DESCRIPTION:' + description + '\n' + 'END:VEVENT\n' + 'END:VCALENDAR';
  const fileNameIcs = encodeURI(description) + '.ics';
  const data = new File([calData], fileNameIcs, {
    type: 'text/plain'
  });
  const anchor = window.document.createElement('a');
  anchor.href = window.URL.createObjectURL(data);
  anchor.download = fileNameIcs;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(anchor.href);
}

function createLink(to, desc) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "itemLink",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      href: `#/${to}`,
      children: desc
    })
  });
}

function DayItem(_ref) {
  let {
    className,
    item: {
      blockNumber,
      date,
      info,
      type
    },
    showAllEvents
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [description, setDescription] = (0, _react.useState)('');

  const _exportCal = (0, _react.useCallback)(() => exportCalendar(date, description), [description, date]);

  const desc = (0, _react.useMemo)(() => {
    const id = info && ((0, _util.isString)(info) ? info : (0, _util.formatNumber)(info));
    const typeLink = ['councilElection'].includes(type) ? createLink('council', t('via Council')) : ['councilMotion'].includes(type) ? createLink('council/motions', t('via Council/Motions')) : ['democracyDispatch', 'scheduler'].includes(type) ? createLink('democracy/dispatch', t('via Democracy/Dispatch')) : ['democracyLaunch', 'referendumDispatch', 'referendumVote'].includes(type) ? createLink('/democracy', t('via Democracy')) : ['societyChallenge', 'societyRotate'].includes(type) ? createLink('society', t('via Society')) : ['stakingEpoch', 'stakingEra'].includes(type) ? createLink('staking', t('via Staking')) : ['stakingSlash'].includes(type) ? createLink('staking/slashes', t('via Staking/Slashed')) : ['treasurySpend'].includes(type) ? createLink('treasury', t('via Treasury')) : ['allychainLease'].includes(type) ? createLink('allychains', t('via Allychains')) : ['allychainAuction'].includes(type) ? createLink('allychains/auction', t('via Allychains/Auction')) : undefined;
    let s = '';

    switch (type) {
      case 'councilElection':
        s = t('Election of new council candidates');
        break;

      case 'councilMotion':
        s = t('Voting ends on council motion {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'democracyDispatch':
        s = t('Enactment of the result of referendum {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'democracyLaunch':
        s = t('Start of the next referendum voting period');
        break;

      case 'allychainAuction':
        s = t('End of the current allychain auction {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'allychainLease':
        s = t('Start of the next allychain lease period {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'referendumDispatch':
        s = t('Potential dispatch of referendum {{id}} (if passed)', {
          replace: {
            id
          }
        });
        break;

      case 'referendumVote':
        s = t('Voting ends for referendum {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'scheduler':
        s = id ? t('Execute named scheduled task {{id}}', {
          replace: {
            id
          }
        }) : t('Execute anonymous scheduled task');
        break;

      case 'stakingEpoch':
        s = t('Start of a new staking session {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'stakingEra':
        s = t('Start of a new staking era {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'stakingSlash':
        s = t('Application of slashes from era {{id}}', {
          replace: {
            id
          }
        });
        break;

      case 'treasurySpend':
        s = t('Start of next spending period');
        break;

      case 'societyChallenge':
        s = t('Start of next membership challenge period');
        break;

      case 'societyRotate':
        s = t('Acceptance of new members and bids');
        break;

      default:
        return assertUnreachable(type);
    }

    setDescription(s);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "itemDesc",
        children: s
      }), typeLink]
    });
  }, [info, t, type]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [showAllEvents && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "itemDate",
      children: date.toLocaleString(undefined, FORMAT_OPTIONS)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "itemTime",
      children: date.toLocaleTimeString().split(':').slice(0, 2).join(':')
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "itemBlock",
      children: ["#", (0, _util.formatNumber)(blockNumber)]
    }), desc, date && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      className: showAllEvents ? 'exportCal exportCal-allEvents' : 'exportCal',
      icon: "calendar-plus",
      onClick: _exportCal
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(DayItem).withConfig({
  displayName: "DayItem",
  componentId: "sc-1t53t4i-0"
})(["align-items:flex-start;display:flex;justify-content:flex-start;margin:0.5rem 0.75rem;> div+div{margin-left:0.5rem;}> div.itemTime+div.itemBlock{margin-left:0.25rem;}.exportCal{padding:0;position:absolute;right:1.5rem;.ui--Icon{width:0.7rem;height:0.7rem;}}.exportCal-allEvents{right:3.5rem;}.itemBlock{background:#aaa;color:#eee;font-size:0.85rem;align-self:center;padding:0.075rem 0.375rem;border-radius:0.25rem;}.itemDate{padding:0 0.375rem;border-radius:0.25rem;width:17rem;}.itemTime{background:#999;color:#eee;padding:0 0.375rem;border-radius:0.25rem;}"]));

exports.default = _default;