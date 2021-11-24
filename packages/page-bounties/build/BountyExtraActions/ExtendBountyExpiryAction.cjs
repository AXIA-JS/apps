"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = require("../helpers/index.cjs");

var _increaseDateByBlocks = require("../helpers/increaseDateByBlocks.cjs");

var _index2 = require("../hooks/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ExtendBountyExpiryAction(_ref) {
  let {
    curatorId,
    description,
    index,
    toggleOpen
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    bountyUpdatePeriod,
    extendBountyExpiry
  } = (0, _index2.useBounties)();
  const [remark, setRemark] = (0, _react.useState)('');
  const [blockTime, timeAsText] = (0, _reactHooks.useBlockTime)(bountyUpdatePeriod);
  const onRemarkChange = (0, _react.useCallback)(value => {
    setRemark(value);
  }, []);
  const expiryDate = (0, _react.useMemo)(() => bountyUpdatePeriod && (0, _increaseDateByBlocks.increaseDateByBlocks)(bountyUpdatePeriod, blockTime), [bountyUpdatePeriod, blockTime]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
      header: `${t('extend expiry')} - "${(0, _index.truncateTitle)(description, 30)}"`,
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t('Only curator can extend the bounty time.'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
            help: t('This account will be used to create an extend bounty expire transaction.'),
            isDisabled: true,
            label: t('curator account'),
            type: "account",
            value: curatorId.toString(),
            withLabel: true
          })
        }), expiryDate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t(`Bounty expiry time will be set to ${timeAsText} from now.`),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            help: t('The extended expiry date does not depend on the current expiry date.'),
            isDisabled: true,
            label: t('new expiry date and time'),
            value: `${expiryDate.toLocaleDateString()} ${expiryDate.toLocaleTimeString()}`
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Columns, {
          hint: t("The note that will be added to the transaction. It won't be stored on chain"),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
            autoFocus: true,
            defaultValue: '',
            help: t('The note linked to the extension call, explaining the reason behind it.'),
            label: t('bounty remark'),
            onChange: onRemarkChange,
            value: remark
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Modal.Actions, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
          accountId: curatorId,
          icon: "check",
          label: t('Accept'),
          onStart: toggleOpen,
          params: [index, remark],
          tx: extendBountyExpiry
        })
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(ExtendBountyExpiryAction);

exports.default = _default;