import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import { Role } from "./user.constant";
import bcryptjs from "bcryptjs";
import config from "../../app/config";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, Number(config.bcrypt_salt_round));
  }
  next();
});

// Ensure password is not exposed
userSchema.post("save", function (doc, next) {
  doc.password = ""; 
  next();
});

// Static method to check if a user exists by email
userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// Static method to match the password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
