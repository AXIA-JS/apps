// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { extensionLogos } from '@axia-js/apps-config';
import { Button, Dropdown, Spinner, Table } from '@axia-js/react-components';
import { useToggle } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import useExtensions from "../useExtensions.js";
import iconOption from "./iconOption.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Extensions({
  chainInfo,
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    extensions
  } = useExtensions();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isBusy, toggleBusy] = useToggle();
  const options = useMemo(() => (extensions || []).map(({
    extension: {
      name,
      version
    }
  }, value) => iconOption(`${name} ${version}`, value, extensionLogos[name])), [extensions]);

  const _updateMeta = useCallback(() => {
    if (chainInfo && extensions !== null && extensions !== void 0 && extensions[selectedIndex]) {
      toggleBusy();
      extensions[selectedIndex].update(chainInfo).catch(() => false).then(() => toggleBusy()).catch(console.error);
    }
  }, [chainInfo, extensions, selectedIndex, toggleBusy]);

  const headerRef = useRef([[t('Extensions'), 'start']]);
  return /*#__PURE__*/_jsx(Table, {
    className: className,
    empty: t('No Upgradable extensions'),
    header: headerRef.current,
    children: extensions ? options.length !== 0 && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("tr", {
        className: "noBorder",
        children: /*#__PURE__*/_jsx("td", {
          children: /*#__PURE__*/_jsx(Dropdown, {
            label: t('upgradable extensions'),
            onChange: setSelectedIndex,
            options: options,
            value: selectedIndex
          })
        })
      }), /*#__PURE__*/_jsx("tr", {
        className: "hasOddRowColoring",
        children: /*#__PURE__*/_jsx("td", {
          children: /*#__PURE__*/_jsx(Button.Group, {
            children: /*#__PURE__*/_jsx(Button, {
              icon: "upload",
              isDisabled: isBusy,
              label: t('Update metadata'),
              onClick: _updateMeta
            })
          })
        })
      })]
    }) : /*#__PURE__*/_jsx(Spinner, {})
  });
}

export default /*#__PURE__*/React.memo(Extensions);