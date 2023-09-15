import { Request, Response } from "express";
import User from "../models/user.model";
import { createAccessToken } from "../libs";
import { encrypt, verified } from "../utils";

export const register = async ({ body }: Request, res: Response) => {
  const { username, email, password } = body;

  const userFound = await User.findOne({ email });

  if (userFound) {
    return res.status(400).json(["The email is already in use"]);
  }

  const passHash = await encrypt(password);

  try {
    const newUser = new User({
      username,
      email,
      password: passHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    return res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async ({ body }: Request, res: Response) => {
  const { email, password } = body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await verified(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    return res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req: Request, res: Response) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
