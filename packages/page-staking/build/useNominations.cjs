"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNominations;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function extractNominators(nominations) {
  return nominations.reduce((mapped, [key, optNoms]) => {
    if (optNoms.isSome && key.args.length) {
      const nominatorId = key.args[0].toString();
      const {
        submittedIn,
        targets
      } = optNoms.unwrap();
      targets.forEach((_validatorId, index) => {
        const validatorId = _validatorId.toString();

        const info = {
          index: index + 1,
          nominatorId,
          submittedIn
        };

        if (!mapped[validatorId]) {
          mapped[validatorId] = [info];
        } else {
          mapped[validatorId].push(info);
        }
      });
    }

    return mapped;
  }, {});
}

function useNominations(isActive = true) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const nominators = (0, _reactHooks.useCall)(isActive && api.query.staking.nominators.entries);
  return (0, _react.useMemo)(() => nominators && extractNominators(nominators), [nominators]);
}