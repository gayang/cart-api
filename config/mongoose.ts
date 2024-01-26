import mongoose from "mongoose";

const mongoURL = process.env.DB_URL as string;
export const connectMongoDB = () =>
  mongoose
    .connect(mongoURL as string)
    .then(() => console.log("Successfully connected to MongoDB."));
