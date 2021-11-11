// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { api } from '@axia-js/react-api';
import { ErrorBoundary } from '@axia-js/react-components';
import Holder from "./Holder.js";
import ParamComp from "./ParamComp.js";
import translate from "./translate.js";
import { createValue } from "./values.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { Holder };

class Params extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      params: null
    };

    this.onChangeParam = (index, newValue) => {
      const {
        isDisabled
      } = this.props;

      if (isDisabled) {
        return;
      }

      const {
        isValid = false,
        value
      } = newValue;
      this.setState(prevState => ({
        values: (prevState.values || []).map((prev, prevIndex) => prevIndex !== index ? prev : {
          isValid,
          value
        })
      }), this.triggerUpdate);
    };

    this.triggerUpdate = () => {
      const {
        isDisabled,
        onChange
      } = this.props;
      const {
        values
      } = this.state;

      if (isDisabled || !values) {
        return;
      }

      onChange && onChange(values);
    };

    this.onRenderError = () => {
      const {
        onError
      } = this.props;
      onError && onError();
    };
  }

  static getDerivedStateFromProps({
    isDisabled,
    params,
    registry = api.registry,
    values
  }, prevState) {
    const isSame = JSON.stringify(prevState.params) === JSON.stringify(params);

    if (isDisabled || isSame) {
      return null;
    }

    return {
      params,
      values: params.reduce((result, param, index) => [...result, values && values[index] ? values[index] : createValue(registry, param)], [])
    };
  } // Fire the initial onChange (we did update) when the component is loaded


  componentDidMount() {
    this.componentDidUpdate(null, {});
  } // This is needed in the case where the item changes, i.e. the values get
  // initialized and we need to alert the parent that we have new values


  componentDidUpdate(_, prevState) {
    const {
      isDisabled
    } = this.props;
    const {
      values
    } = this.state;

    if (!isDisabled && JSON.stringify(prevState.values) !== JSON.stringify(values)) {
      this.triggerUpdate();
    }
  }

  render() {
    const {
      children,
      className = '',
      isDisabled,
      onEnter,
      onEscape,
      overrides,
      params,
      registry = api.registry,
      withBorder = true
    } = this.props;
    const {
      values = this.props.values
    } = this.state;

    if (!values || !values.length) {
      return null;
    }

    return /*#__PURE__*/_jsx(Holder, {
      className: className,
      withBorder: withBorder,
      children: /*#__PURE__*/_jsx(ErrorBoundary, {
        onError: this.onRenderError,
        children: /*#__PURE__*/_jsxs("div", {
          className: "ui--Params-Content",
          children: [values && params.map(({
            name,
            type
          }, index) => /*#__PURE__*/_jsx(ParamComp, {
            defaultValue: values[index],
            index: index,
            isDisabled: isDisabled,
            name: name,
            onChange: this.onChangeParam,
            onEnter: onEnter,
            onEscape: onEscape,
            overrides: overrides,
            registry: registry,
            type: type
          }, `${name || ''}:${type.toString()}:${index}`)), children]
        })
      })
    });
  }

}

export default translate(Params);