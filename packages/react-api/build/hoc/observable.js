import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
// TODO: Lots of duplicated code between this and withObservable, surely there is a better way of doing this?
import React from 'react';
import { catchError, map, of } from 'rxjs';
import echoTransform from "../transform/echo.js";
import { intervalObservable, isEqual, triggerChange } from "../util/index.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function withObservable(observable, {
  callOnResult,
  propName = 'value',
  transform = echoTransform
} = {}) {
  return (Inner, defaultProps = {}, render) => {
    class WithObservable extends React.Component {
      constructor(...args) {
        super(...args);
        this.isActive = true;
        this.state = {
          callResult: undefined,
          callUpdated: false,
          callUpdatedAt: 0,
          subscriptions: []
        };

        this.triggerUpdate = (props, callResult) => {
          try {
            if (!this.isActive || isEqual(callResult, this.state.callResult)) {
              return;
            }

            triggerChange(callResult, callOnResult, props.callOnResult || defaultProps.callOnResult);
            this.setState({
              callResult,
              callUpdated: true,
              callUpdatedAt: Date.now()
            });
          } catch (error) {
            console.error(this.props, error);
          }
        };
      }

      componentDidMount() {
        this.setState({
          subscriptions: [observable.pipe(map(transform), catchError(() => of(undefined))).subscribe(value => this.triggerUpdate(this.props, value)), intervalObservable(this)]
        });
      }

      componentWillUnmount() {
        this.isActive = false;
        this.state.subscriptions.forEach(subscription => subscription.unsubscribe());
      }

      render() {
        const {
          children
        } = this.props; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

        const {
          callResult,
          callUpdated,
          callUpdatedAt
        } = this.state;

        const _props = _objectSpread(_objectSpread(_objectSpread({}, defaultProps), this.props), {}, {
          callUpdated,
          callUpdatedAt,
          [propName]: callResult
        });

        return /*#__PURE__*/_jsxs(Inner, _objectSpread(_objectSpread({}, _props), {}, {
          children: [render && render(callResult), children]
        }));
      }

    }

    return WithObservable;
  };
}