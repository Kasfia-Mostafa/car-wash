import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    // console.log("Connected to the database successfully!");

    // Start the Express server
    app.listen(config.port, () => {
      console.log(`Car wash system listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  }
}

main();
