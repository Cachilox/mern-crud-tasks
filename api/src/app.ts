import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/tasks.routes";

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
