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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeSendResponse = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const lodash_1 = __importDefault(require("lodash"));
const files = fs_1.default.readdirSync(__dirname);
const modules = [];
/**
 * Load Module from directory
 * @date 2023-02-13
 * @param {string} file
 * @returns {Promise<void>}
 */
const loadModule = async (file) => {
    const moduleName = path_1.default.parse(file).name;
    if (moduleName === "index") {
        return;
    }
    const module = await Promise.resolve().then(() => __importStar(require(`./${moduleName}`)));
    modules.push(...Object.values(module));
    console.log("\x1b[32m%s\x1b[0m", `[Module loaded]: ${moduleName}`);
};
// load all modules from this folder
lodash_1.default.forEach(files, loadModule);
/**
 * Process response body
 * @date 2023-02-12
 * @param {RequestDetail} requestDetail
 * @param {ResponseDetail} responseDetail
 * @returns
 */
const beforeSendResponse = async (requestDetail, responseDetail) => {
    try {
        const matchedModule = lodash_1.default.find(modules, (module) => module.pattern.test(requestDetail.url));
        if (matchedModule) {
            responseDetail.response.body = (0, utils_1.objectToBuffer)(matchedModule.rewrite((0, utils_1.bufferToObject)(responseDetail.response.body), requestDetail));
        }
    }
    catch {
        // do nothing
    }
    return responseDetail;
};
exports.beforeSendResponse = beforeSendResponse;
