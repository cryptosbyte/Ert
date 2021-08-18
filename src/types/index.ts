export type ERT_Object_type = {
  static?: string | string[] | object; // Not {} object, but arrays
  routes?: Array<ERT_Routes_Type>;
  port: number;
};

export type ERT_Routes_Type = {
  route: string;
  leadsFrom: string;
  contentType?: ERT_Routes_ContentType_Type;
};

type ERT_Routes_ContentType_Type =
  | "text/html" // HTML Files
  | "text/css" // CSS Files
  | "text/xml" // XML Files
  | "text/plain" // Plain TXT Files or Strings
  | "application/json" // JSON Files/Response (e.g. API)
  | "application/javascript"; // Javascript (or Runnable Javascript w. Callback) Files
