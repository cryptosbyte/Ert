import fs from "fs";
import path from "path";
import http from "http";
import * as types from "./types/index";
// import http_server from "./http";

export default class Ert {
  private server: http.Server;
  private ERT_Obj: types.ERT_Object_type;

  constructor(ERT_Obj: types.ERT_Object_type) {
    this.server = new http.Server(
      (request: http.IncomingMessage, response: http.ServerResponse) => {
        // Routes
        ERT_Obj.routes?.forEach((item: types.ERT_Routes_Type) => {
          if (request.url === item.route) {
            fs.readFile(item.leadsFrom, (err: any, html: Buffer) => {
              if (err) return console.error(err);

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

        // Static
        if (ERT_Obj.static) {
          if (typeof ERT_Obj.static === "string") {
            fs.readdir(
              ERT_Obj.static,
              (error: NodeJS.ErrnoException | null, files: string[]) => {
                if (error) return console.error(error);

                files.map((file: string) => {
                  fs.readFile(
                    `${ERT_Obj.static}/${file}`,
                    (error: NodeJS.ErrnoException | null, content: Buffer) => {
                      if (error) return console.error(error);

                      if (request.url === `/static/${file}`) {
                        response.writeHead(200, {
                          "Content-Type": "text/plain",
                        });

                        response.write(content);
                        response.end();
                      }
                    }
                  );
                });
              }
            );
          }

          // object (referred as) -> array
          if (typeof ERT_Obj.static === "object") {
            //@ts-ignore
            for (const dir of ERT_Obj.static) {
              fs.readdir(
                dir,
                (error: NodeJS.ErrnoException | null, files: string[]) => {
                  if (error) return console.error(error);

                  files.map((file: string) => {
                    fs.readFile(
                      `${dir}/${file}`,
                      (
                        error: NodeJS.ErrnoException | null,
                        content: Buffer
                      ) => {
                        if (error) return console.error(error);

                        if (request.url === `/static/${file}`) {
                          response.writeHead(200, {
                            "Content-Type": "text/plain",
                          });

                          response.write(content);
                          response.end();
                        }
                      }
                    );
                  });
                }
              );
            }
          }
        }
      }
    );

    this.ERT_Obj = ERT_Obj;
  }

  public start() {
    this.server.listen(this.ERT_Obj.port);
  }

  private Response_No_Input(
    request: http.IncomingMessage,
    response: http.ServerResponse,
    route: string
  ) {
    // This responds with a plain error message that shows if no sufficient/corrent input was given for the route.

    response.writeHead(200, {
      "Content-Type": "text/plain",
    });
    response.write(`CAN NOT ${request.method} ${route} (nothing to display)`);
    return;
  }
}
