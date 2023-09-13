import mongoose from "mongoose";
import { DB_URL } from "./config";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.error(error);
  }
};
