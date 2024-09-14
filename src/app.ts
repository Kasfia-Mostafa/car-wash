import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import router from "./router";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send({ value: a });
};

app.get("/", test);

// Global "Not Found" handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
