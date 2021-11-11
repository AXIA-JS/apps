// Copyright 2017-2021 @axia-js/app-nodeinfo authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { useApi } from '@axia-js/react-hooks';
import Extrinsics from "../BlockInfo/Extrinsics.js";
import { useTranslation } from "../translate.js";
import Peers from "./Peers.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const POLL_TIMEOUT = 9900;

async function retrieveInfo(api) {
  try {
    const [blockNumber, health, peers, extrinsics] = await Promise.all([api.derive.chain.bestNumber(), api.rpc.system.health().catch(() => null), api.rpc.system.peers().catch(() => null), api.rpc.author.pendingExtrinsics().catch(() => null)]);
    return {
      blockNumber,
      extrinsics,
      health,
      peers
    };
  } catch (error) {
    return {};
  }
}

function NodeInfo() {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [info, setInfo] = useState({});
  const [nextRefresh, setNextRefresh] = useState(() => Date.now());
  useEffect(() => {
    const _getStatus = () => {
      retrieveInfo(api).then(setInfo).catch(console.error);
    };

    _getStatus();

    const timerId = window.setInterval(() => {
      setNextRefresh(Date.now() + POLL_TIMEOUT);

      _getStatus();
    }, POLL_TIMEOUT);
    return () => {
      window.clearInterval(timerId);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Summary, {
      info: info,
      nextRefresh: nextRefresh
    }), /*#__PURE__*/_jsx(Peers, {
      peers: info.peers
    }), /*#__PURE__*/_jsx(Extrinsics, {
      blockNumber: info.blockNumber,
      label: t('pending extrinsics'),
      value: info.extrinsics
    })]
  });
}

export default /*#__PURE__*/React.memo(NodeInfo);