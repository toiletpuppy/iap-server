"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^https:\/\/api\.textnow\.me\/api2.0\/users\/.+/,
    rewrite: (body) => {
        body["show_ads"] = false;
        body["premium_calling"] = true;
        return body;
    },
};
