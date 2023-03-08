"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyJson = exports.processMap = exports.deepCopy = void 0;
const lodash_1 = __importDefault(require("lodash"));
/**
 * deepCopy
 * @date 2023-02-13
 * @param {any} data
 * @param {any} hash
 * @returns {Object}
 */
const deepCopy = (data, hash = new WeakMap()) => {
    if (typeof data !== "object" || data === null) {
        throw new TypeError();
    }
    if (hash.has(data)) {
        return hash.get(data);
    }
    const newData = {};
    const dataKeys = Object.keys(data);
    lodash_1.default.forEach(dataKeys, (value) => {
        const currentDataValue = data[value];
        if (typeof currentDataValue !== "object" || currentDataValue === null) {
            newData[value] = currentDataValue;
        }
        else if (Array.isArray(currentDataValue)) {
            newData[value] = [...currentDataValue];
        }
        else if (currentDataValue instanceof Set) {
            newData[value] = new Set([...currentDataValue]);
        }
        else if (currentDataValue instanceof Map) {
            newData[value] = new Map([...currentDataValue]);
        }
        else {
            hash.set(data, data);
            newData[value] = (0, exports.deepCopy)(currentDataValue, hash);
        }
    });
    return newData;
};
exports.deepCopy = deepCopy;
/**
 * processMap
 * @date 2023-02-13
 * @param {Object} accountAttributesMap
 * @returns {void}
 */
const processMap = (accountAttributesMap) => {
    accountAttributesMap["type"]["stringValue"] = "premium";
    accountAttributesMap["pause-after"]["longValue"] = 0;
    accountAttributesMap["license-acceptance-grace-days"]["longValue"] = 30;
    accountAttributesMap["audio-quality"]["stringValue"] = "1";
    accountAttributesMap["name"]["stringValue"] = "Spotify Premium";
    accountAttributesMap["catalogue"]["stringValue"] = "premium";
    accountAttributesMap["player-license"]["stringValue"] = "premium";
    accountAttributesMap["shuffle"]["boolValue"] = false;
    accountAttributesMap["ads"]["boolValue"] = false;
    accountAttributesMap["on-demand"]["boolValue"] = true;
    accountAttributesMap["unrestricted"] = (0, exports.deepCopy)(accountAttributesMap["shuffle"]);
    accountAttributesMap["unrestricted"]["boolValue"] = true;
    accountAttributesMap["unrestricted"]["longValue"] = 0;
    accountAttributesMap["shuffle-eligible"] = (0, exports.deepCopy)(accountAttributesMap["unrestricted"]);
    accountAttributesMap["com.spotify.madprops.use.ucs.product.state"]["boolValue"] = true;
    // accountAttributesMap['payments-initial-campaign'] = deepCopy(accountAttributesMap['unrestricted']);
    // accountAttributesMap['payments-initial-campaign']['boolValue'] = false;
    // accountAttributesMap['payments-initial-campaign']['longValue'] = 0;
    // accountAttributesMap['payments-initial-campaign']['stringValue'] = 'default';
    //
    accountAttributesMap["loudness-levels"] = (0, exports.deepCopy)(accountAttributesMap["unrestricted"]);
    accountAttributesMap["loudness-levels"]["boolValue"] = false;
    accountAttributesMap["loudness-levels"]["longValue"] = 0;
    accountAttributesMap["loudness-levels"]["stringValue"] =
        "1:-9.0,0.0,3.0:-2.0";
    accountAttributesMap["mobile-login"]["boolValue"] = true;
    accountAttributesMap["mobile"]["boolValue"] = true;
    accountAttributesMap["nft-disabled"]["stringValue"] = "1";
    accountAttributesMap["streaming-rules"]["stringValue"] = "";
    delete accountAttributesMap["ad-catalogues"];
    delete accountAttributesMap["ad-use-adlogic"];
    // delete accountAttributesMap['filter-explicit-content'];
    accountAttributesMap["high-bitrate"]["boolValue"] = true;
    accountAttributesMap["libspotify"]["boolValue"] = true;
    accountAttributesMap["can_use_superbird"]["boolValue"] = true;
    accountAttributesMap["offline"]["boolValue"] = true;
};
exports.processMap = processMap;
// sample spotifyJson data
exports.spotifyJson = {
    nested: {
        BootstrapResponse: {
            fields: {
                ucsResponseV0: { type: "UcsResponseWrapperV0", id: 2 },
                trialsFacadeResponseV1: {
                    type: "TrialsFacadeResponseWrapperV1",
                    id: 3,
                },
            },
        },
        UcsResponseWrapperV0: {
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
            fields: { filed1: { type: "int32", id: 1 } },
        },
        UcsResponseWrapper: {
            fields: {
                success: { type: "UcsResponse", id: 1 },
                error: { type: "Error", id: 2 },
            },
        },
        UcsResponse: {
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
        BoolValue: { fields: { value: { type: "int32", id: 1 } } },
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
