// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, InputBalance, Modal, Toggle, TxButton } from '@axia-js/react-components';
import { getAddressMeta } from '@axia-js/react-components/util';
import { useApi, useCall } from '@axia-js/react-hooks';
import { u8aToString } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const WHITESPACE = [' ', '\t'];

function setData(data, setActive, setVal) {
  if (data.isRaw) {
    setActive && setActive(true);
    setVal(u8aToString(data.asRaw.toU8a(true)));
  }
}

function WrapToggle({
  children,
  onChange,
  value
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("div", {
    className: "toggle-Wrap",
    children: [children, /*#__PURE__*/_jsx(Toggle, {
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
  } = useTranslation();
  const {
    api
  } = useApi();
  const identityOpt = useCall(api.query.identity.identityOf, [address]);
  const [{
    info,
    okAll,
    okDisplay,
    okEmail,
    okLegal,
    okRiot,
    okTwitter,
    okWeb
  }, setInfo] = useState({
    info: {},
    okAll: false
  });
  const [hasEmail, setHasEmail] = useState(false);
  const [hasLegal, setHasLegal] = useState(false);
  const [hasRiot, setHasRiot] = useState(false);
  const [hasTwitter, setHasTwitter] = useState(false);
  const [hasWeb, setHasWeb] = useState(false);
  const [valDisplay, setValDisplay] = useState(() => (getAddressMeta(address).name || '').replace(/\(.*\)/, '').trim());
  const [valEmail, setValEmail] = useState('');
  const [valLegal, setValLegal] = useState('');
  const [valRiot, setValRiot] = useState('');
  const [valTwitter, setValTwitter] = useState('');
  const [valWeb, setValWeb] = useState('');
  const [gotPreviousIdentity, setGotPreviousIdentity] = useState(false);
  useEffect(() => {
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
  useEffect(() => {
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
  return /*#__PURE__*/_jsxs(Modal, {
    className: className,
    header: t('Register identity'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Input, {
        autoFocus: true,
        help: t('The name that will be displayed in your accounts list.'),
        isError: !okDisplay,
        label: t('display name'),
        maxLength: 32,
        onChange: setValDisplay,
        placeholder: t('My On-Chain Name'),
        value: valDisplay
      }), /*#__PURE__*/_jsx(WrapToggle, {
        onChange: setHasLegal,
        value: hasLegal,
        children: /*#__PURE__*/_jsx(Input, {
          help: t('The legal name for this identity.'),
          isDisabled: !hasLegal,
          isError: !okLegal,
          label: t('legal name'),
          maxLength: 32,
          onChange: setValLegal,
          placeholder: t('Full Legal Name'),
          value: hasLegal ? valLegal : '<none>'
        })
      }), /*#__PURE__*/_jsx(WrapToggle, {
        onChange: setHasEmail,
        value: hasEmail,
        children: /*#__PURE__*/_jsx(Input, {
          help: t('The email address associated with this identity.'),
          isDisabled: !hasEmail,
          isError: !okEmail,
          label: t('email'),
          maxLength: 32,
          onChange: setValEmail,
          placeholder: t('somebody@example.com'),
          value: hasEmail ? valEmail : '<none>'
        })
      }), /*#__PURE__*/_jsx(WrapToggle, {
        onChange: setHasWeb,
        value: hasWeb,
        children: /*#__PURE__*/_jsx(Input, {
          help: t('An URL that is linked to this identity.'),
          isDisabled: !hasWeb,
          isError: !okWeb,
          label: t('web'),
          maxLength: 32,
          onChange: setValWeb,
          placeholder: t('https://example.com'),
          value: hasWeb ? valWeb : '<none>'
        })
      }), /*#__PURE__*/_jsx(WrapToggle, {
        onChange: setHasTwitter,
        value: hasTwitter,
        children: /*#__PURE__*/_jsx(Input, {
          help: t('The twitter name for this identity.'),
          isDisabled: !hasTwitter,
          isError: !okTwitter,
          label: t('twitter'),
          onChange: setValTwitter,
          placeholder: t('@YourTwitterName'),
          value: hasTwitter ? valTwitter : '<none>'
        })
      }), /*#__PURE__*/_jsx(WrapToggle, {
        onChange: setHasRiot,
        value: hasRiot,
        children: /*#__PURE__*/_jsx(Input, {
          help: t('a riot name linked to this identity'),
          isDisabled: !hasRiot,
          isError: !okRiot,
          label: t('riot name'),
          maxLength: 32,
          onChange: setValRiot,
          placeholder: t('@yourname:matrix.org'),
          value: hasRiot ? valRiot : '<none>'
        })
      }), /*#__PURE__*/_jsx(InputBalance, {
        defaultValue: (_api$consts$identity = api.consts.identity) === null || _api$consts$identity === void 0 ? void 0 : _api$consts$identity.basicDeposit,
        help: t('Total amount of fund that will be reserved. These funds are returned when the identity is cleared'),
        isDisabled: true,
        label: t('total deposit')
      })]
    }), /*#__PURE__*/_jsxs(Modal.Actions, {
      children: [/*#__PURE__*/_jsx(TxButton, {
        accountId: address,
        icon: 'trash-alt',
        isDisabled: !gotPreviousIdentity,
        label: t('Clear Identity'),
        onStart: onClose,
        tx: api.tx.identity.clearIdentity
      }), /*#__PURE__*/_jsx(TxButton, {
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

export default styled(IdentityMain).withConfig({
  displayName: "IdentityMain",
  componentId: "sc-akiz4t-0"
})([".toggle-Wrap{position:relative;}"]);