"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _detectBrowser = require("detect-browser");

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _useCounter = _interopRequireDefault(require("@axia-js/app-settings/useCounter"));

var _appsConfig = require("@axia-js/apps-config");

var _extensionDapp = require("@axia-js/extension-dapp");

var _hoc = require("@axia-js/react-api/hoc");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Banner = _interopRequireDefault(require("./Banner.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const browserInfo = (0, _detectBrowser.detect)();
const browserName = browserInfo && browserInfo.name || null;
const isSupported = browserName && Object.keys(_appsConfig.availableExtensions).includes(browserName);

function BannerExtension() {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    hasInjectedAccounts
  } = (0, _reactHooks.useApi)();
  const upgradableCount = (0, _useCounter.default)();
  const phishing = (0, _react.useRef)(t('Since some extensions, such as the axia-js extension, protects you against all community reported phishing sites, there are valid reasons to use them for additional protection, even if you are not storing accounts in it.'));

  if (!isSupported || !browserName) {
    return null;
  }

  if (_extensionDapp.isWeb3Injected) {
    if (hasInjectedAccounts) {
      if (!upgradableCount) {
        return null;
      }

      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Banner.default, {
        type: "warning",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: t('You have {{upgradableCount}} extensions that need to be updated with the latest chain properties in order to display the correct information for the chain you are connected to. This update includes chain metadata and chain properties.', {
            replace: {
              upgradableCount
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactI18next.Trans, {
            children: ["Visit your ", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
              href: "#/settings/metadata",
              children: "settings page"
            }), " to apply the updates to the injected extensions."]
          }, 'extensionUpgrade')
        })]
      });
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Banner.default, {
      type: "warning",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('One or more extensions are detected in your browser, however no accounts has been injected.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: t('Ensure that the extension has accounts, some accounts are visible globally and available for this chain and that you gave the application permission to access accounts from the extension to use them.')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: phishing.current
      })]
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Banner.default, {
    type: "warning",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: t('It is recommended that you create/store your accounts securely and externally from the app. On {{yourBrowser}} the following browser extensions are available for use -', {
        replace: {
          yourBrowser: (0, _util.stringUpperFirst)(browserName)
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      children: _appsConfig.availableExtensions[browserName].map(({
        desc,
        link,
        name
      }) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
          href: link,
          rel: "noopener noreferrer",
          target: "_blank",
          children: name
        }), " (", t(desc), ")"]
      }, name))
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      children: [t('Accounts injected from any of these extensions will appear in this application and be available for use. The above list is updated as more extensions with external signing capability become available.'), "\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
        href: "https://github.com/axia-js/extension",
        rel: "noopener noreferrer",
        target: "_blank",
        children: t('Learn more...')
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: phishing.current
    })]
  });
}

var _default = (0, _hoc.onlyOnWeb)( /*#__PURE__*/_react.default.memo(BannerExtension));

exports.default = _default;