import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChainImg, Input, QrNetworkSpecs, Spinner, Table } from '@axia-js/react-components';
import { useApi, useDebounce } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import ChainColorIndicator from "./ChainColorIndicator.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

const initialState = {
  chainType: 'substrate',
  color: '#FFFFFF',
  decimals: 0,
  genesisHash: '',
  prefix: 0,
  title: '',
  unit: 'UNIT'
};

function NetworkSpecs({
  chainInfo,
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    isApiReady,
    systemChain
  } = useApi();
  const [qrData, setQrData] = useState(initialState);
  const debouncedQrData = useDebounce(qrData, 500);

  const reducer = (state, delta) => {
    const newState = _objectSpread(_objectSpread({}, state), delta);

    setQrData(newState);
    return newState;
  };

  const [networkSpecs, setNetworkSpecs] = useReducer(reducer, initialState);
  useEffect(() => {
    chainInfo && setNetworkSpecs({
      chainType: chainInfo.chainType,
      color: chainInfo.color || getRandomColor(),
      decimals: chainInfo.tokenDecimals,
      genesisHash: chainInfo.genesisHash,
      prefix: chainInfo.ss58Format,
      title: systemChain,
      unit: chainInfo.tokenSymbol
    });
  }, [chainInfo, systemChain]);

  const _onChangeColor = useCallback(color => setNetworkSpecs({
    color
  }), []);

  const _onSetRandomColor = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    setNetworkSpecs({
      color: getRandomColor()
    });
  }, []);

  const _checkColorValid = useCallback(() => /^#[\da-fA-F]{6}|#[\da-fA-F]{3}$/.test(networkSpecs.color), [networkSpecs]);

  const headerRef = useRef([[t('chain specifications'), 'start', '2']]);

  if (!isApiReady) {
    return /*#__PURE__*/_jsx(Spinner, {});
  }

  return /*#__PURE__*/_jsxs(Table, {
    className: className,
    empty: t('No open tips'),
    header: headerRef.current,
    children: [/*#__PURE__*/_jsxs("tr", {
      children: [/*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsxs("div", {
          className: "settings--networkSpecs-name",
          children: [/*#__PURE__*/_jsx(Input, {
            className: "full",
            help: t('Name of the network. It is only for display purposes.'),
            isDisabled: true,
            label: t('Network Name'),
            value: networkSpecs.title
          }), /*#__PURE__*/_jsx(ChainImg, {
            className: "settings--networkSpecs-logo"
          })]
        })
      }), /*#__PURE__*/_jsx("td", {
        rowSpan: 6,
        children: qrData.genesisHash && /*#__PURE__*/_jsx(QrNetworkSpecs, {
          className: "settings--networkSpecs-qr",
          networkSpecs: debouncedQrData
        })
      })]
    }), /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsxs("div", {
          className: "settings--networkSpecs-color",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Input, {
              className: "full settings--networkSpecs-colorInput",
              help: t('The color used to distinguish this network with others, use color code with 3 or 6 digits, like "#FFF" or "#111111"'),
              isError: !_checkColorValid(),
              label: t('Color'),
              onChange: _onChangeColor,
              value: networkSpecs.color
            }), /*#__PURE__*/_jsx("a", {
              className: "settings--networkSpecs-colorChangeButton",
              onClick: _onSetRandomColor,
              children: "generate random color"
            })]
          }), /*#__PURE__*/_jsx(ChainColorIndicator, {
            className: "settings--networkSpecs-colorBar",
            color: networkSpecs.color
          })]
        })
      })
    }), /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(Input, {
          className: "full",
          help: t('Genesis Hash refers to initial state of the chain, it cannot be changed once the chain is launched'),
          isDisabled: true,
          label: t('Genesis Hash'),
          value: networkSpecs.genesisHash
        })
      })
    }), /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(Input, {
          className: "full",
          help: t('Unit decides the name of 1 unit token, e.g. "DOT" for AXIA'),
          isDisabled: true,
          label: t('Unit'),
          value: networkSpecs.unit
        })
      })
    }), /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(Input, {
          className: "full",
          help: t('Prefix indicates the ss58 address format in this network, it is a number between 0 ~ 255 that describes the precise format of the bytes of the address'),
          isDisabled: true,
          label: t('Address Prefix'),
          value: networkSpecs.prefix.toString()
        })
      })
    }), /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(Input, {
          className: "full",
          help: t('Decimals decides the smallest unit of the token, which is 1/10^decimals'),
          isDisabled: true,
          label: t('Decimals'),
          value: networkSpecs.decimals.toString()
        })
      })
    }), /*#__PURE__*/_jsx("tr", {
      children: /*#__PURE__*/_jsx("td", {
        children: /*#__PURE__*/_jsx(Input, {
          className: "full",
          help: t('Chain type (ethereum compatible or regular substrate)'),
          isDisabled: true,
          label: t('Chain Type'),
          value: networkSpecs.chainType
        })
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(NetworkSpecs).withConfig({
  displayName: "NetworkSpecs",
  componentId: "sc-1xocvvo-0"
})(["td{padding:0;.input.ui--Input input{border:none !important;background:transparent;}}.settings--networkSpecs-name{position:relative;.settings--networkSpecs-logo{height:32px;left:12px;position:absolute;top:1rem;width:32px;}}.settings--networkSpecs-color{position:relative;> div:first-child{display:flex;.settings--networkSpecs-colorInput{min-width:124px;}.settings--networkSpecs-colorChangeButton{user-select:none;cursor:pointer;background:transparent;border:none;outline:none;align-self:flex-end;padding-bottom:0.9rem;}}.settings--networkSpecs-colorBar{border-radius:50%;border:1px solid grey;height:32px;left:12px;position:absolute;top:1rem;width:32px;}}.settings--networkSpecs-qr{margin:0.25rem auto;max-width:15rem;img{border:1px solid white;}}"]));