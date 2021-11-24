"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addrToChecksum = addrToChecksum;
exports.getStatement = getStatement;
exports.hashMessage = hashMessage;
exports.publicToAddr = publicToAddr;
exports.recoverAddress = recoverAddress;
exports.recoverFromJSON = recoverFromJSON;
exports.sigToParts = sigToParts;

var _elliptic = _interopRequireDefault(require("secp256k1/elliptic"));

var _typeRegistry = _interopRequireDefault(require("@axia-js/react-api/typeRegistry"));

var _util = require("@axia-js/util");

var _utilCrypto = require("@axia-js/util-crypto");

// Copyright 2017-2021 @axia-js/app-claims authors & contributors
// SPDX-License-Identifier: Apache-2.0
// converts an Ethereum address to a checksum representation
function addrToChecksum(_address) {
  const address = _address.toLowerCase();

  const hash = (0, _utilCrypto.keccakAsHex)(address.substr(2)).substr(2);
  let result = '0x';

  for (let n = 0; n < 40; n++) {
    result = `${result}${parseInt(hash[n], 16) > 7 ? address[n + 2].toUpperCase() : address[n + 2]}`;
  }

  return result;
} // convert a give public key to an Ethereum address (the last 20 bytes of an _exapnded_ key keccack)


function publicToAddr(publicKey) {
  return addrToChecksum(`0x${(0, _utilCrypto.keccakAsHex)(publicKey).slice(-40)}`);
} // hash a message for use in signature recovery, adding the standard Ethereum header


function hashMessage(message) {
  const expanded = (0, _util.stringToU8a)(`\x19Ethereum Signed Message:\n${message.length.toString()}${message}`);
  const hashed = (0, _utilCrypto.keccakAsU8a)(expanded);
  return (0, _util.u8aToBuffer)(hashed);
} // split is 65-byte signature into the r, s (combined) and recovery number (derived from v)


function sigToParts(_signature) {
  const signature = (0, _util.hexToU8a)(_signature);
  (0, _util.assert)(signature.length === 65, `Invalid signature length, expected 65 found ${signature.length}`);
  let v = signature[64];

  if (v < 27) {
    v += 27;
  }

  const recovery = v - 27;
  (0, _util.assert)(recovery === 0 || recovery === 1, 'Invalid signature v value');
  return {
    recovery,
    signature: (0, _util.u8aToBuffer)(signature.slice(0, 64))
  };
} // recover an address from a given message and a recover/signature combination


function recoverAddress(message, _ref) {
  let {
    recovery,
    signature
  } = _ref;
  const msgHash = hashMessage(message);

  const senderPubKey = _elliptic.default.recover(msgHash, signature, recovery);

  return publicToAddr(_elliptic.default.publicKeyConvert(senderPubKey, false).slice(1));
} // recover an address from a signature JSON (as supplied by e.g. MyCrypto)


function recoverFromJSON(signatureJson) {
  try {
    const {
      msg,
      sig
    } = JSON.parse(signatureJson || '{}');

    if (!msg || !sig) {
      throw new Error('Invalid signature object');
    }

    const parts = sigToParts(sig);
    return {
      error: null,
      ethereumAddress: _typeRegistry.default.createType('EthereumAddress', recoverAddress(msg, parts)),
      signature: _typeRegistry.default.createType('EcdsaSignature', (0, _util.u8aConcat)(parts.signature, new Uint8Array([parts.recovery])))
    };
  } catch (error) {
    console.error(error);
    return {
      error: error,
      ethereumAddress: null,
      signature: null
    };
  }
}

function getAXIA(kind) {
  if (!kind) {
    return undefined;
  }

  const url = kind.isRegular ? 'https://statement.axia.network/regular.html' : 'https://statement.axia.network/saft.html';
  const hash = kind.isRegular ? 'Qmc1XYqT6S39WNp2UeiRUrZichUWUPpGEThDE6dAb3f6Ny' : 'QmXEkMahfhHJPzT3RjkXiZVFi77ZeVeuxtAjhojGRNYckz';
  return {
    sentence: `I hereby agree to the terms of the statement whose SHA-256 multihash is ${hash}. (This may be found at the URL: ${url})`,
    url
  };
}

function getStatement(network, kind) {
  switch (network) {
    case 'AXIA':
    case 'AXIA CC1':
      return getAXIA(kind);

    default:
      return undefined;
  }
}