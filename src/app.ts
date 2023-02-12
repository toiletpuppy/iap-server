import path from "path";
import { utils, ProxyServer } from "anyproxy";
import { beforeSendResponse } from "./modules";
import { PROXY_PORT, WEB_INTERFACE_PORT } from "./config";

// Initialize certifiates
if (!utils.certMgr.ifRootCAFileExists()) {
  utils.certMgr.generateRootCA((error, keyPath) => {
    // let users to trust this CA before using proxy
    if (!error) {
      const certDir = path.dirname(keyPath);
      console.log("The cert is generated at", certDir);
    } else {
      console.error("Error when generating rootCA", error);
    }
  });
}

// Initialize server
export const initializeServer = () => {
  const proxyServer = new ProxyServer({
    port: PROXY_PORT,
    rule: {
      beforeSendResponse,
    },
    webInterface: {
      enable: true,
      webPort: <number>WEB_INTERFACE_PORT,
    },
    silent: false,
    forceProxyHttps: true,
  });

  proxyServer.on("ready", () => {
    console.log("Proxy Server is ready");
  });

  proxyServer.on("error", (error) => {
    console.log("Proxy Server error:", error);
  });

  return { proxyServer };
};
