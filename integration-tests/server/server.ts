import * as express from "express";
const fs = require("fs");
const serverPort = 3000;

function textFileLoader(module, filename)
{
    module.exports = fs.readFileSync(filename, "utf8");
}

function jsonFileLoader(module, filename)
{
    module.exports = JSON.parse(fs.readFileSync(filename, "utf8"));
}

require.extensions[".headers"] = textFileLoader;
require.extensions[".txt"] = textFileLoader;
require.extensions[".jsonld"] = jsonFileLoader;
const server = express();
server.disable("etag");

server.get("/*", (request, response) =>
    {
        let path = (request.path === "/" ? "/root" : request.path);
        let body = loadBody(path);
        if ((sendHeaders(path, response, !!body)) || (body))
        {
            response.status(200).send(body);
        }
        else
        {
            response.status(404).send();
        }
    });

function sendHeaders(path: string, response: express.Response, isBodyLoaded: boolean): boolean
{
    response.header("Content-Type", (isBodyLoaded ? "application/ld+json" : "text/plain"));
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET");
    response.header("Access-Control-Expose-Headers", "Link, Content-Type");
    let headersFile = path + ".headers";
    if (!fs.existsSync(__dirname + headersFile))
    {
        return false;
    }

    require(__dirname + headersFile).replace("\r", "").split("\n").filter(header => header.length > 0)
        .forEach(header =>
        {
            let name = header.split(":")[0];
            let value = header.substr(name.length + 1).trim();
            response.header(name, value);
        });
    return true;
}

function loadBody(path: string)
{
    let body = null;
    let bodyFile = path + (path.indexOf(".") === -1 ? ".jsonld" : "");
    if (fs.existsSync(__dirname + bodyFile))
    {
        body = require(__dirname + bodyFile)
    }

    return body;
}

server.listen(serverPort, () => console.log(`Server started at localhost:${serverPort}`));