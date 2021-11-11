// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddressSmall, Columar, LinkExternal, Table } from '@axia-js/react-components';
import { useApi, useIsMountedRef } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import Events from "../Events.js";
import { useTranslation } from "../translate.js";
import Extrinsics from "./Extrinsics.js";
import Justifications from "./Justifications.js";
import Logs from "./Logs.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const EMPTY_HEADER = [['...', 'start', 6]];

function transformResult([events, getBlock, getHeader]) {
  return [events.map((record, index) => ({
    indexes: [index],
    key: `${Date.now()}-${index}-${record.hash.toHex()}`,
    record
  })), getBlock, getHeader];
}

function BlockByHash({
  className = '',
  error,
  value
}) {
  var _api$consts$system$bl;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const mountedRef = useIsMountedRef();
  const [[events, getBlock, getHeader], setState] = useState([]);
  const [myError, setError] = useState(error);
  useEffect(() => {
    value && Promise.all([api.query.system.events.at(value), api.rpc.chain.getBlock(value), api.derive.chain.getHeader(value)]).then(result => {
      mountedRef.current && setState(transformResult(result));
    }).catch(error => {
      mountedRef.current && setError(error);
    });
  }, [api, mountedRef, value]);
  const header = useMemo(() => getHeader ? [[formatNumber(getHeader.number.unwrap()), 'start', 1], [t('hash'), 'start'], [t('parent'), 'start'], [t('extrinsics'), 'start'], [t('state'), 'start'], [undefined, 'media--1200']] : EMPTY_HEADER, [getHeader, t]);
  const blockNumber = getHeader === null || getHeader === void 0 ? void 0 : getHeader.number.unwrap();
  const parentHash = getHeader === null || getHeader === void 0 ? void 0 : getHeader.parentHash.toHex();
  const hasParent = !(getHeader !== null && getHeader !== void 0 && getHeader.parentHash.isEmpty);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      events: events,
      maxBlockWeight: (_api$consts$system$bl = api.consts.system.blockWeights) === null || _api$consts$system$bl === void 0 ? void 0 : _api$consts$system$bl.maxBlock,
      signedBlock: getBlock
    }), /*#__PURE__*/_jsx(Table, {
      header: header,
      isFixed: true,
      children: myError ? /*#__PURE__*/_jsx("tr", {
        children: /*#__PURE__*/_jsx("td", {
          colSpan: 6,
          children: t('Unable to retrieve the specified block details. {{error}}', {
            replace: {
              error: myError.message
            }
          })
        })
      }) : getBlock && getHeader && !getBlock.isEmpty && !getHeader.isEmpty && /*#__PURE__*/_jsxs("tr", {
        children: [/*#__PURE__*/_jsx("td", {
          className: "address",
          children: getHeader.author && /*#__PURE__*/_jsx(AddressSmall, {
            value: getHeader.author
          })
        }), /*#__PURE__*/_jsx("td", {
          className: "hash overflow",
          children: getHeader.hash.toHex()
        }), /*#__PURE__*/_jsx("td", {
          className: "hash overflow",
          children: hasParent ? /*#__PURE__*/_jsx(Link, {
            to: `/explorer/query/${parentHash || ''}`,
            children: parentHash
          }) : parentHash
        }), /*#__PURE__*/_jsx("td", {
          className: "hash overflow",
          children: getHeader.extrinsicsRoot.toHex()
        }), /*#__PURE__*/_jsx("td", {
          className: "hash overflow",
          children: getHeader.stateRoot.toHex()
        }), /*#__PURE__*/_jsx("td", {
          className: "media--1200",
          children: /*#__PURE__*/_jsx(LinkExternal, {
            data: value,
            type: "block"
          })
        })]
      })
    }), getBlock && getHeader && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Extrinsics, {
        blockNumber: blockNumber,
        events: events,
        value: getBlock.block.extrinsics
      }), /*#__PURE__*/_jsxs(Columar, {
        children: [/*#__PURE__*/_jsx(Columar.Column, {
          children: /*#__PURE__*/_jsx(Events, {
            eventClassName: "explorer--BlockByHash-block",
            events: events === null || events === void 0 ? void 0 : events.filter(({
              record: {
                phase
              }
            }) => !phase.isApplyExtrinsic),
            label: t('system events')
          })
        }), /*#__PURE__*/_jsxs(Columar.Column, {
          children: [/*#__PURE__*/_jsx(Logs, {
            value: getHeader.digest.logs
          }), /*#__PURE__*/_jsx(Justifications, {
            value: getBlock.justifications
          })]
        })]
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(BlockByHash);