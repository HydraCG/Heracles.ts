import * as express from 'express';
const fs = require('fs');
const serverPort = 3000;

function setHeaders(
  path: string,
  response: express.Response,
  isJsonLd: boolean
): boolean {
  response.header(
    'Content-Type',
    isJsonLd ? 'application/ld+json' : 'text/plain'
  );
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET');
  response.header('Access-Control-Expose-Headers', 'Link, Content-Type');

  let file = __dirname + path + '.headers';
  if (!fs.existsSync(file)) {
    return false;
  }
  fs
    .readFileSync(file, 'utf8')
    .replace('\r', '')
    .split('\n')
    .filter(header => header.length > 0)
    .forEach(header => {
      let name = header.split(':')[0];
      let value = header.substr(name.length + 1).trim();
      response.header(name, value);
    });

  return true;
}

function loadBody(path: string) {
  let file = __dirname + path + (path.indexOf('.') === -1 ? '.jsonld' : '');
  if (fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf8');
  }

  return null;
}

module.exports = {
  'framework:hydra-testserver': [
    'factory',
    function framework(args, config, logger, helper) {
      const log = logger.create('hydra-testserver');
      log.info('Starting test server...');
      const server = express();
      server.disable('etag');
      server.get('/*', (request, response) => {
        let path = request.path === '/' ? '/root' : request.path;
        let body = loadBody(path);
        if (setHeaders(path, response, !!body) || body) {
          response.status(200).send(body);
        } else {
          response.status(404).send();
        }
      });
      server.listen(serverPort, () =>
        log.info('Hydra tests server is listening on port %d...', serverPort)
      );
    }
  ]
};
