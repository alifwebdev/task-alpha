import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../libs/send-email.js";
import Verification from "../models/verification.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationToken = jwt.sign(
      {
        userId: newUser._id,
        property: "emailVerification",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await Verification.create({
      userId: newUser._id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
    });

    // Send verification email

    const verficationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const emailBody = `
      <p>Click the link below to verify your email address:</p>
      <a href="${verficationLink}">Verify Email</a>
    `;
    const emailSubject = "Email Verification";
    const emailSent = await sendEmail(email, emailSubject, emailBody);
    if (!emailSent) {
      return res.status(500).json({
        message: "Failed to send verification email",
      });
    }

    res.status(201).json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {};

export { registerUser, loginUser };
