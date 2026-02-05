import { Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client.js";

export const asyncErrorHandler = (
  func: (req: Request, res: Response) => Promise<any>
) => {
  return (req: Request, res: Response) => {
    func(req, res).catch((error: Error | ZodError) => {
      if (error instanceof ZodError)
        return res
          .status(400)
          .json({ error: error.issues[0]?.message || "Something went wrong" });
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // Extracting field name from the error message
          const fieldMatch = error.message.match(
            /Unique constraint failed on the fields: \(`(.+?)`\)/
          );
          const fieldName = fieldMatch ? fieldMatch[1] : "Unknown field";

          return res.status(500).json({
            error: `A record with the same ${fieldName} already exists. Please use a different value.`,
          });
        }
      }

      if (error instanceof Error) {
        console.error(error.message);
        return res.status(500).json({ error: "Something went wrong" });
      }
    });
  };
};
