const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

app.use(cors());
app.use(express.raw({ type: "*/*", limit: "50mb" }));

app.post("/save-audio", (req, res) => {
  const audioPath = req.query.path;

  if (!audioPath || !audioPath.startsWith("/audio/")) {
    return res.status(400).json({ error: "Invalid path — must start with /audio/" });
  }

  // Prevent path traversal
  const fullPath = path.resolve(PUBLIC_DIR, audioPath.slice(1));
  if (!fullPath.startsWith(path.join(PUBLIC_DIR, "audio"))) {
    return res.status(400).json({ error: "Path traversal not allowed" });
  }

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, req.body);

  console.log(`[record] Saved: ${fullPath}`);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`[record] Audio save server running on http://localhost:${PORT}`);
  console.log(`[record] Saving files to ${path.join(PUBLIC_DIR, "audio")}`);
});
