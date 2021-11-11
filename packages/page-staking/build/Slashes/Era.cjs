"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Row = _interopRequireDefault(require("./Row.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Slashes({
  buttons,
  councilId,
  councilThreshold,
  slash
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const councilMod = (0, _reactHooks.useCollectiveInstance)('council');
  const [{
    selected,
    txAll,
    txSome
  }, setSelected] = (0, _react.useState)(() => {
    const proposal = api.tx.staking.cancelDeferredSlash(slash.era, slash.slashes.map((_, index) => index));
    return {
      selected: [],
      txAll: councilMod ? {
        length: proposal.encodedLength,
        proposal
      } : null,
      txSome: null
    };
  });
  const headerRef = (0, _react.useRef)([[t('era {{era}}/unapplied', {
    replace: {
      era: slash.era.toString()
    }
  }), 'start', 3], [t('reporters'), 'address'], [t('own')], [t('other')], [t('total')], [t('payout')], []]);

  const _onSelect = (0, _react.useCallback)(index => setSelected(state => {
    const selected = state.selected.includes(index) ? state.selected.filter(i => i !== index) : state.selected.concat(index).sort((a, b) => a - b);
    const proposal = selected.length ? api.tx.staking.cancelDeferredSlash(slash.era, selected) : null;
    return {
      selected,
      txAll: state.txAll,
      txSome: proposal && councilMod && (0, _util.isFunction)(api.tx[councilMod].propose) ? {
        length: proposal.encodedLength,
        proposal
      } : null
    };
  }), [api, councilMod, slash]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      slash: slash
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [buttons, councilMod && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: councilId,
          isDisabled: !txSome,
          isToplevel: true,
          label: t('Cancel selected'),
          params: txSome && (api.tx[councilMod].propose.meta.args.length === 3 ? [councilThreshold, txSome.proposal, txSome.length] : [councilThreshold, txSome.proposal]),
          tx: api.tx[councilMod].propose
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: councilId,
          isDisabled: !txAll,
          isToplevel: true,
          label: t('Cancel all'),
          params: txAll && (api.tx[councilMod].propose.meta.args.length === 3 ? [councilThreshold, txAll.proposal, txAll.length] : [councilThreshold, txAll.proposal]),
          tx: api.tx[councilMod].propose
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      header: headerRef.current,
      children: slash.slashes.map((slash, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Row.default, {
        index: index,
        isSelected: selected.includes(index),
        onSelect: councilId ? _onSelect : undefined,
        slash: slash
      }, index))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Slashes);

exports.default = _default;