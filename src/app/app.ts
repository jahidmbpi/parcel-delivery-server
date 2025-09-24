import Express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { globalErrorhandelar } from "./middleware/globalErrorHnadelar/globalErrorhendelar";
import cookieParser from "cookie-parser";
import { envVars } from "./config/env";

const app = Express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://percel-delevery-client.vercel.app",
    ],
    credentials: true,
  })
);
app.use(Express.json());
app.set("trust proxy", 1);
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to parcel delivery",
  });
});

app.use(globalErrorhandelar);

export default app;
