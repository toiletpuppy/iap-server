"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^https?:\/\/restore-access.indream.app\/restoreAccess\?id=\w+$/,
    rewrite: () => ({
        data: {
            premiumAccess: true,
        },
    }),
};
