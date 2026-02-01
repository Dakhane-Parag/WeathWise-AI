import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});


app.post("/api/query", (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  res.json({
    answer: "Placeholder response. RAG pipeline coming soon.",
    sources: []
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
