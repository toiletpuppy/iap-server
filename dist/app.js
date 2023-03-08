"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeServer = void 0;
const path_1 = __importDefault(require("path"));
const anyproxy_1 = require("anyproxy");
const modules_1 = require("./modules");
const config_1 = require("./config");
// Initialize certifiates
if (!anyproxy_1.utils.certMgr.ifRootCAFileExists()) {
    anyproxy_1.utils.certMgr.generateRootCA((error, keyPath) => {
        // let users to trust this CA before using proxy
        if (!error) {
            const certDir = path_1.default.dirname(keyPath);
            console.log("The cert is generated at", certDir);
        }
        else {
            console.error("Error when generating rootCA", error);
        }
    });
}
/**
 * Initialize server
 * @date 2023-02-12
 * @returns {ProxyServer}
 */
const initializeServer = () => {
    const proxyServer = new anyproxy_1.ProxyServer({
        port: config_1.PROXY_PORT,
        rule: {
            beforeSendResponse: modules_1.beforeSendResponse,
        },
        webInterface: {
            enable: config_1.WEB_INTERFACE_PORT ? true : false,
            webPort: Number(config_1.WEB_INTERFACE_PORT),
        },
        silent: true,
        forceProxyHttps: true,
    });
    proxyServer.on("ready", () => {
        console.log("Proxy Server is ready");
    });
    proxyServer.on("error", (error) => {
        console.log("Proxy Server error:", error);
    });
    return proxyServer;
};
exports.initializeServer = initializeServer;
