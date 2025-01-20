const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = 8080;

const serveFile = (filePath, res) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf-8");
    }
  })
}

const server = http.createServer((req, res) => {
  let filePath;
  switch (req.url) {
    case "/":
      filePath = path.join(__dirname, "index.html");
      serveFile(filePath, res);
      break;
    case "/about":
      filePath = path.join(__dirname, "about.html");
      serveFile(filePath, res);
      break;
    case "/contact-me":
      filePath = path.join(__dirname, "contact-me.html");
      serveFile(filePath, res);
      break;
    default:
      filePath = path.join(__dirname, "404.html");
      serveFile(filePath, res);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})