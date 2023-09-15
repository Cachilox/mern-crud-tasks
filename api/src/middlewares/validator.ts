import { Request, Response, NextFunction } from "express";
import { type Schema, ZodError } from "zod";

export const validateSchema =
  (schema: Schema) =>
  ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(body);
      return next();
    } catch (error: any) {
      return res
        .status(400)
        .json(error.errors.map((error: ZodError) => error.message));
    }
  };
