import * as bodyParser from "body-parser";
import * as express from "express";
import * as fs from "fs";
import * as md5 from "js-md5";
const serverPort = 3000;
const extensions = {};
extensions[".jsonld"] = "application/ld+json";
extensions[".ttl"] = "text/turtle";

function setCorsHeaders(response: express.Response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "HEAD, GET, PUT, DELETE, POST");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Access-Control-Expose-Headers", "Link, Content-Type, Location");
}

function setHeaders(path: string, response: express.Response, mediaType: string): boolean {
  response.header("Content-Type", mediaType);
  setCorsHeaders(response);
  const file = __dirname + path + ".headers";
  if (!fs.existsSync(file)) {
    return false;
  }

  fs.readFileSync(file, "utf8")
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

function loadBody(path: string, query: string): { body: any; mediaType: string } {
  for (const extension of Object.keys(extensions)) {
    const file = __dirname + path + (path.indexOf(".") === -1 ? extension : "");
    if (fs.existsSync(file)) {
      let result = fs.readFileSync(file, "utf8");
      if (!!query && extension === ".jsonld") {
        result = JSON.parse(result);
        const matchingResource = !!result["@graph"] ? result["@graph"].find(_ => _["@id"] === path) : result;
        matchingResource["@id"] = path + query;
        result = JSON.stringify(result);
      }

      return { body: result, mediaType: extensions[extension] };
    }
  }

  return { body: null, mediaType: "text/plain" };
}

module.exports = {
  "framework:hydra-testserver": [
    "factory",
    function framework(args, config, logger, helper) {
      const log = logger.create("hydra-testserver");
      log.info("Starting test server...");
      const server = express();
      server.disable("etag");
      server.use(bodyParser.json({ type: request => request.headers["content-type"] === "application/ld+json" }));
      server.use(bodyParser.text({ type: request => request.headers["content-type"] === "text/turtle" }));

      server.options("/*", (request, response) => {
        setCorsHeaders(response);
        response.status(200).send();
      });

      server.get("/*", (request, response) => {
        const path = request.path === "/" ? "/root" : request.path;
        const output = loadBody(path, request.originalUrl.substr(path.length));
        if (setHeaders(path, response, output.mediaType) || output.body) {
          response.status(200).send(output.body);
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
