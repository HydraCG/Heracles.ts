import * as bodyParser from "body-parser";
import * as express from "express";
import * as fs from "fs";
import * as md5 from "js-md5";
const serverPort = 3000;

function setCorsHeaders(response: express.Response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "HEAD, GET, PUT, DELETE, POST");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Access-Control-Expose-Headers", "Link, Content-Type, Location");
}

function setHeaders(path: string, response: express.Response, isJsonLd: boolean): boolean {
  response.header("Content-Type", isJsonLd ? "application/ld+json" : "text/plain");
  setCorsHeaders(response);
  const file = __dirname + path + ".headers";
  if (!fs.existsSync(file)) {
    return false;
  }
  fs
    .readFileSync(file, "utf8")
    .replace("\r", "")
    .split("\n")
    .filter(header => header.length > 0)
    .forEach(header => {
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
      server.use(
        bodyParser.json({
          type: request => request.headers["content-type"] === "application/ld+json"
        })
      );
      server.options("/*", (request, response) => {
        setCorsHeaders(response);
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
        setCorsHeaders(response);
        const hash = md5(JSON.stringify(request.body));
        response.header("Location", request.path + "/" + hash);
        response.status(201).send();
      });
      server.put("/*", (request, response) => {
        setCorsHeaders(response);
        response.status(201).send();
      });
      server.listen(serverPort, () => log.info("Hydra tests server is listening on port %d...", serverPort));
    }
  ]
};
