// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AddressMini from "../AddressMini.js";
import Button from "../Button/index.js";
import Icon from "../Icon.js";
import Spinner from "../Spinner.js";
import { useTranslation } from "../translate.js";
import { STATUS_COMPLETE } from "./constants.js";
import StatusContext from "./Context.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { StatusContext };

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

function renderStatus({
  account,
  action,
  id,
  message,
  removeItem,
  status
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `item ${status}`,
    children: /*#__PURE__*/_jsx("div", {
      className: "wrapper",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container",
        children: [/*#__PURE__*/_jsx(Icon, {
          icon: "times",
          onClick: removeItem
        }), /*#__PURE__*/_jsx("div", {
          className: "short",
          children: /*#__PURE__*/_jsx(Icon, {
            icon: iconName(status)
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "desc",
          children: [/*#__PURE__*/_jsx("div", {
            className: "header",
            children: Array.isArray(action) ? action.map((action, index) => /*#__PURE__*/_jsx("div", {
              children: action
            }, index)) : action
          }), account && /*#__PURE__*/_jsx(AddressMini, {
            value: account
          }), /*#__PURE__*/_jsx("div", {
            className: "status",
            children: message
          })]
        })]
      })
    })
  }, id);
}

function renderItem({
  error,
  extrinsic,
  id,
  removeItem,
  rpc,
  status
}) {
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
  return /*#__PURE__*/_jsx("div", {
    className: `item ${status}`,
    children: /*#__PURE__*/_jsx("div", {
      className: "wrapper",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container",
        children: [STATUS_COMPLETE.includes(status) && /*#__PURE__*/_jsx(Icon, {
          icon: "times",
          onClick: removeItem
        }), /*#__PURE__*/_jsx("div", {
          className: "short",
          children: icon === 'spinner' ? /*#__PURE__*/_jsx(Spinner, {
            variant: "push"
          }) : /*#__PURE__*/_jsx(Icon, {
            icon: icon
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "desc",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "header",
            children: [section, ".", method]
          }), /*#__PURE__*/_jsx("div", {
            className: "status",
            children: error ? error.message || error : status
          })]
        })]
      })
    })
  }, id);
}

function filterSt(stqueue) {
  return (stqueue || []).filter(({
    isCompleted
  }) => !isCompleted);
}

function filterTx(txqueue) {
  const allTx = (txqueue || []).filter(({
    status
  }) => !['completed', 'incomplete'].includes(status));
  return [allTx, allTx.filter(({
    status
  }) => STATUS_COMPLETE.includes(status))];
}

function Status({
  className = ''
}) {
  const {
    stqueue,
    txqueue
  } = useContext(StatusContext);
  const [allSt, setAllSt] = useState([]);
  const [[allTx, completedTx], setAllTx] = useState([[], []]);
  const {
    t
  } = useTranslation();
  useEffect(() => {
    setAllSt(filterSt(stqueue));
  }, [stqueue]);
  useEffect(() => {
    setAllTx(filterTx(txqueue));
  }, [txqueue]);

  const _onDismiss = useCallback(() => {
    allSt.map(s => s.removeItem());
    completedTx.map(t => t.removeItem());
  }, [allSt, completedTx]);

  if (!allSt.length && !allTx.length) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Status ${className}`,
    children: [allSt.length + completedTx.length > 1 && /*#__PURE__*/_jsx("div", {
      className: "dismiss",
      children: /*#__PURE__*/_jsx(Button, {
        icon: "times",
        isBasic: true,
        isFull: true,
        label: t('Dismiss all notifications'),
        onClick: _onDismiss
      })
    }), allTx.map(renderItem), allSt.map(renderStatus)]
  });
}

export default /*#__PURE__*/React.memo(styled(Status).withConfig({
  displayName: "Status",
  componentId: "sc-1k5vjvw-0"
})(["display:inline-block;position:fixed;right:0.75rem;top:0.75rem;width:23rem;z-index:1001;.dismiss{margin-bottom:0.25rem;.ui--Button{border:1px solid white;}}.item{display:block;> .wrapper > .container{align-items:center;background:#00688b;border-radius:0.25rem;color:white;display:flex;justify-content:space-between;margin-bottom:0.25rem;padding:0 0.5rem;vertical-align:middle;position:relative;.desc{flex:1;overflow:hidden;padding:0.5rem 1rem;.status{font-weight:var(--font-weight-normal);}.ui--AddressMini{.ui--AddressMini-address{min-width:0;text-align:left;}}}.header{opacity:0.66;}.short{font-size:2.5rem;opacity:0.75;padding:0.5rem 0 0.5rem 0.5rem;.ui--Icon{color:white !important;line-height:1;}}.padded{padding:0.25rem 0 0 0 !important;}.ui--Icon.isClickable{position:absolute;top:0.5rem;right:0.5rem;cursor:pointer;}}&.cancelled > .wrapper > .container{background:#cd9b1d}&.event > .wrapper > .container{background:teal;}&.completed,&.finalized,&.inblock,&.sent,&.success{& > .wrapper > .container{background:green;}}&.dropped,&.error,&.finalitytimeout,&.invalid,&.usurped{& > .wrapper > .container{background:red;}}}"]));