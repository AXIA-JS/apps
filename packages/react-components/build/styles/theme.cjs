"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.colorLink = exports.colorBtnText = exports.colorBtnPrimary = exports.colorBtnHighlight = exports.colorBtnShadow = exports.colorBtnDefault = void 0;
// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* default buttons, dark gray */
const colorBtnDefault = '#767778';
exports.colorBtnDefault = colorBtnDefault;
const colorBtnShadow = '#98999a';
/* highlighted buttons, orange */

exports.colorBtnShadow = colorBtnShadow;
const colorBtnHighlight = '#f19135';
/* primary buttons, blue */

exports.colorBtnHighlight = colorBtnHighlight;
const colorBtnPrimary = colorBtnDefault; // '#2e86ab';

/* button text color */

exports.colorBtnPrimary = colorBtnPrimary;
const colorBtnText = '#f9f8f7';
exports.colorBtnText = colorBtnText;
const colorLink = '#2e86ab';
exports.colorLink = colorLink;
var _default = `
  .theme--dark,
  .theme--light {
    a:not(.ui--Tab) {
      color: ${colorLink};

      &:hover,
      a:visited {
        color: ${colorLink};
      }
    }

    .ui--Button {
      &.isIcon:not(.isDisabled):not(.withoutLink):not(:hover) {
        .ui--Icon {
          color: ${colorLink};
        }
      }
    }

    .ui.modal > .header:not(.ui) {
      border-bottom-color: ${colorBtnDefault};
    }

    .ui.negative.button,
    .ui.buttons .negative.button {
      background: #666 !important;
    }
  }
`;
exports.default = _default;