"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^https:\/\/graph.nhaccuatui.com\/.*\/user\/account\/info/,
    rewrite: (body) => {
        body.data.vipExpire = "05.11.2099";
        body.data.isVIP = true;
        return body;
    },
};
