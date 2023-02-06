"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  luhn: () => luhn
});
module.exports = __toCommonJS(src_exports);
function luhn(str) {
  const parsed = String(str).replace(/[^\d]/g, "");
  const size = parsed.length;
  const sizeCheck = size % 2;
  if (!size) {
    return false;
  }
  let series = ``;
  let el;
  let sum = 0;
  for (let i = size - 1; i >= 0; --i) {
    el = parsed.charAt(i);
    if (sizeCheck === i % 2) {
      series += String(parseInt(el, 10) * 2);
    } else {
      series += el;
    }
  }
  series.split("").map((el2) => {
    sum += parseInt(el2, 10);
  });
  return sum % 10 === 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  luhn
});
