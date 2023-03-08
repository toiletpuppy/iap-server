"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("./process");
let protobuf;
/**
 * initializeProtobuf
 * @date 2023-02-13
 * @returns {void}
 */
const initializeProtobuf = async () => {
    protobuf = await Promise.resolve().then(() => __importStar(require("../../helpers/protocol-buffer")));
};
// load protocol-buffer
initializeProtobuf();
exports.default = {
    pattern: /^https:\/\/spclient.wg.spotify.com\/(bootstrap\/v1\/bootstrap|user-customization-service\/v1\/customize)$/,
    rewrite: (body, request) => {
        let accountAttributesMapObj;
        const url = request.url;
        const method = request.requestOptions.method;
        const postMethod = "POST";
        const binaryBody = body;
        if (url.includes("bootstrap/v1/bootstrap") && method === postMethod) {
            const bootstrapResponseType = protobuf.Root.fromJSON(process_1.spotifyJson).lookupType("BootstrapResponse");
            const bootstrapResponseObj = bootstrapResponseType.decode(binaryBody);
            accountAttributesMapObj =
                bootstrapResponseObj.ucsResponseV0.success.customization.success
                    .accountAttributesSuccess.accountAttributes;
            (0, process_1.processMap)(accountAttributesMapObj);
            body = bootstrapResponseType.encode(bootstrapResponseObj).finish();
        }
        else if (url.includes("user-customization-service/v1/customize") &&
            method === postMethod) {
            const ucsResponseWrapperType = protobuf.Root.fromJSON(process_1.spotifyJson).lookupType("UcsResponseWrapper");
            const ucsResponseWrapperMessage = ucsResponseWrapperType.decode(binaryBody);
            accountAttributesMapObj =
                ucsResponseWrapperMessage.success.accountAttributesSuccess
                    .accountAttributes;
            (0, process_1.processMap)(accountAttributesMapObj);
            body = ucsResponseWrapperType.encode(ucsResponseWrapperMessage).finish();
        }
        return body;
    },
};
