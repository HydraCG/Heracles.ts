import * as express from "express";
import * as fs from "fs";
const serverPort = 3000;

function setCorsHeaders(
  response: express.Response,
  allowedMethods: Array<string> = ["GET"]
) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", allowedMethods.join(", "));
  response.header("Access-Control-Expose-Headers", "Link, Content-Type, Location");
}

function setHeaders(
  path: string,
  response: express.Response,
  isJsonLd: boolean
): boolean {
  response.header(
    "Content-Type",
    isJsonLd ? "application/ld+json" : "text/plain"
  );
  setCorsHeaders(response);
  const file = __dirname + path + ".headers";
  if (!fs.existsSync(file)) {
    return false;
  }
  fs
    .readFileSync(file, "utf8")
    .replace("\r", "")
    .split("\n")
    .filter((header) => header.length > 0)
    .forEach((header) => {
      const name = header.split(":")[0];
      const value = header.substr(name.length + 1).trim();
      response.header(name, value);
    });

  return true;
}

function loadBody(path: string) {
  const file = __dirname + path + (path.indexOf(".") === -1 ? ".jsonld" : "");
  if (fs.existsSync(file)) {
    return fs.readFileSync(file, "utf8");
  }

  return null;
}

module.exports = {
  "framework:hydra-testserver": [
    "factory",
    function framework(args, config, logger, helper) {
      const log = logger.create("hydra-testserver");
      log.info("Starting test server...");
      const server = express();
      server.disable("etag");
      server.options("/*", (request, response) => {
        setCorsHeaders(response, ["GET", "PUT", "POST"]);
        response.status(200).send();
      });
      server.get("/*", (request, response) => {
        const path = request.path === "/" ? "/root" : request.path;
        const body = loadBody(path);
        if (setHeaders(path, response, !!body) || body) {
          response.status(200).send(body);
        } else {
          response.status(404).send();
        }
      });
      server.post("/*", (request, response) => {
        setCorsHeaders(response, ["POST"]);
        response.header("Location", request.path + "/" + Math.random().toString().substr(2));
        response.status(201).send();
      });
      server.put("/*", (request, response) => {
        setCorsHeaders(response, ["GET", "PUT"]);
        response.status(200).send();
      });
      server.listen(serverPort, () =>
        log.info("Hydra tests server is listening on port %d...", serverPort)
      );
    }
  ]
};
