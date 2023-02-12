import { config } from "dotenv";
config();

export const PROXY_PORT = process.env.PORT || 8001;
export const WEB_INTERFACE_PORT = process.env.PORT || 8002;
