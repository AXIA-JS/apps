"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _util = require("@axia-js/react-components/util");

var _reactHooks = require("@axia-js/react-hooks");

var _util2 = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const WHITESPACE = [' ', '\t'];

function setData(data, setActive, setVal) {
  if (data.isRaw) {
    setActive && setActive(true);
    setVal((0, _util2.u8aToString)(data.asRaw.toU8a(true)));
  }
}

function WrapToggle({
  children,
  onChange,
  value
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "toggle-Wrap",
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Toggle, {
      isOverlay: true,
      label: t('include field'),
      onChange: onChange,
      value: value
    })]
  });
}

function checkValue(hasValue, value, minLength, includes, excludes, starting, notStarting = WHITESPACE, notEnding = WHITESPACE) {
  return !hasValue || !!value && value.length >= minLength && includes.reduce((hasIncludes, check) => hasIncludes && value.includes(check), true) && (!starting.length || starting.some(check => value.startsWith(check))) && !excludes.some(check => value.includes(check)) && !notStarting.some(check => value.startsWith(check)) && !notEnding.some(check => value.endsWith(check));
}

function IdentityMain({
  address,
  className = '',
  onClose
}) {
  var _api$consts$identity;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const identityOpt = (0, _reactHooks.useCall)(api.query.identity.identityOf, [address]);
  const [{
    info,
    okAll,
    okDisplay,
    okEmail,
    okLegal,
    okRiot,
    okTwitter,
    okWeb
  }, setInfo] = (0, _react.useState)({
    info: {},
    okAll: false
  });
  const [hasEmail, setHasEmail] = (0, _react.useState)(false);
  const [hasLegal, setHasLegal] = (0, _react.useState)(false);
  const [hasRiot, setHasRiot] = (0, _react.useState)(false);
  const [hasTwitter, setHasTwitter] = (0, _react.useState)(false);
  const [hasWeb, setHasWeb] = (0, _react.useState)(false);
  const [valDisplay, setValDisplay] = (0, _react.useState)(() => ((0, _util.getAddressMeta)(address).name || '').replace(/\(.*\)/, '').trim());
  const [valEmail, setValEmail] = (0, _react.useState)('');
  const [valLegal, setValLegal] = (0, _react.useState)('');
  const [valRiot, setValRiot] = (0, _react.useState)('');
  const [valTwitter, setValTwitter] = (0, _react.useState)('');
  const [valWeb, setValWeb] = (0, _react.useState)('');
  const [gotPreviousIdentity, setGotPreviousIdentity] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (identityOpt && identityOpt.isSome) {
      const {
        info
      } = identityOpt.unwrap();
      setData(info.display, null, setValDisplay);
      setData(info.email, setHasEmail, setValEmail);
      setData(info.legal, setHasLegal, setValLegal);
      setData(info.riot, setHasRiot, setValRiot);
      setData(info.twitter, setHasTwitter, setValTwitter);
      setData(info.web, setHasWeb, setValWeb);
      [info.display, info.email, info.legal, info.riot, info.twitter, info.web].some(info => {
        if (info.isRaw) {
          setGotPreviousIdentity(true);
          return true;
        } else {
          return false;
        }
      });
    }
  }, [identityOpt]);
  (0, _react.useEffect)(() => {
    const okDisplay = checkValue(true, valDisplay, 1, [], [], []);
    const okEmail = checkValue(hasEmail, valEmail, 3, ['@'], WHITESPACE, []);
    const okLegal = checkValue(hasLegal, valLegal, 1, [], [], []);
    const okRiot = checkValue(hasRiot, valRiot, 6, [':'], WHITESPACE, ['@', '~']);
    const okTwitter = checkValue(hasTwitter, valTwitter, 3, [], WHITESPACE, ['@']);
    const okWeb = checkValue(hasWeb, valWeb, 8, ['.'], WHITESPACE, ['https://', 'http://']);
    setInfo({
      info: {
        display: {
          [okDisplay ? 'raw' : 'none']: valDisplay || null
        },
        email: {
          [okEmail && hasEmail ? 'raw' : 'none']: okEmail && hasEmail ? valEmail : null
        },
        legal: {
          [okLegal && hasLegal ? 'raw' : 'none']: okLegal && hasLegal ? valLegal : null
        },
        riot: {
          [okRiot && hasRiot ? 'raw' : 'none']: okRiot && hasRiot ? valRiot : null
        },
        twitter: {
          [okTwitter && hasTwitter ? 'raw' : 'none']: okTwitter && hasTwitter ? valTwitter : null
        },
        web: {
          [okWeb && hasWeb ? 'raw' : 'none']: okWeb && hasWeb ? valWeb : null
        }
      },
      okAll: okDisplay && okEmail && okLegal && okRiot && okTwitter && okWeb,
      okDisplay,
      okEmail,
      okLegal,
      okRiot,
      okTwitter,
      okWeb
    });
  }, [hasEmail, hasLegal, hasRiot, hasTwitter, hasWeb, valDisplay, valEmail, valLegal, valRiot, valTwitter, valWeb]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal, {
    className: className,
    header: t('Register identity'),
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
        autoFocus: true,
        help: t('The name that will be displayed in your accounts list.'),
        isError: !okDisplay,
        label: t('display name'),
        maxLength: 32,
        onChange: setValDisplay,
        placeholder: t('My On-Chain Name'),
        value: valDisplay
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(WrapToggle, {
        onChange: setHasLegal,
        value: hasLegal,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          help: t('The legal name for this identity.'),
          isDisabled: !hasLegal,
          isError: !okLegal,
          label: t('legal name'),
          maxLength: 32,
          onChange: setValLegal,
          placeholder: t('Full Legal Name'),
          value: hasLegal ? valLegal : '<none>'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(WrapToggle, {
        onChange: setHasEmail,
        value: hasEmail,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          help: t('The email address associated with this identity.'),
          isDisabled: !hasEmail,
          isError: !okEmail,
          label: t('email'),
          maxLength: 32,
          onChange: setValEmail,
          placeholder: t('somebody@example.com'),
          value: hasEmail ? valEmail : '<none>'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(WrapToggle, {
        onChange: setHasWeb,
        value: hasWeb,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          help: t('An URL that is linked to this identity.'),
          isDisabled: !hasWeb,
          isError: !okWeb,
          label: t('web'),
          maxLength: 32,
          onChange: setValWeb,
          placeholder: t('https://example.com'),
          value: hasWeb ? valWeb : '<none>'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(WrapToggle, {
        onChange: setHasTwitter,
        value: hasTwitter,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          help: t('The twitter name for this identity.'),
          isDisabled: !hasTwitter,
          isError: !okTwitter,
          label: t('twitter'),
          onChange: setValTwitter,
          placeholder: t('@YourTwitterName'),
          value: hasTwitter ? valTwitter : '<none>'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(WrapToggle, {
        onChange: setHasRiot,
        value: hasRiot,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Input, {
          help: t('a riot name linked to this identity'),
          isDisabled: !hasRiot,
          isError: !okRiot,
          label: t('riot name'),
          maxLength: 32,
          onChange: setValRiot,
          placeholder: t('@yourname:matrix.org'),
          value: hasRiot ? valRiot : '<none>'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputBalance, {
        defaultValue: (_api$consts$identity = api.consts.identity) === null || _api$consts$identity === void 0 ? void 0 : _api$consts$identity.basicDeposit,
        help: t('Total amount of fund that will be reserved. These funds are returned when the identity is cleared'),
        isDisabled: true,
        label: t('total deposit')
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Actions, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: address,
        icon: 'trash-alt',
        isDisabled: !gotPreviousIdentity,
        label: t('Clear Identity'),
        onStart: onClose,
        tx: api.tx.identity.clearIdentity
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: address,
        isDisabled: !okAll,
        label: t('Set Identity'),
        onStart: onClose,
        params: [info],
        tx: api.tx.identity.setIdentity
      })]
    })]
  });
}

var _default = (0, _styledComponents.default)(IdentityMain).withConfig({
  displayName: "IdentityMain",
  componentId: "sc-a2eni-0"
})([".toggle-Wrap{position:relative;}"]);

exports.default = _default;