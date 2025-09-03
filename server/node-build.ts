// server/node-build.ts
import path from "path";
import { fileURLToPath } from "url";
import express from "express"; // ✅ default import
import { createServer } from "./index"; // ✅ evita ciclo

const app = createServer();
const port = Number(process.env.PORT) || 3000;

// ✅ __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SPA gerado pelo Vite fica em dist/spa (este arquivo será bundlado para dist/server)
const distPath = path.resolve(__dirname, "../spa");

// ✅ estáticos antes do catch-all
app.use(express.static(distPath));

// ✅ catch-all compatível com Express 5 / path-to-regexp@8
// (nega /api e /health)
app.get(/^\/(?!api\/|health).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// shutdown gracioso
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
