import { Server } from "http";
import mongoose from "mongoose";
import app from "./app/app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("✅ Connected to MongoDB");

    server = app.listen(envVars.PORT, () => {
      console.log(`http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.error(" Server failed to start:", error);
  }
};

startServer();
