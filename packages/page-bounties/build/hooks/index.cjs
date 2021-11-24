"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useBounties = require("./useBounties.cjs");

Object.keys(_useBounties).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useBounties[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useBounties[key];
    }
  });
});

var _useBalance = require("./useBalance.cjs");

Object.keys(_useBalance).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useBalance[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useBalance[key];
    }
  });
});

var _useUserRole = require("./useUserRole.cjs");

Object.keys(_useUserRole).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useUserRole[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useUserRole[key];
    }
  });
});

var _useBountyStatus = require("./useBountyStatus.cjs");

Object.keys(_useBountyStatus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useBountyStatus[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useBountyStatus[key];
    }
  });
});