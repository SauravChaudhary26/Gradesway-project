import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import quizRoutes from "./routes/quizRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/login", authRoutes);
app.use("/api", quizRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
