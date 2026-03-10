import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("psych_age.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    total_score INTEGER NOT NULL,
    psych_age REAL NOT NULL,
    real_age INTEGER,
    dimension_scores TEXT NOT NULL,
    personality_sketch TEXT,
    growth_advice TEXT
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/history", (req, res) => {
    const rows = db.prepare("SELECT * FROM test_results ORDER BY date DESC").all();
    res.json(rows);
  });

  app.post("/api/results", (req, res) => {
    const { date, totalScore, psychologicalAge, realAge, dimensionScores, personalitySketch, growthAdvice } = req.body;
    const stmt = db.prepare(`
      INSERT INTO test_results (date, total_score, psych_age, real_age, dimension_scores, personality_sketch, growth_advice)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(date, totalScore, psychologicalAge, realAge, JSON.stringify(dimensionScores), personalitySketch, growthAdvice);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/history/:id", (req, res) => {
    db.prepare("DELETE FROM test_results WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
