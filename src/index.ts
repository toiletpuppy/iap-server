import { initializeServer } from "./app";

/**
 * Main function
 * @date 2023-02-12
 * @returns {void}
 */
const main = (): void => {
  try {
    const proxyServer = initializeServer();
    // Start server
    proxyServer.start();
  } catch {
    console.error("ERROR");
  }
};

main();
