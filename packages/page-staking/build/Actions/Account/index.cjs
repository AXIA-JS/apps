"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../../translate.cjs");

var _BondExtra = _interopRequireDefault(require("./BondExtra.cjs"));

var _InjectKeys = _interopRequireDefault(require("./InjectKeys.cjs"));

var _KickNominees = _interopRequireDefault(require("./KickNominees.cjs"));

var _ListNominees = _interopRequireDefault(require("./ListNominees.cjs"));

var _Nominate = _interopRequireDefault(require("./Nominate.cjs"));

var _SetControllerAccount = _interopRequireDefault(require("./SetControllerAccount.cjs"));

var _SetRewardDestination = _interopRequireDefault(require("./SetRewardDestination.cjs"));

var _SetSessionKey = _interopRequireDefault(require("./SetSessionKey.cjs"));

var _Unbond = _interopRequireDefault(require("./Unbond.cjs"));

var _Validate = _interopRequireDefault(require("./Validate.cjs"));

var _WarnBond = _interopRequireDefault(require("./WarnBond.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractSlashes(stashId, allSlashes = []) {
  return allSlashes.map(([era, all]) => ({
    era,
    slashes: all.filter(({
      others,
      validator
    }) => validator.eq(stashId) || others.some(([nominatorId]) => nominatorId.eq(stashId)))
  })).filter(({
    slashes
  }) => slashes.length);
}

const transformSpan = {
  transform: optSpans => optSpans.isNone ? 0 : optSpans.unwrap().prior.length + 1
};

function useStashCalls(api, stashId) {
  var _api$derive$balances;

  const params = (0, _react.useMemo)(() => [stashId], [stashId]);
  const balancesAll = (0, _reactHooks.useCall)((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, params);
  const spanCount = (0, _reactHooks.useCall)(api.query.staking.slashingSpans, params, transformSpan);
  const stakingAccount = (0, _reactHooks.useCall)(api.derive.staking.account, params);
  return {
    balancesAll,
    spanCount,
    stakingAccount
  };
}

function Account({
  allSlashes,
  className = '',
  info: {
    controllerId,
    destination,
    hexSessionIdNext,
    hexSessionIdQueue,
    isLoading,
    isOwnController,
    isOwnStash,
    isStashNominating,
    isStashValidating,
    nominating,
    sessionIds,
    stakingLedger,
    stashId
  },
  isDisabled,
  targets
}) {
  var _stakingAccount$staki, _stakingAccount$staki2, _targets$validators;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    queueExtrinsic
  } = (0, _react.useContext)(_reactComponents.StatusContext);
  const [isBondExtraOpen, toggleBondExtra] = (0, _reactHooks.useToggle)();
  const [isInjectOpen, toggleInject] = (0, _reactHooks.useToggle)();
  const [isKickOpen, toggleKick] = (0, _reactHooks.useToggle)();
  const [isNominateOpen, toggleNominate] = (0, _reactHooks.useToggle)();
  const [isRewardDestinationOpen, toggleRewardDestination] = (0, _reactHooks.useToggle)();
  const [isSetControllerOpen, toggleSetController] = (0, _reactHooks.useToggle)();
  const [isSetSessionOpen, toggleSetSession] = (0, _reactHooks.useToggle)();
  const [isUnbondOpen, toggleUnbond] = (0, _reactHooks.useToggle)();
  const [isValidateOpen, toggleValidate] = (0, _reactHooks.useToggle)();
  const {
    balancesAll,
    spanCount,
    stakingAccount
  } = useStashCalls(api, stashId);
  const slashes = (0, _react.useMemo)(() => extractSlashes(stashId, allSlashes), [allSlashes, stashId]);
  const withdrawFunds = (0, _react.useCallback)(() => {
    queueExtrinsic({
      accountId: controllerId,
      extrinsic: api.tx.staking.withdrawUnbonded.meta.args.length === 1 ? api.tx.staking.withdrawUnbonded(spanCount || 0) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore (We are doing toHex here since we have a Vec<u8> input)
      : api.tx.staking.withdrawUnbonded()
    });
  }, [api, controllerId, queueExtrinsic, spanCount]);
  const hasBonded = !!(stakingAccount !== null && stakingAccount !== void 0 && stakingAccount.stakingLedger) && !((_stakingAccount$staki = stakingAccount.stakingLedger.active) !== null && _stakingAccount$staki !== void 0 && _stakingAccount$staki.isEmpty);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge together",
      children: slashes.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "red",
        hover: t('Slashed in era {{eras}}', {
          replace: {
            eras: slashes.map(({
              era
            }) => (0, _util.formatNumber)(era)).join(', ')
          }
        }),
        icon: "skull-crossbones"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "address",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: stashId
      }), isBondExtraOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BondExtra.default, {
        controllerId: controllerId,
        onClose: toggleBondExtra,
        stakingInfo: stakingAccount,
        stashId: stashId
      }), isInjectOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_InjectKeys.default, {
        onClose: toggleInject
      }), isKickOpen && controllerId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_KickNominees.default, {
        controllerId: controllerId,
        onClose: toggleKick,
        stashId: stashId
      }), isNominateOpen && controllerId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Nominate.default, {
        controllerId: controllerId,
        nominating: nominating,
        onClose: toggleNominate,
        stashId: stashId,
        targets: targets
      }), isSetControllerOpen && controllerId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SetControllerAccount.default, {
        defaultControllerId: controllerId,
        onClose: toggleSetController,
        stashId: stashId
      }), isRewardDestinationOpen && controllerId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SetRewardDestination.default, {
        controllerId: controllerId,
        defaultDestination: destination,
        onClose: toggleRewardDestination,
        stashId: stashId
      }), isSetSessionOpen && controllerId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SetSessionKey.default, {
        controllerId: controllerId,
        onClose: toggleSetSession,
        stashId: stashId
      }), isUnbondOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Unbond.default, {
        controllerId: controllerId,
        onClose: toggleUnbond,
        stakingLedger: stakingLedger,
        stashId: stashId
      }), isValidateOpen && controllerId && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Validate.default, {
        controllerId: controllerId,
        onClose: toggleValidate,
        stashId: stashId
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: controllerId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "start media--1200",
      children: destination !== null && destination !== void 0 && destination.isAccount ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: destination.asAccount
      }) : destination === null || destination === void 0 ? void 0 : destination.toString()
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.StakingBonded, {
        stakingInfo: stakingAccount
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.StakingUnbonding, {
        stakingInfo: stakingAccount
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.StakingRedeemable, {
        stakingInfo: stakingAccount
      })]
    }), isStashValidating ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "all",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressInfo, {
        address: stashId,
        withBalance: false,
        withHexSessionId: hexSessionIdNext !== '0x' && [hexSessionIdQueue, hexSessionIdNext],
        withValidatorPrefs: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_WarnBond.default, {
        minBond: targets.minValidatorBond,
        stakingInfo: stakingAccount
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "all expand left",
      children: isStashNominating && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListNominees.default, {
          nominating: nominating,
          stashId: stashId
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_WarnBond.default, {
          minBond: targets.minNominatorBond,
          stakingInfo: stakingAccount
        })]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: !isLoading && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [isStashNominating || isStashValidating ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: controllerId,
          icon: "stop",
          isDisabled: !isOwnController || isDisabled,
          label: t('Stop'),
          tx: api.tx.staking.chill
        }, 'stop') : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
          children: [!sessionIds.length || hexSessionIdNext === '0x' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "sign-in-alt",
            isDisabled: !isOwnController || isDisabled,
            label: t('Session Key'),
            onClick: toggleSetSession
          }, 'set') : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "certificate",
            isDisabled: !isOwnController || isDisabled || !hasBonded,
            label: t('Validate'),
            onClick: toggleValidate
          }, 'validate'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
            icon: "hand-paper",
            isDisabled: !isOwnController || isDisabled || !hasBonded,
            label: t('Nominate'),
            onClick: toggleNominate
          }, 'nominate')]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Popup, {
          isDisabled: isDisabled,
          value: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Menu, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
              disabled: !isOwnStash || !(balancesAll !== null && balancesAll !== void 0 && balancesAll.freeBalance.gtn(0)),
              onClick: toggleBondExtra,
              children: t('Bond more funds')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
              disabled: !isOwnController || !stakingAccount || !stakingAccount.stakingLedger || ((_stakingAccount$staki2 = stakingAccount.stakingLedger.active) === null || _stakingAccount$staki2 === void 0 ? void 0 : _stakingAccount$staki2.isEmpty),
              onClick: toggleUnbond,
              children: t('Unbond funds')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
              disabled: !isOwnController || !stakingAccount || !stakingAccount.redeemable || !stakingAccount.redeemable.gtn(0),
              onClick: withdrawFunds,
              children: t('Withdraw unbonded funds')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Divider, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
              disabled: !isOwnStash,
              onClick: toggleSetController,
              children: t('Change controller account')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
              disabled: !isOwnController,
              onClick: toggleRewardDestination,
              children: t('Change reward destination')
            }), isStashValidating && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
                disabled: !isOwnController,
                onClick: toggleValidate,
                children: t('Change validator preferences')
              }), (0, _util.isFunction)(api.tx.staking.kick) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
                disabled: !isOwnController,
                onClick: toggleKick,
                children: t('Remove nominees')
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Divider, {}), !isStashNominating && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
              disabled: !isOwnController,
              onClick: toggleSetSession,
              children: t('Change session keys')
            }), isStashNominating && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
              disabled: !isOwnController || !((_targets$validators = targets.validators) !== null && _targets$validators !== void 0 && _targets$validators.length),
              onClick: toggleNominate,
              children: t('Set nominees')
            }), !isStashNominating && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Menu.Item, {
              onClick: toggleInject,
              children: t('Inject session keys (advanced)')
            })]
          })
        }, 'settings')]
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Account).withConfig({
  displayName: "Account",
  componentId: "sc-8od2nh-0"
})([".ui--Button-Group{display:inline-block;margin-right:0.25rem;vertical-align:inherit;}"]));

exports.default = _default;