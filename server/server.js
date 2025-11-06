import express from "express";
import cors from "cors";
import exif from "fast-exif";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/api/exif", async (req, res) => {
  try {
    const imagePath = path.join(__dirname, "assets/images/DSC00387.jpg");
    const data = await exif.read(imagePath);
    res.json({ message: "EXIF 읽기 성공", exif: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
