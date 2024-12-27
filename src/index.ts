import app from "./app";
import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = `${process.env.PORT || 3000}`;
const MONGO_DB_URL = process.env.MONGO_DB_URL
console.log(PORT)
console.log(MONGO_DB_URL)

const startServer = async () => {
  try {
    await connect(MONGO_DB_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Express is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start application:", error.message);
    console.trace(error);
    process.exit(1);
  }
};

startServer();
