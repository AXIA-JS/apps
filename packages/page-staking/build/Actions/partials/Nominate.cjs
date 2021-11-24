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

var _constants = require("../../constants.cjs");

var _translate = require("../../translate.cjs");

var _SenderInfo = _interopRequireDefault(require("./SenderInfo.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Nominate(_ref) {
  let {
    className = '',
    controllerId,
    nominating,
    onChange,
    stashId,
    targets: {
      nominateIds = []
    },
    withSenders
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [favorites] = (0, _reactHooks.useFavorites)(_constants.STORE_FAVS_BASE);
  const [selected, setSelected] = (0, _react.useState)(nominating || []);
  const [available] = (0, _react.useState)(() => {
    const shortlist = [// ensure that the favorite is included in the list of stashes
    ...favorites.filter(a => nominateIds.includes(a)), // make sure the nominee is not in our favorites already
    ...(nominating || []).filter(a => !favorites.includes(a))];
    return shortlist.concat(...nominateIds.filter(a => !shortlist.includes(a)));
  });
  (0, _react.useEffect)(() => {
    try {
      onChange({
        nominateTx: selected && selected.length ? api.tx.staking.nominate(selected) : null
      });
    } catch {
      onChange({
        nominateTx: null
      });
    }
  }, [api, onChange, selected]);
  const maxNominations = api.consts.staking.maxNominations ? api.consts.staking.maxNominations.toNumber() : _constants.MAX_NOMINATIONS;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [withSenders && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SenderInfo.default, {
      controllerId: controllerId,
      stashId: stashId
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
      hint: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('Nominators can be selected manually from the list of all currently available validators.')
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('Once transmitted the new selection will only take effect in 2 eras taking the new validator election cycle into account. Until then, the nominations will show as inactive.')
        })]
      }),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddressMulti, {
        available: available,
        availableLabel: t('candidate accounts'),
        defaultValue: nominating,
        help: t('Filter available candidates based on name, address or short account index.'),
        maxCount: maxNominations,
        onChange: setSelected,
        valueLabel: t('nominated accounts')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.MarkWarning, {
        content: t('You should trust your nominations to act competently and honest; basing your decision purely on their current profitability could lead to reduced profits or even loss of funds.')
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Nominate).withConfig({
  displayName: "Nominate",
  componentId: "sc-16fagzy-0"
})(["article.warning{margin-top:0;}.auto--toggle{margin:0.5rem 0 0;text-align:right;width:100%;}.ui--Static .ui--AddressMini.padded.addressStatic{padding-top:0.5rem;.ui--AddressMini-info{min-width:10rem;max-width:10rem;}}.shortlist{display:flex;flex-wrap:wrap;justify-content:center;.candidate{border:1px solid #eee;border-radius:0.25rem;margin:0.25rem;padding-bottom:0.25rem;padding-right:0.5rem;position:relative;&::after{content:'';position:absolute;top:0;right:0;border-color:transparent;border-style:solid;border-radius:0.25em;border-width:0.25em;}&.isAye{background:#fff;border-color:#ccc;}&.member::after{border-color:green;}&.runnerup::after{border-color:steelblue;}.ui--AddressMini-icon{z-index:1;}.candidate-right{text-align:right;}}}"]));

exports.default = _default;