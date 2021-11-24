// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import translate from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

// NOTE: This is the only way to do an error boundary, via extend
class ErrorBoundary extends React.Component {
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
    return displayError ? /*#__PURE__*/_jsx("article", {
      className: "error extraMargin",
      children: t('Uncaught error. Something went wrong with the query and rendering of this component. {{message}}', {
        replace: {
          message: displayError.message
        }
      })
    }) : children;
  }

}

export default translate(ErrorBoundary);