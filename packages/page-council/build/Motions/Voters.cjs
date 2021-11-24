"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Voters(_ref) {
  let {
    isAye,
    members,
    threshold,
    votes
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const count = (0, _react.useMemo)(() => {
    const num = threshold.toNumber();
    const max = isAye ? num : members !== null && members !== void 0 && members.length ? members.length - num + 1 : 0;
    return `${votes.length}${max ? `/${max}` : ''}`;
  }, [isAye, members, threshold, votes]);

  if (!count || !votes.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
    summary: isAye ? t('Aye {{count}}', {
      replace: {
        count
      }
    }) : t('Nay {{count}}', {
      replace: {
        count
      }
    }),
    children: votes.map(address => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
      value: address,
      withBalance: false
    }, address.toString()))
  });
}

var _default = /*#__PURE__*/_react.default.memo(Voters);

exports.default = _default;