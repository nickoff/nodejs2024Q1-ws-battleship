import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

const HTTP_PORT = 8181;

const httpServer = http.createServer((req, res) => {
  const dirName = path.resolve(path.dirname(''));
  const filePath = dirName + (req.url === '/' ? '/front/index.html' : `/front${req.url}`);
  fs.readFile(filePath, (err, data) => {
    if (err != null) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

export const startHttpServer = (): void => {
  httpServer.listen(HTTP_PORT);
  console.log(`Start static http server on the ${8181} port!`);
};
