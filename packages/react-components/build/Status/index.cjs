"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "StatusContext", {
  enumerable: true,
  get: function () {
    return _Context.default;
  }
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _AddressMini = _interopRequireDefault(require("../AddressMini.cjs"));

var _index = _interopRequireDefault(require("../Button/index.cjs"));

var _Icon = _interopRequireDefault(require("../Icon.cjs"));

var _Spinner = _interopRequireDefault(require("../Spinner.cjs"));

var _translate = require("../translate.cjs");

var _constants = require("./constants.cjs");

var _Context = _interopRequireDefault(require("./Context.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function iconName(status) {
  switch (status) {
    case 'error':
      return 'ban';

    case 'event':
      return 'assistive-listening-systems';

    case 'received':
      return 'telegram-plane';

    default:
      return 'check';
  }
}

function signerIconName(status) {
  switch (status) {
    case 'cancelled':
      return 'ban';

    case 'completed':
    case 'inblock':
    case 'finalized':
    case 'sent':
      return 'check';

    case 'dropped':
    case 'invalid':
    case 'usurped':
      return 'arrow-down';

    case 'error':
    case 'finalitytimeout':
      return 'exclamation-triangle';

    case 'queued':
      // case 'retracted':
      return 'random';

    default:
      return 'spinner';
  }
}

function renderStatus(_ref) {
  let {
    account,
    action,
    id,
    message,
    removeItem,
    status
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `item ${status}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "wrapper",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "container",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
          icon: "times",
          onClick: removeItem
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "short",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
            icon: iconName(status)
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "desc",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "header",
            children: Array.isArray(action) ? action.map((action, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              children: action
            }, index)) : action
          }), account && /*#__PURE__*/(0, _jsxRuntime.jsx)(_AddressMini.default, {
            value: account
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "status",
            children: message
          })]
        })]
      })
    })
  }, id);
}

function renderItem(_ref2) {
  let {
    error,
    extrinsic,
    id,
    removeItem,
    rpc,
    status
  } = _ref2;
  let {
    method,
    section
  } = rpc;

  if (extrinsic) {
    const found = extrinsic.registry.findMetaCall(extrinsic.callIndex);

    if (found.section !== 'unknown') {
      method = found.method;
      section = found.section;
    }
  }

  const icon = signerIconName(status);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `item ${status}`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "wrapper",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "container",
        children: [_constants.STATUS_COMPLETE.includes(status) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
          icon: "times",
          onClick: removeItem
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "short",
          children: icon === 'spinner' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.default, {
            variant: "push"
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Icon.default, {
            icon: icon
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "desc",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "header",
            children: [section, ".", method]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "status",
            children: error ? error.message || error : status
          })]
        })]
      })
    })
  }, id);
}

function filterSt(stqueue) {
  return (stqueue || []).filter(_ref3 => {
    let {
      isCompleted
    } = _ref3;
    return !isCompleted;
  });
}

function filterTx(txqueue) {
  const allTx = (txqueue || []).filter(_ref4 => {
    let {
      status
    } = _ref4;
    return !['completed', 'incomplete'].includes(status);
  });
  return [allTx, allTx.filter(_ref5 => {
    let {
      status
    } = _ref5;
    return _constants.STATUS_COMPLETE.includes(status);
  })];
}

function Status(_ref6) {
  let {
    className = ''
  } = _ref6;
  const {
    stqueue,
    txqueue
  } = (0, _react.useContext)(_Context.default);
  const [allSt, setAllSt] = (0, _react.useState)([]);
  const [[allTx, completedTx], setAllTx] = (0, _react.useState)([[], []]);
  const {
    t
  } = (0, _translate.useTranslation)();
  (0, _react.useEffect)(() => {
    setAllSt(filterSt(stqueue));
  }, [stqueue]);
  (0, _react.useEffect)(() => {
    setAllTx(filterTx(txqueue));
  }, [txqueue]);

  const _onDismiss = (0, _react.useCallback)(() => {
    allSt.map(s => s.removeItem());
    completedTx.map(t => t.removeItem());
  }, [allSt, completedTx]);

  if (!allSt.length && !allTx.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Status ${className}`,
    children: [allSt.length + completedTx.length > 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "dismiss",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        icon: "times",
        isBasic: true,
        isFull: true,
        label: t('Dismiss all notifications'),
        onClick: _onDismiss
      })
    }), allTx.map(renderItem), allSt.map(renderStatus)]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Status).withConfig({
  displayName: "Status",
  componentId: "sc-u2ac7k-0"
})(["display:inline-block;position:fixed;right:0.75rem;top:0.75rem;width:23rem;z-index:1001;.dismiss{margin-bottom:0.25rem;.ui--Button{border:1px solid white;}}.item{display:block;> .wrapper > .container{align-items:center;background:#00688b;border-radius:0.25rem;color:white;display:flex;justify-content:space-between;margin-bottom:0.25rem;padding:0 0.5rem;vertical-align:middle;position:relative;.desc{flex:1;overflow:hidden;padding:0.5rem 1rem;.status{font-weight:var(--font-weight-normal);}.ui--AddressMini{.ui--AddressMini-address{min-width:0;text-align:left;}}}.header{opacity:0.66;}.short{font-size:2.5rem;opacity:0.75;padding:0.5rem 0 0.5rem 0.5rem;.ui--Icon{color:white !important;line-height:1;}}.padded{padding:0.25rem 0 0 0 !important;}.ui--Icon.isClickable{position:absolute;top:0.5rem;right:0.5rem;cursor:pointer;}}&.cancelled > .wrapper > .container{background:#cd9b1d}&.event > .wrapper > .container{background:teal;}&.completed,&.finalized,&.inblock,&.sent,&.success{& > .wrapper > .container{background:green;}}&.dropped,&.error,&.finalitytimeout,&.invalid,&.usurped{& > .wrapper > .container{background:red;}}}"]));

exports.default = _default;