import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  LenderBranchUpdateZodType,
  LenderBranchZodType,
} from "../../validators/lenderBranch/index.js";

const lenderBranchDb = {
  create: async (lenderBranchInfo: LenderBranchZodType) => {
    try {
      const lenderBranch = await prisma.lenderBranch.create({
        data: lenderBranchInfo,
      });
      return lenderBranch;
    } catch (error) {
      throw error;
    }
  },
  read: async (lenderBranchId: string, lenderId?: string) => {
    try {
      const lenderBranch = await prisma.lenderBranch.findUniqueOrThrow({
        where: { id: lenderBranchId, lenderId },
      });

      return lenderBranch;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    lenderId?: string
  ) => {
    try {
      const lenderBranch = await prisma.lenderBranch.findMany({
        where: {
          OR: [
            {
              branchName: {
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
          lenderId,
        },
        skip: offset,
        take: limit,
      });

      const maxCount = await prisma.lenderBranch.count({
        where: {
          OR: [
            {
              branchName: {
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
          lenderId,
        },
      });

      return { lenderBranch, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    lenderBranchId: string,
    lenderBranchInfo: LenderBranchUpdateZodType,
    lenderId?: string
  ) => {
    try {
      const lenderBranch = await prisma.lenderBranch.update({
        where: {
          id: lenderBranchId,
          lenderId,
        },
        data: lenderBranchInfo,
      });

      return lenderBranch;
    } catch (error) {
      throw error;
    }
  },
  delete: async (lenderBranchId: string) => {
    try {
      const lenderBranch = await prisma.lenderBranch.delete({
        where: {
          id: lenderBranchId,
        },
      });
      return lenderBranch;
    } catch (error) {
      throw error;
    }
  },
};

export default lenderBranchDb;
