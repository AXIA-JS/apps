"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _translate = _interopRequireDefault(require("./translate.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// NOTE: This is the only way to do an error boundary, via extend
class ErrorBoundary extends _react.default.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: null,
      prevTrigger: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  static getDerivedStateFromProps({
    trigger
  }, {
    prevTrigger
  }) {
    const newTrigger = JSON.stringify({
      trigger
    });
    return prevTrigger !== newTrigger ? {
      error: null,
      prevTrigger: newTrigger
    } : null;
  }

  componentDidCatch(error) {
    const {
      doThrow,
      onError
    } = this.props;
    onError && onError();

    if (doThrow) {
      throw error;
    }
  }

  render() {
    const {
      children,
      error: errorProps,
      t
    } = this.props;
    const {
      error
    } = this.state;
    const displayError = errorProps || error;
    return displayError ? /*#__PURE__*/(0, _jsxRuntime.jsx)("article", {
      className: "error extraMargin",
      children: t('Uncaught error. Something went wrong with the query and rendering of this component. {{message}}', {
        replace: {
          message: displayError.message
        }
      })
    }) : children;
  }

}

var _default = (0, _translate.default)(ErrorBoundary);

exports.default = _default;