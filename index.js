import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const port = process.env.PORT || 3000;

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  let safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(distDir, safePath);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // SPA Fallback: Serve index.html for all client-side routes
      const indexPath = path.join(distDir, "index.html");
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Build dist not found. Please run 'npm run build' first.");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        }
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Client production server is running on port ${port}`);
});
