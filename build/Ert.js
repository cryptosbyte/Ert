"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
class Ert {
    constructor(ERT_Obj) {
        this.server = new http_1.default.Server((request, response) => {
            var _a;
            (_a = ERT_Obj.routes) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                if (request.url === item.route) {
                    fs_1.default.readFile(item.leadsFrom, (err, html) => {
                        if (err)
                            return console.error(err);
                        if (!html)
                            return this.Response_No_Input(request, response, item.route);
                        response.writeHead(200, {
                            "Content-Type": item.contentType || "text/html",
                        });
                        response.write(html);
                        response.end();
                    });
                }
            });
            if (ERT_Obj.static && typeof ERT_Obj.static === "string") {
                fs_1.default.readdir(ERT_Obj.static, (error, files) => {
                    if (error)
                        return console.error(error);
                    files.map((file) => {
                        fs_1.default.readFile(`${ERT_Obj.static}/${file}`, (error, content) => {
                            if (error)
                                return console.error(error);
                            if (request.url === `/static/${file}`) {
                                response.writeHead(200, {
                                    "Content-Type": "text/plain",
                                });
                                response.write(content);
                                response.end();
                            }
                        });
                    });
                });
            }
        });
        this.ERT_Obj = ERT_Obj;
    }
    start(callback) {
        const svr = this.server.listen(this.ERT_Obj.port);
        svr;
        return callback({
            address: svr.address(),
        });
    }
    Response_No_Input(request, response, route) {
        response.writeHead(200, {
            "Content-Type": "text/plain",
        });
        response.write(`CAN NOT ${request.method} ${route} (nothing to display)`);
        return;
    }
}
exports.default = Ert;
