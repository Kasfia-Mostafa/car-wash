import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./router";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

const test = (req: Request, res: Response) => {
  // Promise.reject()
  const a = 10;
  res.send(a);
};

app.get("/", test);

export default app;
