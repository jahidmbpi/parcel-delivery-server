import Express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { globalErrorhandelar } from "./middleware/globalErrorHnadelar/globalErrorhendelar";
import cookieParser from "cookie-parser";

const app = Express();
app.use(
  cors({
    origin: " http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
