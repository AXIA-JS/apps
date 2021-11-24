"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Holder", {
  enumerable: true,
  get: function () {
    return _Holder.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactApi = require("@axia-js/react-api");

var _reactComponents = require("@axia-js/react-components");

var _Holder = _interopRequireDefault(require("./Holder.cjs"));

var _ParamComp = _interopRequireDefault(require("./ParamComp.cjs"));

var _translate = _interopRequireDefault(require("./translate.cjs"));

var _values = require("./values.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
class Params extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
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

  static getDerivedStateFromProps(_ref, prevState) {
    let {
      isDisabled,
      params,
      registry = _reactApi.api.registry,
      values
    } = _ref;
    const isSame = JSON.stringify(prevState.params) === JSON.stringify(params);

    if (isDisabled || isSame) {
      return null;
    }

    return {
      params,
      values: params.reduce((result, param, index) => [...result, values && values[index] ? values[index] : (0, _values.createValue)(registry, param)], [])
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
      registry = _reactApi.api.registry,
      withBorder = true
    } = this.props;
    const {
      values = this.props.values
    } = this.state;

    if (!values || !values.length) {
      return null;
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Holder.default, {
      className: className,
      withBorder: withBorder,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.ErrorBoundary, {
        onError: this.onRenderError,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "ui--Params-Content",
          children: [values && params.map((_ref2, index) => {
            let {
              name,
              type
            } = _ref2;
            return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ParamComp.default, {
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
            }, `${name || ''}:${type.toString()}:${index}`);
          }), children]
        })
      })
    });
  }

}

var _default = (0, _translate.default)(Params);

exports.default = _default;