import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  LenderUpdateZodType,
  LenderZodType,
} from "../../validators/lender/index.js";

const lenderDb = {
  create: async (lenderInfo: LenderZodType) => {
    try {
      const lender = await prisma.lender.create({
        data: lenderInfo,
      });
      return lender;
    } catch (error) {
      throw error;
    }
  },
  read: async (lenderId: string) => {
    try {
      const lender = await prisma.lender.findUniqueOrThrow({
        where: { id: lenderId },
      });

      return lender;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT
  ) => {
    try {
      const lender = await prisma.lender.findMany({
        where: {
          OR: [
            {
              lenderName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              gstNumber: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              contactEmail: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        skip: offset,
        take: limit,
      });

      const maxCount = await prisma.lender.count({
        where: {
          OR: [
            {
              lenderName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              gstNumber: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              contactEmail: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      return { lender, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (lenderId: string, lenderInfo: LenderUpdateZodType) => {
    try {
      const lender = await prisma.lender.update({
        where: {
          id: lenderId,
        },
        data: lenderInfo,
      });

      return lender;
    } catch (error) {
      throw error;
    }
  },
  delete: async (lenderId: string) => {
    try {
      const lender = await prisma.lender.delete({
        where: {
          id: lenderId,
        },
      });
      return lender;
    } catch (error) {
      throw error;
    }
  },
};

export default lenderDb;
