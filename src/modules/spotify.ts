import { Request } from "../types";

export default {
  url: "^https://spclient.wg.spotify.com/(bootstrap/v1/bootstrap|user-customization-service/v1/customize)$",
  rewrite: async (body: Body, request: Request) => {
    const spotifyJson = {
      options: { java_package: "com.smile.spotify.model" },
      nested: {
        BootstrapResponse: {
          oneofs: {
            ucsResponse: { oneof: ["ucsResponseV0", "trialsFacadeResponseV1"] },
          },
          fields: {
            ucsResponseV0: { type: "UcsResponseWrapperV0", id: 2 },
            trialsFacadeResponseV1: {
              type: "TrialsFacadeResponseWrapperV1",
              id: 3,
            },
          },
        },
        UcsResponseWrapperV0: {
          oneofs: { result: { oneof: ["success", "error"] } },
          fields: {
            success: { type: "UcsResponseWrapperSuccess", id: 1 },
            error: { type: "UcsResponseWrapperError", id: 2 },
          },
        },
        UcsResponseWrapperSuccess: {
          fields: { customization: { type: "UcsResponseWrapper", id: 1 } },
        },
        UcsResponseWrapperError: {
          fields: {
            errorCode: { type: "int32", id: 1 },
            message: { type: "string", id: 2 },
            logId: { type: "string", id: 3 },
          },
        },
        TrialsFacadeResponseWrapperV1: {
          oneofs: { result: { oneof: ["success", "error"] } },
          fields: {
            success: { type: "TrialsFacadeResponseWrapperSuccess", id: 1 },
            error: { type: "TrialsFacadeResponseWrapperError", id: 2 },
          },
        },
        TrialsFacadeResponseWrapperError: {
          fields: {
            errorCode: { type: "int32", id: 1 },
            message: { type: "string", id: 2 },
            logId: { type: "string", id: 3 },
          },
        },
        TrialsFacadeResponseWrapperSuccess: {
          fields: { field1: { type: "int32", id: 1 } },
        },
        UcsResponseWrapper: {
          oneofs: { result: { oneof: ["success", "error"] } },
          fields: {
            success: { type: "UcsResponse", id: 1 },
            error: { type: "Error", id: 2 },
          },
        },
        UcsResponse: {
          oneofs: {
            resolveResult: { oneof: ["resolveSuccess", "resolveError"] },
            accountAttributesResult: {
              oneof: ["accountAttributesSuccess", "accountAttributesError"],
            },
          },
          fields: {
            resolveSuccess: { type: "ResolveResponse", id: 1 },
            resolveError: { type: "Error", id: 2 },
            accountAttributesSuccess: {
              type: "AccountAttributesResponse",
              id: 3,
            },
            accountAttributesError: { type: "Error", id: 4 },
            fetchTimeMillis: { type: "int64", id: 5 },
          },
        },
        ResolveResponse: {
          fields: { configuration: { type: "Configuration", id: 1 } },
        },
        Configuration: {
          fields: {
            configurationAssignmentId: { type: "string", id: 1 },
            fetchTimeMillis: { type: "int64", id: 2 },
            assignedValues: { rule: "repeated", type: "AssignedValue", id: 3 },
          },
        },
        AssignedValue: {
          oneofs: {
            structuredValue: { oneof: ["boolValue", "intValue", "enumValue"] },
          },
          fields: {
            propertyId: { type: "Identifier", id: 1 },
            metadata: { type: "Metadata", id: 2 },
            boolValue: { type: "BoolValue", id: 3 },
            intValue: { type: "IntValue", id: 4 },
            enumValue: { type: "EnumValue", id: 5 },
          },
        },
        Identifier: {
          fields: {
            scope: { type: "string", id: 1 },
            name: { type: "string", id: 2 },
          },
        },
        Metadata: {
          fields: {
            policyId: { type: "int64", id: 1 },
            externalRealm: { type: "string", id: 2 },
            externalRealmId: { type: "int64", id: 3 },
          },
        },
        BoolValue: { fields: { value: { type: "bool", id: 1 } } },
        EnumValue: { fields: { value: { type: "string", id: 1 } } },
        IntValue: { fields: { value: { type: "int32", id: 1 } } },
        AccountAttributesResponse: {
          fields: {
            accountAttributes: {
              keyType: "string",
              type: "AccountAttribute",
              id: 1,
            },
          },
        },
        AccountAttribute: {
          oneofs: {
            value: { oneof: ["boolValue", "longValue", "stringValue"] },
          },
          fields: {
            boolValue: { type: "bool", id: 2 },
            longValue: { type: "int64", id: 3 },
            stringValue: { type: "string", id: 4 },
          },
        },
        Error: {
          fields: {
            errorCode: { type: "int32", id: 1 },
            errorMessage: { type: "string", id: 2 },
          },
        },
      },
    };
    let accountAttributesMapObj;

    const url = request.url;
    const method = request.requestOptions.method;
    const postMethod = "POST";
    const binaryBody = Buffer.from(JSON.stringify(body));

    const protobuf = await import("../helpers/protocol-buffer");

    if (url.includes("bootstrap/v1/bootstrap") && method === postMethod) {
      const bootstrapResponseType =
        protobuf.Root.fromJSON(spotifyJson).lookupType("BootstrapResponse");
      const bootstrapResponseObj = bootstrapResponseType.decode(binaryBody);
      accountAttributesMapObj =
        bootstrapResponseObj.ucsResponseV0.success.customization.success
          .accountAttributesSuccess.accountAttributes;
      processMapObj(accountAttributesMapObj);
      body = bootstrapResponseType.encode(bootstrapResponseObj).finish();
      console.log("bootstrap");
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
      processMapObj(accountAttributesMapObj);
      body = ucsResponseWrapperType.encode(ucsResponseWrapperMessage).finish();
      console.log("customize");
    } else {
      console.log(
        "spotify解锁premium",
        "路径/请求方法匹配错误:",
        method + "," + url
      );
    }

    function processMapObj(accountAttributesMapObj: any) {
      accountAttributesMapObj["player-license"] = { stringValue: "premium" };
      accountAttributesMapObj["mobile"] = { boolValue: true };
      accountAttributesMapObj["streaming-rules"] = { stringValue: "" };
      accountAttributesMapObj["financial-product"] = {
        stringValue: "pr:premium,tc:0",
      };
      accountAttributesMapObj["license-acceptance-grace-days"] = {
        longValue: 30,
      };
      accountAttributesMapObj["mobile-login"] = { boolValue: true };
      accountAttributesMapObj["name"] = { stringValue: "Spotify Premium" };
      accountAttributesMapObj["on-demand"] = { boolValue: true };
      accountAttributesMapObj["ads"] = { boolValue: false };
      accountAttributesMapObj["catalogue"] = { stringValue: "premium" };
      accountAttributesMapObj["high-bitrate"] = { boolValue: true };
      accountAttributesMapObj["libspotify"] = { boolValue: true };
      // 主页右下角的会员广告tab
      accountAttributesMapObj["nft-disabled"] = { stringValue: "1" };
      accountAttributesMapObj["shuffle"] = { boolValue: false };
      accountAttributesMapObj["audio-quality"] = { stringValue: "1" };
      accountAttributesMapObj["offline"] = { boolValue: true };
      accountAttributesMapObj["pause-after"] = { longValue: 0 };
      accountAttributesMapObj["can_use_superbird"] = { boolValue: true };
      accountAttributesMapObj["type"] = { stringValue: "premium" };

      // vip新增的
      accountAttributesMapObj["loudness-levels"] = {
        stringValue: "1:-9.0,0.0,3.0:-2.0",
      };
      accountAttributesMapObj["payments-initial-campaign"] = {
        stringValue: "web",
      };
      accountAttributesMapObj["shuffle-eligible"] = { boolValue: true };
      accountAttributesMapObj["unrestricted"] = { boolValue: true };
      // 儿童不宜
      // accountAttributesMapObj['filter-explicit-content'] = {boolValue : true};
      // 决定customize是否有效 有的用户没有此属性
      accountAttributesMapObj["com.spotify.madprops.use.ucs.product.state"] = {
        boolValue: true,
      };

      delete accountAttributesMapObj["ad-use-adlogic"];
      delete accountAttributesMapObj["ad-catalogues"];
    }

    return body;
  },
};
