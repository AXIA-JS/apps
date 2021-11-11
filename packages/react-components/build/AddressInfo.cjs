"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _hoc = require("@axia-js/react-api/hoc");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _CryptoType = _interopRequireDefault(require("./CryptoType.cjs"));

var _DemocracyLocks = _interopRequireDefault(require("./DemocracyLocks.cjs"));

var _Label = _interopRequireDefault(require("./Label.cjs"));

var _StakingRedeemable = _interopRequireDefault(require("./StakingRedeemable.cjs"));

var _StakingUnbonding = _interopRequireDefault(require("./StakingUnbonding.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DEFAULT_BALANCES = {
  available: true,
  bonded: true,
  locked: true,
  redeemable: true,
  reserved: true,
  total: true,
  unlocking: true,
  vested: true
};
const DEFAULT_EXTENDED = {
  crypto: true,
  nonce: true
};
const DEFAULT_PREFS = {
  unstakeThreshold: true,
  validatorPayment: true
}; // auxiliary component that helps aligning balances details, fills up the space when no icon for a balance is specified

function IconVoid() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: "icon-void",
    children: "\xA0"
  });
}

function lookupLock(lookup, lockId) {
  const lockHex = lockId.toHex();

  try {
    const lockName = (0, _util.hexToString)(lockHex);
    return lookup[lockName] || lockName;
  } catch (error) {
    return lockHex;
  }
} // skip balances retrieval of none of this matches


function skipBalancesIf({
  withBalance = true,
  withExtended = false
}) {
  if (withBalance === true || withExtended === true) {
    return false;
  } else if ((0, _util.isObject)(withBalance)) {
    // these all pull from the all balances
    if (withBalance.available || withBalance.locked || withBalance.reserved || withBalance.total || withBalance.vested) {
      return false;
    }
  } else if ((0, _util.isObject)(withExtended)) {
    if (withExtended.nonce) {
      return false;
    }
  }

  return true;
}

function skipStakingIf({
  stakingInfo,
  withBalance = true,
  withValidatorPrefs = false
}) {
  if (stakingInfo) {
    return true;
  } else if (withBalance === true || withValidatorPrefs) {
    return false;
  } else if ((0, _util.isObject)(withBalance)) {
    if (withBalance.unlocking || withBalance.redeemable) {
      return false;
    } else if (withBalance.bonded) {
      return Array.isArray(withBalance.bonded);
    }
  }

  return true;
} // calculates the bonded, first being the own, the second being nominated


function calcBonded(stakingInfo, bonded) {
  let other = [];
  let own = _util.BN_ZERO;

  if (Array.isArray(bonded)) {
    other = bonded.filter((_, index) => index !== 0).filter(value => value.gt(_util.BN_ZERO));
    own = bonded[0];
  } else if (stakingInfo && stakingInfo.stakingLedger && stakingInfo.stakingLedger.active && stakingInfo.accountId.eq(stakingInfo.stashId)) {
    own = stakingInfo.stakingLedger.active.unwrap();
  }

  return [own, other];
}

function renderExtended({
  address,
  balancesAll,
  withExtended
}, t) {
  const extendedDisplay = withExtended === true ? DEFAULT_EXTENDED : withExtended || undefined;

  if (!extendedDisplay) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "column",
    children: [balancesAll && extendedDisplay.nonce && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
        label: t('transactions')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "result",
        children: (0, _util.formatNumber)(balancesAll.accountNonce)
      })]
    }), extendedDisplay.crypto && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
        label: t('type')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CryptoType.default, {
        accountId: address,
        className: "result"
      })]
    })]
  });
}

function renderValidatorPrefs({
  stakingInfo,
  withValidatorPrefs = false
}, t) {
  const validatorPrefsDisplay = withValidatorPrefs === true ? DEFAULT_PREFS : withValidatorPrefs;

  if (!validatorPrefsDisplay || !stakingInfo || !stakingInfo.validatorPrefs) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {}), validatorPrefsDisplay.unstakeThreshold && stakingInfo.validatorPrefs.unstakeThreshold && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
        label: t('unstake threshold')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "result",
        children: stakingInfo.validatorPrefs.unstakeThreshold.toString()
      })]
    }), validatorPrefsDisplay.validatorPayment && (stakingInfo.validatorPrefs.commission || stakingInfo.validatorPrefs.validatorPayment) && (stakingInfo.validatorPrefs.validatorPayment ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
        label: t('commission')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        className: "result",
        value: stakingInfo.validatorPrefs.validatorPayment
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
        label: t('commission')
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        children: [(stakingInfo.validatorPrefs.commission.unwrap().toNumber() / 10000000).toFixed(2), "%"]
      })]
    }))]
  });
}

function createBalanceItems(formatIndex, lookup, t, {
  address,
  balanceDisplay,
  balancesAll,
  bestNumber,
  democracyLocks,
  isAllLocked,
  otherBonded,
  ownBonded,
  stakingInfo,
  votingOf,
  withBalanceToggle,
  withLabel
}) {
  var _lockedBalance, _balancesAll$reserved, _stakingInfo$redeemab;

  const allItems = [];
  !withBalanceToggle && balancesAll && balanceDisplay.total && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      label: withLabel ? t('total') : ''
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      className: "result",
      formatIndex: formatIndex,
      labelPost: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconVoid, {}),
      value: balancesAll.freeBalance.add(balancesAll.reservedBalance)
    })]
  }, 0));
  balancesAll && balanceDisplay.available && balancesAll.availableBalance && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      label: t('transferrable')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      className: "result",
      formatIndex: formatIndex,
      labelPost: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconVoid, {}),
      value: balancesAll.availableBalance
    })]
  }, 1));
  balanceDisplay.vested && (balancesAll === null || balancesAll === void 0 ? void 0 : balancesAll.isVesting) && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      label: t('vested')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      className: "result",
      formatIndex: formatIndex,
      labelPost: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        icon: "info-circle",
        tooltip: `${address}-vested-trigger`
      }),
      value: balancesAll.vestedBalance,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tooltip, {
        text: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [(0, _util.formatBalance)(balancesAll.vestedClaimable, {
              forceUnit: '-'
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "faded",
              children: t('available to be unlocked')
            })]
          }), bestNumber.lt(balancesAll.vestingEndBlock) && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
                value: balancesAll.vestingEndBlock.sub(bestNumber)
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: "faded",
                children: [t('until block'), " ", (0, _util.formatNumber)(balancesAll.vestingEndBlock)]
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [(0, _util.formatBalance)(balancesAll.vestingPerBlock), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "faded",
                children: t('per block')
              })]
            })]
          })]
        }),
        trigger: `${address}-vested-trigger`
      })
    })]
  }, 2));
  balanceDisplay.locked && balancesAll && (isAllLocked || ((_lockedBalance = balancesAll.lockedBalance) === null || _lockedBalance === void 0 ? void 0 : _lockedBalance.gtn(0))) && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      label: t('locked')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      className: "result",
      formatIndex: formatIndex,
      labelPost: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        icon: "info-circle",
        tooltip: `${address}-locks-trigger`
      }),
      value: isAllLocked ? 'all' : balancesAll.lockedBalance,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tooltip, {
        text: balancesAll.lockedBreakdown.map(({
          amount,
          id,
          reasons
        }, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [amount !== null && amount !== void 0 && amount.isMax() ? t('everything') : (0, _util.formatBalance)(amount, {
            forceUnit: '-'
          }), id && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "faded",
            children: lookupLock(lookup, id)
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "faded",
            children: reasons.toString()
          })]
        }, index)),
        trigger: `${address}-locks-trigger`
      })
    })]
  }, 3));
  balanceDisplay.reserved && (balancesAll === null || balancesAll === void 0 ? void 0 : (_balancesAll$reserved = balancesAll.reservedBalance) === null || _balancesAll$reserved === void 0 ? void 0 : _balancesAll$reserved.gtn(0)) && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      label: t('reserved')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      className: "result",
      formatIndex: formatIndex,
      labelPost: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconVoid, {}),
      value: balancesAll.reservedBalance
    })]
  }, 4));
  balanceDisplay.bonded && (ownBonded.gtn(0) || otherBonded.length !== 0) && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      label: t('bonded')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      className: "result",
      formatIndex: formatIndex,
      labelPost: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconVoid, {}),
      value: ownBonded,
      children: otherBonded.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: ["\xA0(+", otherBonded.map((bonded, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          formatIndex: formatIndex,
          labelPost: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconVoid, {}),
          value: bonded
        }, index)), ")"]
      })
    })]
  }, 5));
  balanceDisplay.redeemable && (stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$redeemab = stakingInfo.redeemable) === null || _stakingInfo$redeemab === void 0 ? void 0 : _stakingInfo$redeemab.gtn(0)) && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
      label: t('redeemable')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_StakingRedeemable.default, {
      className: "result",
      stakingInfo: stakingInfo
    })]
  }, 6));

  if (balanceDisplay.unlocking) {
    (stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.unlocking) && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
        label: t('unbonding')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "result",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_StakingUnbonding.default, {
          iconPosition: "right",
          stakingInfo: stakingInfo
        })
      })]
    }, 7));

    if (democracyLocks && democracyLocks.length !== 0) {
      allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
          label: t('democracy')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "result",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DemocracyLocks.default, {
            value: democracyLocks
          })
        })]
      }, 8));
    } else if (votingOf && votingOf.isDirect) {
      const {
        prior: [unlockAt, balance]
      } = votingOf.asDirect;
      balance.gt(_util.BN_ZERO) && unlockAt.gt(_util.BN_ZERO) && allItems.push( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
          label: t('democracy')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "result",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DemocracyLocks.default, {
            value: [{
              balance,
              isFinished: bestNumber.gt(unlockAt),
              unlockAt
            }]
          })
        })]
      }, 8));
    }
  }

  if (withBalanceToggle) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.default.Fragment, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        summary: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          formatIndex: formatIndex,
          value: balancesAll && balancesAll.freeBalance.add(balancesAll.reservedBalance)
        }),
        children: allItems.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "body column",
          children: allItems
        })
      })
    }, formatIndex);
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.default.Fragment, {
    children: allItems
  }, formatIndex);
}

function renderBalances(props, lookup, bestNumber, t) {
  const {
    address,
    balancesAll,
    democracyLocks,
    stakingInfo,
    votingOf,
    withBalance = true,
    withBalanceToggle = false,
    withLabel = false
  } = props;
  const balanceDisplay = withBalance === true ? DEFAULT_BALANCES : withBalance || false;

  if (!bestNumber || !balanceDisplay) {
    return [null];
  }

  const [ownBonded, otherBonded] = calcBonded(stakingInfo, balanceDisplay.bonded);
  const isAllLocked = !!balancesAll && balancesAll.lockedBreakdown.some(({
    amount
  }) => amount === null || amount === void 0 ? void 0 : amount.isMax());
  const baseOpts = {
    address,
    balanceDisplay,
    bestNumber,
    democracyLocks,
    isAllLocked,
    otherBonded,
    ownBonded,
    votingOf,
    withBalanceToggle,
    withLabel
  };
  const items = [createBalanceItems(0, lookup, t, _objectSpread(_objectSpread({}, baseOpts), {}, {
    balancesAll,
    stakingInfo
  }))];
  withBalanceToggle && (balancesAll === null || balancesAll === void 0 ? void 0 : balancesAll.additional.length) && balancesAll.additional.forEach((balancesAll, index) => {
    items.push(createBalanceItems(index + 1, lookup, t, _objectSpread(_objectSpread({}, baseOpts), {}, {
      balancesAll
    })));
  });
  return items;
}

function AddressInfo(props) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const {
    children,
    className = '',
    extraInfo,
    withBalanceToggle,
    withHexSessionId
  } = props;
  const lookup = (0, _react.useRef)({
    democrac: t('via Democracy/Vote'),
    phrelect: t('via Council/Vote'),
    'staking ': t('via Staking/Bond'),
    'vesting ': t('via Vesting')
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--AddressInfo${className}${withBalanceToggle ? ' ui--AddressInfo-expander' : ''}`,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `column${withBalanceToggle ? ' column--expander' : ''}`,
      children: [renderBalances(props, lookup.current, bestNumber, t), withHexSessionId && withHexSessionId[0] && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
          label: t('session keys')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "result",
          children: withHexSessionId[0]
        })]
      }), withHexSessionId && withHexSessionId[0] !== withHexSessionId[1] && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
          label: t('session next')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "result",
          children: withHexSessionId[1]
        })]
      }), renderValidatorPrefs(props, t), extraInfo && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {}), extraInfo.map(([label, value], index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.default, {
            label: label
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "result",
            children: value
          })]
        }, `label:${index}`))]
      })]
    }), renderExtended(props, t), children && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "column",
      children: children
    })]
  });
}

var _default = (0, _hoc.withMulti)((0, _styledComponents.default)(AddressInfo).withConfig({
  displayName: "AddressInfo",
  componentId: "sc-1b7y1qw-0"
})(["align-items:flex-start;display:flex;flex:1;white-space:nowrap;&:not(.ui--AddressInfo-expander){justify-content:flex-end;}.column{max-width:260px;&.column--expander{width:17.5rem;.ui--Expander{width:100%;.summary{display:inline-block;text-align:right;min-width:12rem;}}}&:not(.column--expander){flex:1;display:grid;column-gap:0.75rem;row-gap:0.5rem;opacity:1;label{grid-column:1;padding-right:0.5rem;text-align:right;vertical-align:middle;.help.circle.icon{display:none;}}.result{grid-column:2;text-align:right;.ui--Icon,.icon-void{margin-left:0.25rem;margin-right:0;padding-right:0 !important;}.icon-void{float:right;width:1em;}}}}"]), (0, _hoc.withCalls)(['derive.balances.all', {
  paramName: 'address',
  propName: 'balancesAll',
  skipIf: skipBalancesIf
}], ['derive.staking.account', {
  paramName: 'address',
  propName: 'stakingInfo',
  skipIf: skipStakingIf
}], ['derive.democracy.locks', {
  paramName: 'address',
  propName: 'democracyLocks',
  skipIf: skipStakingIf
}], ['query.democracy.votingOf', {
  paramName: 'address',
  propName: 'votingOf',
  skipIf: skipStakingIf
}]));

exports.default = _default;