import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000, 
  NODE_ENV: process.env.NODE_ENV || "development", 
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: Number(process.env.BCRYPT_SALT_ROUND) || 10, 
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "10h", 
};
