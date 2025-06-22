import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password in queries
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    isEmailVarified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    is2FAEnabled: {
      type: Boolean,
      default: false,
    },
    twoFAOtp: {
      type: String,
      select: false, // Do not return OTP in queries
    },
    twoFAOtpExpires: {
      type: Date,
      select: false, // Do not return secret in queries
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
