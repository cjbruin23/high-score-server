const http = require('http');
const textBody = require("body");
const jsonBody = require("body/json");

var scores = [{ name: "Edwin", score: 50 }, { name: "David", score: 39 }];

const resources = { "/scores": "scores" };
const hostname = null;
const port = 3000;

const server = http.createServer((req, res) => {
  let body;
  if (req.method === "GET") {
    if (resources[req.url] === undefined) {
      res.statusCode = 404;
    } else if (resources[req.url] === 'scores') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      body = JSON.stringify(scores);
      console.log('get body', body);
      res.end(body);
    }
  } else if (req.method === "PUT") {
    res.statusCode = 201;
  } else if (req.method === 'POST') {
    if (resources[req.url] === undefined) {
      console.log('undef');
      res.statusCode = 404;
    } else if (resources[req.url] === 'scores') {
      res.statusCode = 201;
      jsonBody(req, res, (err, body) => {
        if (err) {
          res.statusCode = 500
          return res.end("NO U")
        }
        let sentObj = body;
        scores.push(sentObj)
        scores.sort(function(a, b){
          return b.score > a.score;
        });
        newScores = scores.slice(0, 3);
        console.log('new scores', newScores);
        scores = newScores;
        res.end()
      });
    };
  }
  res.end(JSON.stringify(scores))
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


