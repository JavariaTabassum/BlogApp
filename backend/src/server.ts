import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import multer from "multer";



dotenv.config();
const app: Application = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    console.error("🔥 Multer Error:", err.code, err.message);
    return res.status(400).json({ error: err.message });
  }

  console.error("🔥 Server Error:", err.message, JSON.stringify(err, null, 2));
  res.status(500).json({ error: "Something went wrong" });
});

// Simple route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 MERN Blog Backend running with TypeScript!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
