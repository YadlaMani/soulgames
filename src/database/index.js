import mongoose from "mongoose";
import { NextResponse } from "next/server";
const connectToDB = async () => {
  const mongouri = process.env.MONGO_URI;
  if (!mongouri) {
    return NextResponse.json({
      success: false,
      error: "No database url provided/wrong url",
    });
  }
  mongoose
    .connect(mongouri)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Failed to connect to database", err));
};
export default connectToDB;
