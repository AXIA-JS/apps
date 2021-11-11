// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { InputNumber, Toggle } from '@axia-js/react-components';
import { BN_MILLION, BN_ONE, BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function InputMegaGas({
  className,
  estimatedWeight,
  help,
  isCall,
  weight: {
    executionTime,
    isValid,
    megaGas,
    percentage,
    setIsEmpty,
    setMegaGas
  }
}) {
  const {
    t
  } = useTranslation();
  const [withEstimate, setWithEstimate] = useState(true);
  const estimatedMg = useMemo(() => estimatedWeight ? estimatedWeight.div(BN_MILLION).iadd(BN_ONE) : null, [estimatedWeight]);
  useEffect(() => {
    withEstimate && estimatedMg && setMegaGas(estimatedMg);
  }, [estimatedMg, setMegaGas, withEstimate]);
  useEffect(() => {
    setIsEmpty(withEstimate && !!isCall);
  }, [isCall, setIsEmpty, withEstimate]);
  const isDisabled = !!estimatedMg && withEstimate;
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(InputNumber, {
      defaultValue: estimatedMg && isDisabled ? estimatedMg.toString() : undefined,
      help: help,
      isDisabled: isDisabled,
      isError: !isValid,
      isZeroable: isCall,
      label: estimatedMg && (isCall ? !withEstimate : true) ? t('max gas allowed (M, {{estimatedMg}} estimated)', {
        replace: {
          estimatedMg: estimatedMg.toString()
        }
      }) : t('max gas allowed (M)'),
      onChange: isDisabled ? undefined : setMegaGas,
      value: isDisabled ? undefined : isCall && withEstimate ? BN_ZERO : megaGas,
      children: (estimatedWeight || isCall) && /*#__PURE__*/_jsx(Toggle, {
        isOverlay: true,
        label: isCall ? t('max read gas') : t('use estimated gas'),
        onChange: setWithEstimate,
        value: withEstimate
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "contracts--InputMegaGas-meter",
      children: [t('{{executionTime}}s execution time', {
        replace: {
          executionTime: executionTime.toFixed(3)
        }
      }), ', ', t('{{percentage}}% of block weight', {
        replace: {
          percentage: percentage.toFixed(2)
        }
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(InputMegaGas).withConfig({
  displayName: "InputMegaGas",
  componentId: "sc-12jqzz7-0"
})([".contracts--InputMegaGas-meter{text-align:right;}"]));