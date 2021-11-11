"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _RegistrarJudgement = _interopRequireDefault(require("./RegistrarJudgement.cjs"));

var _UserIcon = _interopRequireDefault(require("./UserIcon.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
const SUBS_DISPLAY_THRESHOLD = 4;

function Identity({
  address,
  identity
}) {
  var _api$query$identity;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    isRegistrar,
    registrars
  } = (0, _reactHooks.useRegistrars)();
  const [isJudgementOpen, toggleIsJudgementOpen] = (0, _reactHooks.useToggle)();
  const subs = (0, _reactHooks.useSubidentities)(address);
  const subsList = (0, _react.useMemo)(() => subs === null || subs === void 0 ? void 0 : subs.map(sub => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
    className: "subs",
    isPadded: false,
    value: sub
  }, sub.toString())), [subs]);

  if (!identity || !identity.isExistent || !((_api$query$identity = api.query.identity) !== null && _api$query$identity !== void 0 && _api$query$identity.identityOf)) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
    className: "withDivider",
    "data-testid": "identity-section",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "ui--AddressMenu-section ui--AddressMenu-identity",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "ui--AddressMenu-sectionHeader",
        children: [t('identity'), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
          color: identity.isBad ? 'red' : identity.isGood ? 'green' : 'yellow',
          isTag: false,
          label: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("b", {
              children: [identity.judgements.length, "\xA0"]
            }), identity.judgements.length ? identity.isBad ? identity.isErroneous ? t('Erroneous') : t('Low quality') : identity.isKnownGood ? t('Known good') : t('Reasonable') : t('No judgments')]
          }),
          size: "tiny"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AvatarItem, {
          icon:
          /*#__PURE__*/
          // This won't work - images are IPFS hashes
          // identity.image
          //   ? <img src={identity.image} />
          //   : <i className='icon user ui--AddressMenu-identityIcon' />
          //
          (0, _jsxRuntime.jsx)(_UserIcon.default, {}),
          subtitle: identity.legal,
          title: identity.display
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "ui--AddressMenu-identityTable",
          children: [identity.parent && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "tr parent",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "th",
              children: t('parent')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "td",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
                className: "parent",
                isPadded: false,
                value: identity.parent
              })
            })]
          }), identity.email && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "tr",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "th",
              children: t('email')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "td",
              children: (0, _util.isHex)(identity.email) || !identity.isKnownGood ? identity.email : /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                href: `mailto:${identity.email}`,
                rel: "noopener noreferrer",
                target: "_blank",
                children: identity.email
              })
            })]
          }), identity.web && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "tr",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "th",
              children: t('website')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "td",
              children: (0, _util.isHex)(identity.web) || !identity.isKnownGood ? identity.web : /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                href: identity.web.replace(/^(https?:\/\/)?/g, 'https://'),
                rel: "noopener noreferrer",
                target: "_blank",
                children: identity.web
              })
            })]
          }), identity.twitter && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "tr",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "th",
              children: t('twitter')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "td",
              children: (0, _util.isHex)(identity.twitter) || !identity.isKnownGood ? identity.twitter : /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                href: identity.twitter.startsWith('https://twitter.com/') ? identity.twitter : `https://twitter.com/${identity.twitter}`,
                rel: "noopener noreferrer",
                target: "_blank",
                children: identity.twitter
              })
            })]
          }), identity.riot && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "tr",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "th",
              children: t('riot')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "td",
              children: identity.riot
            })]
          }), !!(subs !== null && subs !== void 0 && subs.length) && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "tr",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "th top",
              children: t('subs')
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: "td",
              "data-testid": "subs",
              children: subs.length > SUBS_DISPLAY_THRESHOLD ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
                summary: subs.length,
                children: subsList
              }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  className: "subs-number",
                  children: subs.length
                }), subsList]
              })
            })]
          })]
        })]
      })]
    }), isRegistrar && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "ui--AddressMenu-section",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "ui--AddressMenu-actions",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.IconLink, {
              icon: "address-card",
              label: t('Add identity judgment'),
              onClick: toggleIsJudgementOpen
            })
          })
        })
      })
    }), isJudgementOpen && isRegistrar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RegistrarJudgement.default, {
      address: address,
      registrars: registrars,
      toggleJudgement: toggleIsJudgementOpen
    }, 'modal-judgement')]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Identity);

exports.default = _default;