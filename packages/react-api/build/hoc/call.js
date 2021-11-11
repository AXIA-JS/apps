import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
// SInce this file is deemed deprecated (and awaiting removal), we just don't care

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { assert, isNull, isUndefined } from '@axia-js/util';
import echoTransform from "../transform/echo.js";
import { isEqual, triggerChange } from "../util/index.js";
import withApi from "./api.js"; // FIXME This is not correct, we need some junction of derive, query & consts

import { jsx as _jsx } from "react/jsx-runtime";

const NOOP = () => {// ignore
};

const NO_SKIP = () => false; // a mapping of actual error messages that has already been shown


const errorred = {};
export default function withCall(endpoint, {
  at,
  atProp,
  callOnResult,
  fallbacks,
  isMulti = false,
  params = [],
  paramName,
  paramPick,
  paramValid = false,
  propName,
  skipIf = NO_SKIP,
  transform = echoTransform,
  withIndicator = false
} = {}) {
  return Inner => {
    class WithPromise extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          callResult: undefined,
          callUpdated: false,
          callUpdatedAt: 0
        };
        this.destroy = void 0;
        this.isActive = false;
        this.propName = void 0;
        this.timerId = -1;

        this.constructApiSection = endpoint => {
          const {
            api
          } = this.props;
          const [area, section, method, ...others] = endpoint.split('.');
          assert(area.length && section.length && method.length && others.length === 0, `Invalid API format, expected <area>.<section>.<method>, found ${endpoint}`);
          assert(['consts', 'rpc', 'query', 'derive'].includes(area), `Unknown api.${area}, expected consts, rpc, query or derive`);
          assert(!at || area === 'query', 'Only able to do an \'at\' query on the api.query interface');
          const apiSection = api[area][section];
          return [apiSection, area, section, method];
        };

        const [, _section, _method] = endpoint.split('.');
        this.propName = `${_section}_${_method}`;
      }

      componentDidUpdate(prevProps) {
        const oldParams = this.getParams(prevProps);
        const newParams = this.getParams(this.props);

        if (this.isActive && !isEqual(newParams, oldParams)) {
          this.subscribe(newParams).then(NOOP).catch(NOOP);
        }
      }

      componentDidMount() {
        this.isActive = true;

        if (withIndicator) {
          this.timerId = window.setInterval(() => {
            const elapsed = Date.now() - (this.state.callUpdatedAt || 0);
            const callUpdated = elapsed <= 1500;

            if (callUpdated !== this.state.callUpdated) {
              this.nextState({
                callUpdated
              });
            }
          }, 500);
        } // The attachment takes time when a lot is available, set a timeout
        // to first handle the current queue before subscribing


        setTimeout(() => {
          this.subscribe(this.getParams(this.props)).then(NOOP).catch(NOOP);
        }, 0);
      }

      componentWillUnmount() {
        this.isActive = false;
        this.unsubscribe().then(NOOP).catch(NOOP);

        if (this.timerId !== -1) {
          clearInterval(this.timerId);
        }
      }

      nextState(state) {
        if (this.isActive) {
          this.setState(state);
        }
      }

      getParams(props) {
        const paramValue = paramPick ? paramPick(props) : paramName ? props[paramName] : undefined;

        if (atProp) {
          at = props[atProp];
        } // When we are specifying a param and have an invalid, don't use it. For 'params',
        // we default to the original types, i.e. no validation (query app uses this)


        if (!paramValid && paramName && (isUndefined(paramValue) || isNull(paramValue))) {
          return [false, []];
        }

        const values = isUndefined(paramValue) ? params : params.concat(Array.isArray(paramValue) && !paramValue.toU8a ? paramValue : [paramValue]);
        return [true, values];
      }

      getApiMethod(newParams) {
        if (endpoint === 'subscribe') {
          const [fn, ...params] = newParams;
          return [fn, params, 'subscribe'];
        }

        const endpoints = [endpoint].concat(fallbacks || []);
        const expanded = endpoints.map(this.constructApiSection);
        const [apiSection, area, section, method] = expanded.find(([apiSection]) => !!apiSection) || [{}, expanded[0][1], expanded[0][2], expanded[0][3]];
        assert(apiSection && apiSection[method], `Unable to find api.${area}.${section}.${method}`);
        const meta = apiSection[method].meta;

        if (area === 'query' && meta !== null && meta !== void 0 && meta.type.isMap) {
          const arg = newParams[0];
          assert(!isUndefined(arg) && !isNull(arg) || meta.type.asMap.kind.isLinkedMap, `${meta.name} expects one argument`);
        }

        return [apiSection[method], newParams, method.startsWith('subscribe') ? 'subscribe' : area];
      }

      async subscribe([isValid, newParams]) {
        if (!isValid || skipIf(this.props)) {
          return;
        }

        const {
          api
        } = this.props;
        let info;
        await api.isReady;

        try {
          assert(at || !atProp, 'Unable to perform query on non-existent at hash');
          info = this.getApiMethod(newParams);
        } catch (error) {
          // don't flood the console with the same errors each time, just do it once, then
          // ignore it going forward
          if (!errorred[error.message]) {
            console.warn(endpoint, '::', error);
            errorred[error.message] = true;
          }
        }

        if (!info) {
          return;
        }

        const [apiMethod, params, area] = info;

        const updateCb = value => this.triggerUpdate(this.props, value);

        await this.unsubscribe();

        try {
          if (['derive', 'subscribe'].includes(area) || area === 'query' && !at && !atProp) {
            this.destroy = isMulti ? await apiMethod.multi(params, updateCb) : await apiMethod(...params, updateCb);
          } else if (area === 'consts') {
            updateCb(apiMethod);
          } else {
            updateCb(at ? await apiMethod.at(at, ...params) : await apiMethod(...params));
          }
        } catch (error) {// console.warn(endpoint, '::', error);
        }
      } // eslint-disable-next-line @typescript-eslint/require-await


      async unsubscribe() {
        if (this.destroy) {
          this.destroy();
          this.destroy = undefined;
        }
      }

      triggerUpdate(props, value) {
        try {
          const callResult = (props.transform || transform)(value);

          if (!this.isActive || isEqual(callResult, this.state.callResult)) {
            return;
          }

          triggerChange(callResult, callOnResult, props.callOnResult);
          this.nextState({
            callResult,
            callUpdated: true,
            callUpdatedAt: Date.now()
          });
        } catch (error) {// console.warn(endpoint, '::', (error as Error).message);
        }
      }

      render() {
        const {
          callResult,
          callUpdated,
          callUpdatedAt
        } = this.state;

        const _props = _objectSpread(_objectSpread({}, this.props), {}, {
          callUpdated,
          callUpdatedAt
        });

        if (!isUndefined(callResult)) {
          _props[propName || this.propName] = callResult;
        }

        return /*#__PURE__*/_jsx(Inner, _objectSpread({}, _props));
      }

    }

    return withApi(WithPromise);
  };
}