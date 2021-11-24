"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _Call = _interopRequireDefault(require("./Call.cjs"));

var _Contract = _interopRequireDefault(require("./Contract.cjs"));

var _util2 = require("./util.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function filterContracts(api) {
  let keyringContracts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return keyringContracts.map(address => (0, _util2.getContractForAddress)(api, address.toString())).filter(contract => !!contract);
}

function ContractsTable(_ref) {
  let {
    contracts: keyringContracts
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const newBlock = (0, _reactHooks.useCall)(api.derive.chain.subscribeNewBlocks);
  const [{
    contractIndex,
    messageIndex,
    onCallResult
  }, setIndexes] = (0, _react.useState)({
    contractIndex: 0,
    messageIndex: 0
  });
  const [isCallOpen, setIsCallOpen] = (0, _react.useState)(false);
  const [contractLinks, setContractLinks] = (0, _react.useState)({});
  const headerRef = (0, _react.useRef)([[t('contracts'), 'start'], [undefined, undefined, 3], [t('status'), 'start'], []]);
  (0, _react.useEffect)(() => {
    if (newBlock) {
      const exts = newBlock.block.extrinsics.filter(_ref2 => {
        let {
          method
        } = _ref2;
        return api.tx.contracts.call.is(method);
      }).map(_ref3 => {
        let {
          args
        } = _ref3;
        const contractId = keyringContracts.find(a => args[0].eq(a));

        if (!contractId) {
          return null;
        }

        return {
          blockHash: newBlock.block.header.hash.toHex(),
          blockNumber: (0, _util.formatNumber)(newBlock.block.header.number),
          contractId
        };
      }).filter(value => !!value);
      exts.length && setContractLinks(links => {
        exts.forEach(value => {
          links[value.contractId] = [value].concat(links[value.contractId] || []).slice(0, 3);
        });
        return _objectSpread({}, links);
      });
    }
  }, [api, keyringContracts, newBlock]);
  const contracts = (0, _react.useMemo)(() => filterContracts(api, keyringContracts), [api, keyringContracts]);

  const _toggleCall = (0, _react.useCallback)(() => setIsCallOpen(isCallOpen => !isCallOpen), []);

  const _onCall = (0, _react.useCallback)((contractIndex, messageIndex, onCallResult) => {
    setIndexes({
      contractIndex,
      messageIndex,
      onCallResult
    });
    setIsCallOpen(true);
  }, []);

  const _setMessageIndex = (0, _react.useCallback)(messageIndex => setIndexes(state => _objectSpread(_objectSpread({}, state), {}, {
    messageIndex
  })), []);

  const contract = contracts[contractIndex] || null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Table, {
      empty: t('No contracts available'),
      header: headerRef.current,
      children: contracts.map((contract, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Contract.default, {
        contract: contract,
        index: index,
        links: contractLinks[contract.address.toString()],
        onCall: _onCall
      }, contract.address.toString()))
    }), isCallOpen && contract && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Call.default, {
      contract: contract,
      isOpen: isCallOpen,
      messageIndex: messageIndex,
      onCallResult: onCallResult,
      onChangeMessage: _setMessageIndex,
      onClose: _toggleCall
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(ContractsTable);

exports.default = _default;