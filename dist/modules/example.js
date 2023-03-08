"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^https:\/\/httpbin.org\/user-agent$/,
    rewrite: (body) => {
        body = { ...body, test: "rewrite test" };
        return body;
    },
};
