import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Input, Table } from '@axia-js/react-components';
import { useApi, useIsMountedRef } from '@axia-js/react-hooks';
import { settings } from '@axia-js/ui-settings';
import generator from '@axia-js/vanitygen/generator';
import matchRegex from '@axia-js/vanitygen/regex';
import generatorSort from '@axia-js/vanitygen/sort';
import CreateModal from "../modals/Create.js";
import { useTranslation } from "../translate.js";
import Match from "./Match.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_MATCH = 'Some';
const BOOL_OPTIONS = [{
  text: 'No',
  value: false
}, {
  text: 'Yes',
  value: true
}];

function VanityApp({
  className = '',
  onStatusChange
}) {
  const {
    t
  } = useTranslation();
  const {
    api,
    isEthereum
  } = useApi();
  const results = useRef([]);
  const runningRef = useRef(false);
  const mountedRef = useIsMountedRef();
  const [createSeed, setCreateSeed] = useState(null);
  const [{
    elapsed,
    isRunning,
    keyCount,
    matches
  }, setResults] = useState({
    elapsed: 0,
    isRunning: false,
    keyCount: -1,
    keyTime: 0,
    matches: [],
    startAt: 0
  });
  const [{
    isMatchValid,
    match
  }, setMatch] = useState({
    isMatchValid: true,
    match: DEFAULT_MATCH
  });
  const [type, setType] = useState('ed25519');
  const [withCase, setWithCase] = useState(true);

  const _clearSeed = useCallback(() => setCreateSeed(null), []);

  const _checkMatches = useCallback(() => {
    const checks = results.current;
    results.current = [];

    if (checks.length === 0 || !mountedRef.current) {
      return;
    }

    setResults(({
      isRunning,
      keyCount,
      keyTime,
      matches,
      startAt
    }) => {
      let newKeyCount = keyCount;
      let newKeyTime = keyTime;
      const newMatches = checks.reduce((result, {
        elapsed,
        found
      }) => {
        newKeyCount += found.length;
        newKeyTime += elapsed;
        return result.concat(found);
      }, matches);
      return {
        elapsed: Date.now() - startAt,
        isRunning,
        keyCount: newKeyCount,
        keyTime: newKeyTime,
        matches: newMatches.sort(generatorSort).slice(0, 25),
        startAt
      };
    });
  }, [mountedRef]);

  const _executeGeneration = useCallback(() => {
    if (!runningRef.current) {
      return _checkMatches();
    }

    setTimeout(() => {
      if (mountedRef.current) {
        if (results.current.length === 25) {
          _checkMatches();
        }

        results.current.push(generator({
          match,
          runs: 10,
          ss58Format: api.registry.chainSS58 || 0,
          type,
          withCase,
          withHex: true
        }));

        _executeGeneration();
      }
    }, 0);
  }, [_checkMatches, api, match, mountedRef, runningRef, type, withCase]);

  const _onChangeMatch = useCallback(match => setMatch({
    isMatchValid: matchRegex.test(match) && match.length !== 0 && match.length < 31,
    match
  }), []);

  const _onRemove = useCallback(address => setResults(results => _objectSpread(_objectSpread({}, results), {}, {
    matches: results.matches.filter(item => item.address !== address)
  })), []);

  const _toggleStart = useCallback(() => setResults(({
    elapsed,
    isRunning,
    keyCount,
    keyTime,
    matches,
    startAt
  }) => ({
    elapsed,
    isRunning: !isRunning,
    keyCount: isRunning ? keyCount : 0,
    keyTime: isRunning ? keyTime : 0,
    matches,
    startAt: isRunning ? startAt : Date.now()
  })), []);

  useEffect(() => {
    runningRef.current = isRunning;

    if (isRunning) {
      _executeGeneration();
    }
  }, [_executeGeneration, isRunning]);
  const header = useMemo(() => [[t('matches'), 'start', 2], [t('Evaluated {{count}} keys in {{elapsed}}s ({{avg}} keys/s)', {
    replace: {
      avg: (keyCount / (elapsed / 1000)).toFixed(3),
      count: keyCount,
      elapsed: (elapsed / 1000).toFixed(2)
    }
  }), 'start'], [t('secret'), 'start'], []], [elapsed, keyCount, t]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "ui--row",
      children: [/*#__PURE__*/_jsx(Input, {
        autoFocus: true,
        className: "medium",
        help: t('Type here what you would like your address to contain. This tool will generate the keys and show the associated addresses that best match your search. '),
        isDisabled: isRunning,
        isError: !isMatchValid,
        label: t('Search for'),
        onChange: _onChangeMatch,
        onEnter: _toggleStart,
        value: match
      }), /*#__PURE__*/_jsx(Dropdown, {
        className: "medium",
        help: t('Should the search be case sensitive, e.g if you select "no" your search for "Some" may return addresses containing "somE" or "sOme"...'),
        isDisabled: isRunning,
        label: t('case sensitive'),
        onChange: setWithCase,
        options: BOOL_OPTIONS,
        value: withCase
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "ui--row",
      children: /*#__PURE__*/_jsx(Dropdown, {
        className: "medium",
        defaultValue: type,
        help: t('Determines what cryptography will be used to create this account. Note that to validate on AXIA, the session account must use "ed25519".'),
        label: t('keypair crypto type'),
        onChange: setType,
        options: isEthereum ? settings.availableCryptosEth : settings.availableCryptos
      })
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: isRunning ? 'stop' : 'sign-in-alt',
        isDisabled: !isMatchValid,
        label: isRunning ? t('Stop generation') : t('Start generation'),
        onClick: _toggleStart
      })
    }), matches.length !== 0 && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("article", {
        className: "warning centered",
        children: t('Ensure that you utilized the "Save" functionality before using a generated address to receive funds. Without saving the address any funds and the associated seed any funds sent to it will be lost.')
      }), /*#__PURE__*/_jsx(Table, {
        className: "vanity--App-matches",
        empty: t('No matches found'),
        header: header,
        children: matches.map(match => /*#__PURE__*/_createElement(Match, _objectSpread(_objectSpread({}, match), {}, {
          key: match.address,
          onCreateToggle: setCreateSeed,
          onRemove: _onRemove
        })))
      })]
    }), createSeed && /*#__PURE__*/_jsx(CreateModal, {
      onClose: _clearSeed,
      onStatusChange: onStatusChange,
      seed: createSeed,
      type: type
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(VanityApp).withConfig({
  displayName: "Vanity",
  componentId: "sc-1p8qscb-0"
})([".vanity--App-matches{overflow-x:auto;padding:1em 0;}.vanity--App-stats{padding:1em 0 0 0;opacity:0.45;text-align:center;}"]));