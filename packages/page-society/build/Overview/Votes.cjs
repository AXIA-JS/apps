"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _translate = require("../translate.cjs");

var _VotesExpander = _interopRequireDefault(require("./VotesExpander.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Votes(_ref) {
  let {
    votes
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [{
    allAye,
    allNay,
    allSkeptic
  }, setVoteSplit] = (0, _react.useState)({
    allAye: [],
    allNay: [],
    allSkeptic: []
  });
  (0, _react.useEffect)(() => {
    votes && setVoteSplit({
      allAye: votes.filter(_ref2 => {
        let [, vote] = _ref2;
        return vote.isApprove;
      }),
      allNay: votes.filter(_ref3 => {
        let [, vote] = _ref3;
        return vote.isReject;
      }),
      allSkeptic: votes.filter(_ref4 => {
        let [, vote] = _ref4;
        return vote.isSkeptic;
      })
    });
  }, [votes]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
    className: "expand",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_VotesExpander.default, {
      label: t('Skeptics'),
      votes: allSkeptic
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_VotesExpander.default, {
      label: t('Approvals'),
      votes: allAye
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_VotesExpander.default, {
      label: t('Rejections'),
      votes: allNay
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Votes);

exports.default = _default;