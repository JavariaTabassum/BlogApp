import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

interface AuthRequest extends Request {
  user?: IUser;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  try {
    // ✅ Expect Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // Find user by ID and attach to request
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
