import process from "node:process";

import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("[info]: You have already connected to database");
    return;
  }

  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`[db]: Connected to ${connection.host}/${connection.name}`);

    isConnected = true;
  } catch (error) {
    console.error("Could not connect to DB");
    process.exitCode = 1;
  }
};
