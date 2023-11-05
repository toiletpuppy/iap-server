"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^http:\/\/phimwin\.com\/b\/g$/,
    rewrite: (body) => {
        body.data.title.useVipLink = true;
        body.data.title.canUseVpn = true;
        return body;
    },
};
