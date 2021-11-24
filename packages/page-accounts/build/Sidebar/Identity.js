// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressMini, AvatarItem, Expander, IconLink, Tag } from '@axia-js/react-components';
import { useApi, useRegistrars, useSubidentities, useToggle } from '@axia-js/react-hooks';
import { isHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import RegistrarJudgement from "./RegistrarJudgement.js";
import UserIcon from "./UserIcon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const SUBS_DISPLAY_THRESHOLD = 4;

function Identity({
  address,
  identity
}) {
  var _api$query$identity;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    isRegistrar,
    registrars
  } = useRegistrars();
  const [isJudgementOpen, toggleIsJudgementOpen] = useToggle();
  const subs = useSubidentities(address);
  const subsList = useMemo(() => subs === null || subs === void 0 ? void 0 : subs.map(sub => /*#__PURE__*/_jsx(AddressMini, {
    className: "subs",
    isPadded: false,
    value: sub
  }, sub.toString())), [subs]);

  if (!identity || !identity.isExistent || !((_api$query$identity = api.query.identity) !== null && _api$query$identity !== void 0 && _api$query$identity.identityOf)) {
    return null;
  }

  return /*#__PURE__*/_jsxs("section", {
    className: "withDivider",
    "data-testid": "identity-section",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "ui--AddressMenu-section ui--AddressMenu-identity",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "ui--AddressMenu-sectionHeader",
        children: [t('identity'), /*#__PURE__*/_jsx(Tag, {
          color: identity.isBad ? 'red' : identity.isGood ? 'green' : 'yellow',
          isTag: false,
          label: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsxs("b", {
              children: [identity.judgements.length, "\xA0"]
            }), identity.judgements.length ? identity.isBad ? identity.isErroneous ? t('Erroneous') : t('Low quality') : identity.isKnownGood ? t('Known good') : t('Reasonable') : t('No judgments')]
          }),
          size: "tiny"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(AvatarItem, {
          icon:
          /*#__PURE__*/
          // This won't work - images are IPFS hashes
          // identity.image
          //   ? <img src={identity.image} />
          //   : <i className='icon user ui--AddressMenu-identityIcon' />
          //
          _jsx(UserIcon, {}),
          subtitle: identity.legal,
          title: identity.display
        }), /*#__PURE__*/_jsxs("div", {
          className: "ui--AddressMenu-identityTable",
          children: [identity.parent && /*#__PURE__*/_jsxs("div", {
            className: "tr parent",
            children: [/*#__PURE__*/_jsx("div", {
              className: "th",
              children: t('parent')
            }), /*#__PURE__*/_jsx("div", {
              className: "td",
              children: /*#__PURE__*/_jsx(AddressMini, {
                className: "parent",
                isPadded: false,
                value: identity.parent
              })
            })]
          }), identity.email && /*#__PURE__*/_jsxs("div", {
            className: "tr",
            children: [/*#__PURE__*/_jsx("div", {
              className: "th",
              children: t('email')
            }), /*#__PURE__*/_jsx("div", {
              className: "td",
              children: isHex(identity.email) || !identity.isKnownGood ? identity.email : /*#__PURE__*/_jsx("a", {
                href: `mailto:${identity.email}`,
                rel: "noopener noreferrer",
                target: "_blank",
                children: identity.email
              })
            })]
          }), identity.web && /*#__PURE__*/_jsxs("div", {
            className: "tr",
            children: [/*#__PURE__*/_jsx("div", {
              className: "th",
              children: t('website')
            }), /*#__PURE__*/_jsx("div", {
              className: "td",
              children: isHex(identity.web) || !identity.isKnownGood ? identity.web : /*#__PURE__*/_jsx("a", {
                href: identity.web.replace(/^(https?:\/\/)?/g, 'https://'),
                rel: "noopener noreferrer",
                target: "_blank",
                children: identity.web
              })
            })]
          }), identity.twitter && /*#__PURE__*/_jsxs("div", {
            className: "tr",
            children: [/*#__PURE__*/_jsx("div", {
              className: "th",
              children: t('twitter')
            }), /*#__PURE__*/_jsx("div", {
              className: "td",
              children: isHex(identity.twitter) || !identity.isKnownGood ? identity.twitter : /*#__PURE__*/_jsx("a", {
                href: identity.twitter.startsWith('https://twitter.com/') ? identity.twitter : `https://twitter.com/${identity.twitter}`,
                rel: "noopener noreferrer",
                target: "_blank",
                children: identity.twitter
              })
            })]
          }), identity.riot && /*#__PURE__*/_jsxs("div", {
            className: "tr",
            children: [/*#__PURE__*/_jsx("div", {
              className: "th",
              children: t('riot')
            }), /*#__PURE__*/_jsx("div", {
              className: "td",
              children: identity.riot
            })]
          }), !!(subs !== null && subs !== void 0 && subs.length) && /*#__PURE__*/_jsxs("div", {
            className: "tr",
            children: [/*#__PURE__*/_jsx("div", {
              className: "th top",
              children: t('subs')
            }), /*#__PURE__*/_jsx("div", {
              className: "td",
              "data-testid": "subs",
              children: subs.length > SUBS_DISPLAY_THRESHOLD ? /*#__PURE__*/_jsx(Expander, {
                summary: subs.length,
                children: subsList
              }) : /*#__PURE__*/_jsxs(_Fragment, {
                children: [/*#__PURE__*/_jsx("div", {
                  className: "subs-number",
                  children: subs.length
                }), subsList]
              })
            })]
          })]
        })]
      })]
    }), isRegistrar && /*#__PURE__*/_jsx("div", {
      className: "ui--AddressMenu-section",
      children: /*#__PURE__*/_jsx("div", {
        className: "ui--AddressMenu-actions",
        children: /*#__PURE__*/_jsx("ul", {
          children: /*#__PURE__*/_jsx("li", {
            children: /*#__PURE__*/_jsx(IconLink, {
              icon: "address-card",
              label: t('Add identity judgment'),
              onClick: toggleIsJudgementOpen
            })
          })
        })
      })
    }), isJudgementOpen && isRegistrar && /*#__PURE__*/_jsx(RegistrarJudgement, {
      address: address,
      registrars: registrars,
      toggleJudgement: toggleIsJudgementOpen
    }, 'modal-judgement')]
  });
}

export default /*#__PURE__*/React.memo(Identity);