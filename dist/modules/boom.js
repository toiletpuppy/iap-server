"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyReceipt_1 = require("../shared/verifyReceipt");
exports.default = {
    pattern: /^https:\/\/apimboom2.globaldelight.net\/itunesreceipt_v2.php$/,
    rewrite: verifyReceipt_1.verifyReceipt,
};
