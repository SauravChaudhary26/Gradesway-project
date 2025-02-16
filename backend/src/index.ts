import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import quizRoutes from "./routes/quizRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/login", authRoutes);
app.use("/api", quizRoutes);

app.listen(8080, () => {
   console.log("Server is running on port 8080");
});
