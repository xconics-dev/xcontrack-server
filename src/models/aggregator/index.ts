import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  AggregatorUpdateZodType,
  AggregatorZodType,
} from "../../validators/aggregator/index.js";

const aggregatorDb = {
  create: async (aggregatorInfo: AggregatorZodType) => {
    try {
      const aggregator = await prisma.aggregator.create({
        data: aggregatorInfo,
      });
      return aggregator;
    } catch (error) {
      throw error;
    }
  },
  read: async (aggregatorId: string) => {
    try {
      const aggregator = await prisma.aggregator.findUniqueOrThrow({
        where: { id: aggregatorId },
      });

      return aggregator;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    aggregatorId?: string
  ) => {
    try {
      const aggregator = await prisma.aggregator.findMany({
        where: {
          id: aggregatorId,
          OR: [
            {
              aggregatorName: {
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

      const maxCount = await prisma.aggregator.count({
        where: {
          id: aggregatorId,
          OR: [
            {
              aggregatorName: {
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

      return { aggregator, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    aggregatorId: string,
    aggregatorInfo: AggregatorUpdateZodType
  ) => {
    try {
      const aggregator = await prisma.aggregator.update({
        where: {
          id: aggregatorId,
        },
        data: aggregatorInfo,
      });

      return aggregator;
    } catch (error) {
      throw error;
    }
  },
  delete: async (aggregatorId: string) => {
    try {
      const aggregator = await prisma.aggregator.delete({
        where: {
          id: aggregatorId,
        },
      });
      return aggregator;
    } catch (error) {
      throw error;
    }
  },
  findFirst: async () => {
    try {
      const aggregator = await prisma.aggregator.findFirstOrThrow({
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
        },
      });
      return aggregator;
    } catch (error) {
      throw error;
    }
  },
};

export default aggregatorDb;
