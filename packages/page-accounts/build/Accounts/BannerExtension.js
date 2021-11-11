// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { detect } from 'detect-browser';
import React, { useRef } from 'react';
import { Trans } from 'react-i18next';
import useExtensionCounter from '@axia-js/app-settings/useCounter';
import { availableExtensions } from '@axia-js/apps-config';
import { isWeb3Injected } from '@axia-js/extension-dapp';
import { onlyOnWeb } from '@axia-js/react-api/hoc';
import { useApi } from '@axia-js/react-hooks';
import { stringUpperFirst } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Banner from "./Banner.js"; // it would have been really good to import this from detect, however... not exported

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const browserInfo = detect();
const browserName = browserInfo && browserInfo.name || null;
const isSupported = browserName && Object.keys(availableExtensions).includes(browserName);

function BannerExtension() {
  const {
    t
  } = useTranslation();
  const {
    hasInjectedAccounts
  } = useApi();
  const upgradableCount = useExtensionCounter();
  const phishing = useRef(t('Since some extensions, such as the axia-js extension, protects you against all community reported phishing sites, there are valid reasons to use them for additional protection, even if you are not storing accounts in it.'));

  if (!isSupported || !browserName) {
    return null;
  }

  if (isWeb3Injected) {
    if (hasInjectedAccounts) {
      if (!upgradableCount) {
        return null;
      }

      return /*#__PURE__*/_jsxs(Banner, {
        type: "warning",
        children: [/*#__PURE__*/_jsx("p", {
          children: t('You have {{upgradableCount}} extensions that need to be updated with the latest chain properties in order to display the correct information for the chain you are connected to. This update includes chain metadata and chain properties.', {
            replace: {
              upgradableCount
            }
          })
        }), /*#__PURE__*/_jsx("p", {
          children: /*#__PURE__*/_jsxs(Trans, {
            children: ["Visit your ", /*#__PURE__*/_jsx("a", {
              href: "#/settings/metadata",
              children: "settings page"
            }), " to apply the updates to the injected extensions."]
          }, 'extensionUpgrade')
        })]
      });
    }

    return /*#__PURE__*/_jsxs(Banner, {
      type: "warning",
      children: [/*#__PURE__*/_jsx("p", {
        children: t('One or more extensions are detected in your browser, however no accounts has been injected.')
      }), /*#__PURE__*/_jsx("p", {
        children: t('Ensure that the extension has accounts, some accounts are visible globally and available for this chain and that you gave the application permission to access accounts from the extension to use them.')
      }), /*#__PURE__*/_jsx("p", {
        children: phishing.current
      })]
    });
  }

  return /*#__PURE__*/_jsxs(Banner, {
    type: "warning",
    children: [/*#__PURE__*/_jsx("p", {
      children: t('It is recommended that you create/store your accounts securely and externally from the app. On {{yourBrowser}} the following browser extensions are available for use -', {
        replace: {
          yourBrowser: stringUpperFirst(browserName)
        }
      })
    }), /*#__PURE__*/_jsx("ul", {
      children: availableExtensions[browserName].map(({
        desc,
        link,
        name
      }) => /*#__PURE__*/_jsxs("li", {
        children: [/*#__PURE__*/_jsx("a", {
          href: link,
          rel: "noopener noreferrer",
          target: "_blank",
          children: name
        }), " (", t(desc), ")"]
      }, name))
    }), /*#__PURE__*/_jsxs("p", {
      children: [t('Accounts injected from any of these extensions will appear in this application and be available for use. The above list is updated as more extensions with external signing capability become available.'), "\xA0", /*#__PURE__*/_jsx("a", {
        href: "https://github.com/axia-js/extension",
        rel: "noopener noreferrer",
        target: "_blank",
        children: t('Learn more...')
      })]
    }), /*#__PURE__*/_jsx("p", {
      children: phishing.current
    })]
  });
}

export default onlyOnWeb( /*#__PURE__*/React.memo(BannerExtension));