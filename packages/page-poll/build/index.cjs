"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-poll authors & contributors
// SPDX-License-Identifier: Apache-2.0
const optMulti = {
  defaultValue: [undefined, undefined]
};

function PollApp({
  basePath,
  className
}) {
  var _api$query$balances;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const [totalIssuance, totals] = (0, _reactHooks.useCallMulti)([(_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance, api.query.poll.totals], optMulti);
  const [accountId, setAccountId] = (0, _react.useState)(null);
  const [turnout, setTurnout] = (0, _react.useState)(null);
  const [opt10m, setOpt10m] = (0, _react.useState)(false);
  const [opt100m, setOpt100m] = (0, _react.useState)(false);
  const [opt1b, setOpt1b] = (0, _react.useState)(false);
  const [opt10b, setOpt10b] = (0, _react.useState)(false);
  const [progress, setProgress] = (0, _react.useState)();
  const itemsRef = (0, _react.useRef)([{
    isRoot: true,
    name: 'poll',
    text: t('Denomination poll')
  }]);
  (0, _react.useEffect)(() => {
    if (totalIssuance && totals) {
      const max = (0, _util.bnMax)(_util.BN_ONE, ...totals);
      setProgress(totals.map(total => total.mul(_util.BN_MILLION).div(max)));
      api.query.poll.voteOf.entries().then(entries => {
        const voted = entries.reduce((voted, [, [, balance]]) => voted.iadd(balance), new _bn.default(0));
        const percentage = voted.muln(10000).div(totalIssuance).toNumber() / 100;
        setTurnout({
          percentage,
          voted
        });
      }).catch(console.log);
    }
  }, [api, totalIssuance, totals]);

  if (!totals || !progress || !bestNumber) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("main", {
      className: className,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "pollContainer",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Spinner, {
          label: t('Retrieving totals...')
        })
      })
    });
  }

  const blocksLeft = api.consts.poll.end.sub(bestNumber);
  const canVote = blocksLeft.gt(_util.BN_ZERO);
  const options = [[t('No change'), t('No change from the original 2017 sale definitions; will mean a total of 10 million DOT from genesis.'), opt10m, setOpt10m], [t('Split of 10x'), t('Split of 10x from the original sale; will mean a total of 100 million DOT from genesis. Apparent DOT price would be 10x lower and apparent account balances 10x higher.'), opt100m, setOpt100m], [t('Split of 100x'), t('Split of 100x from the original sale; will mean a total of 1 billion DOT from genesis. Apparent DOT price would be 100x lower and apparent account balances 100x higher.'), opt1b, setOpt1b], [t('Split of 1000x'), t('Split of 1000x from the original sale; will mean a total of 10 billion DOT from genesis. Apparent DOT price would be 1000x lower and apparent account balances 1000x higher.'), opt10b, setOpt10b]];
  const hasValue = opt10m || opt100m || opt1b || opt10b;
  /* eslint-disable react/jsx-max-props-per-line */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "pollContainer",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "pollHeader",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
          children: t('denomination vote')
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "pollBlocksRight",
          children: [turnout && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              children: t('{{balance}} voted', {
                replace: {
                  balance: (0, _util.formatBalance)(turnout.voted)
                }
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              children: t('{{percentage}}% turnout', {
                replace: {
                  percentage: turnout.percentage.toFixed(2)
                }
              })
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [canVote ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
              value: blocksLeft
            }) : t('Completed'), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: ["#", (0, _util.formatNumber)(api.consts.poll.end)]
            })]
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("article", {
        className: "keepAlive",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactI18next.Trans, {
            children: "The AXIA DOT denomination vote: Seventy-two hours after the DOT token becomes transferable, the most popular option from this poll will decide the denomination used for the DOT token."
          }, 'poll1')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactI18next.Trans, {
            children: ["This is an ", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
              href: "https://en.wikipedia.org/wiki/Approval_voting",
              rel: "noreferrer",
              target: "_blank",
              children: "approval vote"
            }), ". There are four options and you may select any combination of them. The most popular of the four will be selected as the final DOT denomination three days after DOT token transfers are enabled."]
          }, 'poll2')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactI18next.Trans, {
            children: ["Please see the ", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
              href: "https://medium.com/axia-network/the-first-axia-vote-1fc1b8bd357b",
              rel: "noreferrer",
              target: "_blank",
              children: "Medium article "
            }), " for more information"]
          }, 'poll3')
        }), canVote && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "pollAll",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactI18next.Trans, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
              children: "Please vote for any combination of options"
            })
          }, 'poll4')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: `options ${canVote ? 'canVote' : ''}`,
          children: options.map(([label, desc, value, onChange], index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
            is60: true,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar.Column, {
              className: "option",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "optionName",
                children: label
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "optionDesc",
                children: desc
              }), canVote && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
                className: "pollToggle",
                isDisabled: !canVote,
                label: canVote ? value ? t('Aye, I support this') : t('Nay, I do not support this') : t('Voting closed'),
                onChange: onChange,
                value: canVote && value
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
              children: totals[index].isZero() ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "result"
              }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "result",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
                  value: totals[index]
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Progress, {
                  isDisabled: !turnout,
                  total: turnout === null || turnout === void 0 ? void 0 : turnout.voted,
                  value: totals[index]
                })]
              })
            })]
          }, index))
        }), canVote && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            label: t('vote using my account'),
            onChange: setAccountId,
            type: "account"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
              accountId: accountId,
              icon: "paper-plane",
              isDisabled: !hasValue,
              label: t('Vote'),
              params: [[opt10m, opt100m, opt1b, opt10b]],
              tx: api.tx.poll.vote
            })
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "pollActions",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('Any combination of the four options may be approved of by the voter. There is no need to select only one option!')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('Approving of all or none of the options is equivalent and will not affect the outcome of the poll.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('All voters may alter their votes any number of times prior to the close of the poll.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('Voting costs nothing other than the transaction fee and can be done from all accounts with a non-zero spendable balance.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('Locked funds (e.g. for staking) are counted.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('No discretionary lock-voting is in place; all DOT used to vote counts the same.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('Voting is made on a per-account basis; a single account must all vote the same way and cannot split its vote.')
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: t('This vote does not affect any economics of the AXIA platform. Staking rewards, inflation, effective market capitalisation and the underlying balances of every account remain completely unchanged. It is "merely" about what units we use to denominate the balances into "DOT" for the purpose of display.')
          })]
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(PollApp).withConfig({
  displayName: "src",
  componentId: "sc-17g1mqo-0"
})([".pollActions{opacity:0.75;}.pollAll{margin-bottom:0;padding:0.75rem 1rem;text-align:center;}.pollBlocksRight{position:absolute;right:0;text-align:right;opacity:0.75;bottom:0;> div{display:inline-block;padding:0 0.75rem;&+div{border-left:1px solid #bbb;}}}.pollContainer{margin:2rem auto;max-width:60rem;}.pollHeader{position:relative;}.options{margin:1rem 0;.ui--Columnar{margin:0 -1.25rem;padding:0 1.25rem;&:nth-child(odd){background:#f9f8f7;}.ui--Column{padding:1rem 1.5rem;}}.optionName{font-size:1.2rem;font-weight:var(--font-weight-normal);line-height:1;margin-bottom:0.75rem;}.pollToggle{margin-top:0.5rem;text-align:right;}&:not(.canVote){.ui--Toggle{opacity:0;.toggle{display:none;}}}}.result{align-items:center;display:flex;justify-content:flex-end;margin:0;text-align:right;.ui--FormatBalance{font-size:1.2rem;font-weight:var(--font-weight-normal);line-height:1;}.ui--Progress{margin:0.75rem;}}"]));

exports.default = _default;