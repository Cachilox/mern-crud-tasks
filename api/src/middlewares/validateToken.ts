import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    jwt.verify(
      token,
      SECRET_KEY,
      (err: VerifyErrors | null, user: any) => {
        if (err) {
          return res.status(403).json({ message: "Invalid Token" });
        }
        req.user = user;

        return next()
      }
    );
    return
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
