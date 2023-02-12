import { initializeServer } from "./app";

const main = async () => {
  try {
    const { proxyServer } = initializeServer();
    // Start server
    proxyServer.start();
  } catch (error) {
    console.error(error);
  }
};

main();
