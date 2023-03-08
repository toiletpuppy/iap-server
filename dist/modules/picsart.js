"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^https:\/\/api\.(picsart|meiease)\.c(n|om)\/users\/show\/me.json/,
    rewrite: (body) => ({
        ...body,
        subscription: {
            granted: true,
        },
    }),
};
