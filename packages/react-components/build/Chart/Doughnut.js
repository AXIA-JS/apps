// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { bnToBn } from '@axia-js/util';
import Base from "./Base.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ChartDoughnut({
  className = '',
  size = 100,
  values
}) {
  const options = {
    colorHover: [],
    colorNormal: [],
    data: [],
    labels: []
  };
  values.forEach(({
    colors: [normalColor = '#00f', hoverColor],
    label,
    value
  }) => {
    options.colorNormal.push(normalColor);
    options.colorHover.push(hoverColor || normalColor);
    options.data.push(bnToBn(value).toNumber());
    options.labels.push(label);
  });
  return /*#__PURE__*/_jsx(Base, {
    className: className,
    children: /*#__PURE__*/_jsx(Doughnut, {
      data: {
        datasets: [{
          backgroundColor: options.colorNormal,
          data: options.data,
          hoverBackgroundColor: options.colorHover
        }],
        labels: options.labels
      },
      height: size,
      width: size
    })
  });
}

export default /*#__PURE__*/React.memo(ChartDoughnut);