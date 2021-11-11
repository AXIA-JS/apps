"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useWeight;

var _react = require("react");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
function useWeight() {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const [blockTime] = (0, _reactHooks.useBlockTime)();
  const [megaGas, _setMegaGas] = (0, _react.useState)((api.consts.system.blockWeights ? api.consts.system.blockWeights.maxBlock : api.consts.system.maximumBlockWeight).div(_util.BN_MILLION).div(_util.BN_TEN));
  const [isEmpty, setIsEmpty] = (0, _react.useState)(false);
  const setMegaGas = (0, _react.useCallback)(value => _setMegaGas(value || (api.consts.system.blockWeights ? api.consts.system.blockWeights.maxBlock : api.consts.system.maximumBlockWeight).div(_util.BN_MILLION).div(_util.BN_TEN)), [api]);
  return (0, _react.useMemo)(() => {
    let executionTime = 0;
    let percentage = 0;
    let weight = _util.BN_ZERO;
    let isValid = false;

    if (megaGas) {
      weight = megaGas.mul(_util.BN_MILLION);
      executionTime = weight.muln(blockTime).div(api.consts.system.blockWeights ? api.consts.system.blockWeights.maxBlock : api.consts.system.maximumBlockWeight).toNumber();
      percentage = executionTime / blockTime * 100; // execution is 2s of 6s blocks, i.e. 1/3

      executionTime = executionTime / 3000;
      isValid = !megaGas.isZero() && percentage < 65;
    }

    return {
      executionTime,
      isEmpty,
      isValid: isEmpty || isValid,
      megaGas: megaGas || _util.BN_ZERO,
      percentage,
      setIsEmpty,
      setMegaGas,
      weight
    };
  }, [api, blockTime, isEmpty, megaGas, setIsEmpty, setMegaGas]);
}