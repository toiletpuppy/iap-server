"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^https:\/\/sync.matetranslate.com\/subscription/,
    rewrite: () => ({
        isLifetime: true,
        isSubscriptionVerified: false,
        hasBoughtPaidApp: true,
    }),
};
