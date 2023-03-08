"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
/**
 * Main function
 * @date 2023-02-12
 * @returns {void}
 */
const main = () => {
    try {
        const proxyServer = (0, app_1.initializeServer)();
        // Start server
        proxyServer.start();
    }
    catch {
        // do nothing
    }
};
main();
