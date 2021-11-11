// Copyright 2017-2021 @axia-js/app-poll authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { Button, Columar, InputAddress, Progress, Spinner, Tabs, Toggle, TxButton } from '@axia-js/react-components';
import { useApi, useBestNumber, useCallMulti } from '@axia-js/react-hooks';
import { BlockToTime, FormatBalance } from '@axia-js/react-query';
import { BN_MILLION, BN_ONE, BN_ZERO, bnMax, formatBalance, formatNumber } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
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
  } = useTranslation();
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  const [totalIssuance, totals] = useCallMulti([(_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance, api.query.poll.totals], optMulti);
  const [accountId, setAccountId] = useState(null);
  const [turnout, setTurnout] = useState(null);
  const [opt10m, setOpt10m] = useState(false);
  const [opt100m, setOpt100m] = useState(false);
  const [opt1b, setOpt1b] = useState(false);
  const [opt10b, setOpt10b] = useState(false);
  const [progress, setProgress] = useState();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'poll',
    text: t('Denomination poll')
  }]);
  useEffect(() => {
    if (totalIssuance && totals) {
      const max = bnMax(BN_ONE, ...totals);
      setProgress(totals.map(total => total.mul(BN_MILLION).div(max)));
      api.query.poll.voteOf.entries().then(entries => {
        const voted = entries.reduce((voted, [, [, balance]]) => voted.iadd(balance), new BN(0));
        const percentage = voted.muln(10000).div(totalIssuance).toNumber() / 100;
        setTurnout({
          percentage,
          voted
        });
      }).catch(console.log);
    }
  }, [api, totalIssuance, totals]);

  if (!totals || !progress || !bestNumber) {
    return /*#__PURE__*/_jsx("main", {
      className: className,
      children: /*#__PURE__*/_jsx("div", {
        className: "pollContainer",
        children: /*#__PURE__*/_jsx(Spinner, {
          label: t('Retrieving totals...')
        })
      })
    });
  }

  const blocksLeft = api.consts.poll.end.sub(bestNumber);
  const canVote = blocksLeft.gt(BN_ZERO);
  const options = [[t('No change'), t('No change from the original 2017 sale definitions; will mean a total of 10 million DOT from genesis.'), opt10m, setOpt10m], [t('Split of 10x'), t('Split of 10x from the original sale; will mean a total of 100 million DOT from genesis. Apparent DOT price would be 10x lower and apparent account balances 10x higher.'), opt100m, setOpt100m], [t('Split of 100x'), t('Split of 100x from the original sale; will mean a total of 1 billion DOT from genesis. Apparent DOT price would be 100x lower and apparent account balances 100x higher.'), opt1b, setOpt1b], [t('Split of 1000x'), t('Split of 1000x from the original sale; will mean a total of 10 billion DOT from genesis. Apparent DOT price would be 1000x lower and apparent account balances 1000x higher.'), opt10b, setOpt10b]];
  const hasValue = opt10m || opt100m || opt1b || opt10b;
  /* eslint-disable react/jsx-max-props-per-line */

  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsxs("div", {
      className: "pollContainer",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "pollHeader",
        children: [/*#__PURE__*/_jsx("h1", {
          children: t('denomination vote')
        }), /*#__PURE__*/_jsxs("div", {
          className: "pollBlocksRight",
          children: [turnout && /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("div", {
              children: t('{{balance}} voted', {
                replace: {
                  balance: formatBalance(turnout.voted)
                }
              })
            }), /*#__PURE__*/_jsx("div", {
              children: t('{{percentage}}% turnout', {
                replace: {
                  percentage: turnout.percentage.toFixed(2)
                }
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [canVote ? /*#__PURE__*/_jsx(BlockToTime, {
              value: blocksLeft
            }) : t('Completed'), /*#__PURE__*/_jsxs("div", {
              children: ["#", formatNumber(api.consts.poll.end)]
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs("article", {
        className: "keepAlive",
        children: [/*#__PURE__*/_jsx("p", {
          children: /*#__PURE__*/_jsx(Trans, {
            children: "The AXIA DOT denomination vote: Seventy-two hours after the DOT token becomes transferable, the most popular option from this poll will decide the denomination used for the DOT token."
          }, 'poll1')
        }), /*#__PURE__*/_jsx("p", {
          children: /*#__PURE__*/_jsxs(Trans, {
            children: ["This is an ", /*#__PURE__*/_jsx("a", {
              href: "https://en.wikipedia.org/wiki/Approval_voting",
              rel: "noreferrer",
              target: "_blank",
              children: "approval vote"
            }), ". There are four options and you may select any combination of them. The most popular of the four will be selected as the final DOT denomination three days after DOT token transfers are enabled."]
          }, 'poll2')
        }), /*#__PURE__*/_jsx("p", {
          children: /*#__PURE__*/_jsxs(Trans, {
            children: ["Please see the ", /*#__PURE__*/_jsx("a", {
              href: "https://medium.com/axia-network/the-first-axia-vote-1fc1b8bd357b",
              rel: "noreferrer",
              target: "_blank",
              children: "Medium article "
            }), " for more information"]
          }, 'poll3')
        }), canVote && /*#__PURE__*/_jsx("p", {
          className: "pollAll",
          children: /*#__PURE__*/_jsx(Trans, {
            children: /*#__PURE__*/_jsx("b", {
              children: "Please vote for any combination of options"
            })
          }, 'poll4')
        }), /*#__PURE__*/_jsx("div", {
          className: `options ${canVote ? 'canVote' : ''}`,
          children: options.map(([label, desc, value, onChange], index) => /*#__PURE__*/_jsxs(Columar, {
            is60: true,
            children: [/*#__PURE__*/_jsxs(Columar.Column, {
              className: "option",
              children: [/*#__PURE__*/_jsx("div", {
                className: "optionName",
                children: label
              }), /*#__PURE__*/_jsx("div", {
                className: "optionDesc",
                children: desc
              }), canVote && /*#__PURE__*/_jsx(Toggle, {
                className: "pollToggle",
                isDisabled: !canVote,
                label: canVote ? value ? t('Aye, I support this') : t('Nay, I do not support this') : t('Voting closed'),
                onChange: onChange,
                value: canVote && value
              })]
            }), /*#__PURE__*/_jsx(Columar.Column, {
              children: totals[index].isZero() ? /*#__PURE__*/_jsx("div", {
                className: "result"
              }) : /*#__PURE__*/_jsxs("div", {
                className: "result",
                children: [/*#__PURE__*/_jsx(FormatBalance, {
                  value: totals[index]
                }), /*#__PURE__*/_jsx(Progress, {
                  isDisabled: !turnout,
                  total: turnout === null || turnout === void 0 ? void 0 : turnout.voted,
                  value: totals[index]
                })]
              })
            })]
          }, index))
        }), canVote && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(InputAddress, {
            label: t('vote using my account'),
            onChange: setAccountId,
            type: "account"
          }), /*#__PURE__*/_jsx(Button.Group, {
            children: /*#__PURE__*/_jsx(TxButton, {
              accountId: accountId,
              icon: "paper-plane",
              isDisabled: !hasValue,
              label: t('Vote'),
              params: [[opt10m, opt100m, opt1b, opt10b]],
              tx: api.tx.poll.vote
            })
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "pollActions",
        children: /*#__PURE__*/_jsxs("ul", {
          children: [/*#__PURE__*/_jsx("li", {
            children: t('Any combination of the four options may be approved of by the voter. There is no need to select only one option!')
          }), /*#__PURE__*/_jsx("li", {
            children: t('Approving of all or none of the options is equivalent and will not affect the outcome of the poll.')
          }), /*#__PURE__*/_jsx("li", {
            children: t('All voters may alter their votes any number of times prior to the close of the poll.')
          }), /*#__PURE__*/_jsx("li", {
            children: t('Voting costs nothing other than the transaction fee and can be done from all accounts with a non-zero spendable balance.')
          }), /*#__PURE__*/_jsx("li", {
            children: t('Locked funds (e.g. for staking) are counted.')
          }), /*#__PURE__*/_jsx("li", {
            children: t('No discretionary lock-voting is in place; all DOT used to vote counts the same.')
          }), /*#__PURE__*/_jsx("li", {
            children: t('Voting is made on a per-account basis; a single account must all vote the same way and cannot split its vote.')
          }), /*#__PURE__*/_jsx("li", {
            children: t('This vote does not affect any economics of the AXIA platform. Staking rewards, inflation, effective market capitalisation and the underlying balances of every account remain completely unchanged. It is "merely" about what units we use to denominate the balances into "DOT" for the purpose of display.')
          })]
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(PollApp).withConfig({
  displayName: "src",
  componentId: "sc-17g1mqo-0"
})([".pollActions{opacity:0.75;}.pollAll{margin-bottom:0;padding:0.75rem 1rem;text-align:center;}.pollBlocksRight{position:absolute;right:0;text-align:right;opacity:0.75;bottom:0;> div{display:inline-block;padding:0 0.75rem;&+div{border-left:1px solid #bbb;}}}.pollContainer{margin:2rem auto;max-width:60rem;}.pollHeader{position:relative;}.options{margin:1rem 0;.ui--Columnar{margin:0 -1.25rem;padding:0 1.25rem;&:nth-child(odd){background:#f9f8f7;}.ui--Column{padding:1rem 1.5rem;}}.optionName{font-size:1.2rem;font-weight:var(--font-weight-normal);line-height:1;margin-bottom:0.75rem;}.pollToggle{margin-top:0.5rem;text-align:right;}&:not(.canVote){.ui--Toggle{opacity:0;.toggle{display:none;}}}}.result{align-items:center;display:flex;justify-content:flex-end;margin:0;text-align:right;.ui--FormatBalance{font-size:1.2rem;font-weight:var(--font-weight-normal);line-height:1;}.ui--Progress{margin:0.75rem;}}"]));