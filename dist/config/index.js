"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEB_INTERFACE_PORT = exports.PROXY_PORT = void 0;
require("dotenv/config");
exports.PROXY_PORT = process.env.PROXY_PORT || 8001;
exports.WEB_INTERFACE_PORT = process.env.WEB_INTERFACE_PORT;
