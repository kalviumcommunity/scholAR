// src/index.ts
import express from "express";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.js";
import multiShotRouter from "./routes/multiShot.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/chat", chatRouter);
app.use("/chat", multiShotRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
