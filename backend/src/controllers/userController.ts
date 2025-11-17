import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/User";

interface AuthRequest extends Request {
  user?: JwtPayload | { id: string };
}

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ username, email, password });

    res.status(201).json({
      _id: String(newUser._id),
      username: newUser.username,
      email: newUser.email,
      token: generateToken(String(newUser._id)),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: String(user._id),
      username: user.username,
      email: user.email,
      token: generateToken(String(user._id)),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !("id" in req.user)) {
      return res.status(401).json({ message: "Not authorized, no user found" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
