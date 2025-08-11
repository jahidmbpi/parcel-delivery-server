import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { globalErrorhandelar } from "./middleware/globalErrorHnadelar/globalErrorhendelar";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://assainment-4-client.vercel.app"],
  })
);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to parcel delivery",
  });
});

app.use(globalErrorhandelar);

export default app;
