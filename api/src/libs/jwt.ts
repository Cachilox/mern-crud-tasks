import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { SECRET_KEY } from "../config";


export const createAccessToken = (payload: {id: Types.ObjectId}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
