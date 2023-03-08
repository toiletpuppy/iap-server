"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^https:\/\/graph.nhaccuatui.com\/.*\/users\/info*/,
    rewrite: (body) => {
        body.data.vipExpire = "09.09.2099";
        body.data.isVIP = true;
        return body;
    },
};
