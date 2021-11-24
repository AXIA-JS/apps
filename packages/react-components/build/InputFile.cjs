"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("@axia-js/util");

var _Labelled = _interopRequireDefault(require("./Labelled.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const BYTE_STR_0 = '0'.charCodeAt(0);
const BYTE_STR_X = 'x'.charCodeAt(0);
const STR_NL = '\n';

const NOOP = () => undefined;

function convertResult(result) {
  const data = new Uint8Array(result); // this converts the input (if detected as hex), via the hex conversion route

  if (data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
    let hex = (0, _util.u8aToString)(data);

    while (hex[hex.length - 1] === STR_NL) {
      hex = hex.substr(0, hex.length - 1);
    }

    if ((0, _util.isHex)(hex)) {
      return (0, _util.hexToU8a)(hex);
    }
  }

  return data;
}

function InputFile(_ref) {
  let {
    accept,
    className = '',
    clearContent,
    help,
    isDisabled,
    isError = false,
    isFull,
    label,
    onChange,
    placeholder,
    withEllipsis,
    withLabel
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const dropRef = /*#__PURE__*/(0, _react.createRef)();
  const [file, setFile] = (0, _react.useState)();

  const _onDrop = (0, _react.useCallback)(files => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onabort = NOOP;
      reader.onerror = NOOP;

      reader.onload = _ref2 => {
        let {
          target
        } = _ref2;

        if (target && target.result) {
          const name = file.name;
          const data = convertResult(target.result);
          onChange && onChange(data, name);
          dropRef && setFile({
            name,
            size: data.length
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }, [dropRef, onChange]);

  const dropZone = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactDropzone.default, {
    accept: accept,
    disabled: isDisabled,
    multiple: false,
    onDrop: _onDrop,
    ref: dropRef,
    children: _ref3 => {
      let {
        getInputProps,
        getRootProps
      } = _ref3;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", _objectSpread(_objectSpread({}, getRootProps({
        className: `ui--InputFile${isError ? ' error' : ''} ${className}`
      })), {}, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", _objectSpread({}, getInputProps())), /*#__PURE__*/(0, _jsxRuntime.jsx)("em", {
          className: "label",
          children: !file || clearContent ? placeholder || t('click to select or drag and drop the file here') : placeholder || t('{{name}} ({{size}} bytes)', {
            replace: {
              name: file.name,
              size: (0, _util.formatNumber)(file.size)
            }
          })
        })]
      }));
    }
  });
  return label ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Labelled.default, {
    help: help,
    isFull: isFull,
    label: label,
    withEllipsis: withEllipsis,
    withLabel: withLabel,
    children: dropZone
  }) : dropZone;
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(InputFile).withConfig({
  displayName: "InputFile",
  componentId: "sc-fgda15-0"
})(["background:var(--bg-input);border:1px solid var(--border-input);border-radius:0.28571429rem;font-size:1rem;margin:0.25rem 0;padding:0.67857143em 1em;width:100% !important;&.error{background:var(--bg-input-error);border-color:#e0b4b4;}&:hover{cursor:pointer;}"]));

exports.default = _default;