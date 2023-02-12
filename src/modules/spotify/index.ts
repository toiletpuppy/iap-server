import { ProtoBuf, Request, Body } from "../../types";
import { processMap, spotifyJson } from "./process";

let protobuf: ProtoBuf;

/**
 * initializeProtobuf
 * @date 2023-02-13
 * @returns {void}
 */
const initializeProtobuf = async (): Promise<void> => {
  protobuf = await import("../../helpers/protocol-buffer");
};
// load protocol-buffer
initializeProtobuf();

export default {
  pattern:
    /^https:\/\/spclient.wg.spotify.com\/(bootstrap\/v1\/bootstrap|user-customization-service\/v1\/customize)$/,
  rewrite: (body: Body, request: Request) => {
    let accountAttributesMapObj;

    const url = request.url;
    const method = request.requestOptions.method;
    const postMethod = "POST";
    const binaryBody = body;

    if (url.includes("bootstrap/v1/bootstrap") && method === postMethod) {
      const bootstrapResponseType =
        protobuf.Root.fromJSON(spotifyJson).lookupType("BootstrapResponse");
      const bootstrapResponseObj = bootstrapResponseType.decode(binaryBody);
      accountAttributesMapObj =
        bootstrapResponseObj.ucsResponseV0.success.customization.success
          .accountAttributesSuccess.accountAttributes;
      processMap(accountAttributesMapObj);
      body = bootstrapResponseType.encode(bootstrapResponseObj).finish();
    } else if (
      url.includes("user-customization-service/v1/customize") &&
      method === postMethod
    ) {
      const ucsResponseWrapperType =
        protobuf.Root.fromJSON(spotifyJson).lookupType("UcsResponseWrapper");
      const ucsResponseWrapperMessage =
        ucsResponseWrapperType.decode(binaryBody);
      accountAttributesMapObj =
        ucsResponseWrapperMessage.success.accountAttributesSuccess
          .accountAttributes;
      processMap(accountAttributesMapObj);
      body = ucsResponseWrapperType.encode(ucsResponseWrapperMessage).finish();
    }

    return body;
  },
};
