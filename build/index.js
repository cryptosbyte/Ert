"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ert_1 = __importDefault(require("./Ert"));
const ertConfig = require(process.argv[2]);
new Ert_1.default(ertConfig).start((listener) => {
    console.log(listener);
});
