import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  SupportTicketUpdateZodType,
  SupportTicketZodType,
  supportStatusZodSchema,
} from "../../validators/supportTicket/index.js";
import z from "zod";
import { Prisma } from "../../generated/prisma/client.js";

const installationRequisitionSelectToInclude = {
  vehicleNo: true,
  customerName: true,
  customerMobile: true,
  customerAadhaarNo: true,
} satisfies Prisma.InstallationRequisitionSelect;

const supportTicketDb = {
  create: async (supportTicketInfo: SupportTicketZodType) => {
    try {
      const supportTicket = await prisma.supportTicket.create({
        data: supportTicketInfo,
      });

      return { supportTicket };
    } catch (error) {
      throw error;
    }
  },
  read: async (supportTicketId: string) => {
    try {
      const supportTicket = await prisma.supportTicket.findUniqueOrThrow({
        where: { id: supportTicketId },
      });

      return supportTicket;
    } catch (error) {
      throw error;
    }
  },
  list: async (
    search?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    fieldEngineerId?: string,
    gte?: Date,
    lte?: Date,
    supportStatus?: z.infer<typeof supportStatusZodSchema>,
    branchId?: string,
    aggregatorId?: string
  ) => {
    try {
      const supportTicket = await prisma.supportTicket.findMany({
        where: {
          assignedAggregatorId: aggregatorId,
          status: supportStatus,
          installationRequisition: branchId ? { branchId } : undefined,
          OR: [
            {
              ticketNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              installationRequisition: {
                vehicleNo: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
          supportTicketRequests: fieldEngineerId
            ? {
                some: {
                  assignedEngineerId: fieldEngineerId,
                  engineerAcceptTicket: true,
                },
              }
            : undefined,
          supportFinishTimeAssigned: {
            gte: gte ? gte.toISOString() : undefined,
            lte: lte ? lte.toISOString() : undefined,
          },
        },
        skip: offset,
        take: limit,
        include: {
          supportTicketRequests: {
            where: {
              engineerAcceptTicket: true,
            },
            select: {
              assignedEngineer: {
                select: {
                  engineerName: true,
                  engineerCode: true,
                  mobileNo: true,
                },
              },
            },
          },
          installationRequisition: {
            select: installationRequisitionSelectToInclude,
          },
        },
        orderBy: { createdAt: "desc" },
      });

      const maxCount = await prisma.supportTicket.count({
        where: {
          assignedAggregatorId: aggregatorId,
          status: supportStatus,
          installationRequisition: branchId ? { branchId } : undefined,
          OR: [
            {
              ticketNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              installationRequisition: {
                vehicleNo: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
          supportTicketRequests: fieldEngineerId
            ? {
                some: {
                  assignedEngineerId: fieldEngineerId,
                  engineerAcceptTicket: true,
                },
              }
            : undefined,
          supportFinishTimeAssigned: {
            gte: gte ? gte.toISOString() : undefined,
            lte: lte ? lte.toISOString() : undefined,
          },
        },
      });

      return { supportTicket, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    supportTicketId: string,
    supportTicketInfo: SupportTicketUpdateZodType,
    aggregatorId?: string
  ) => {
    try {
      const supportTicket = await prisma.supportTicket.update({
        where: {
          id: supportTicketId,
          assignedAggregatorId: aggregatorId,
        },
        data: supportTicketInfo,
        include: {
          installationRequisition: {
            select: {
              device: {
                select: {
                  id: true,
                },
              },
            },
          },
          supportTicketRequests: {
            where: {
              engineerAcceptTicket: true,
            },
            select: {
              assignedEngineerId: true,
            },
          },
        },
      });

      if (supportTicketInfo.assignedAggregatorId) {
        const engineer = await prisma.fieldEngineer.findFirst({
          where: {
            pincodeMappings: {
              some: { mappingPincode: supportTicketInfo.pincode },
            },
            aggregatorId: supportTicketInfo.assignedAggregatorId,
          },
          select: {
            id: true,
          },
        });

        if (engineer)
          await prisma.supportTicketRequest.create({
            data: {
              assignedEngineerId: engineer.id,
              supportTicketId: supportTicket.id,
            },
          });
      }

      if (
        supportTicketInfo.completedAt &&
        supportTicket.installationRequisition.device?.id &&
        supportTicket.supportTicketRequests.at(0)?.assignedEngineerId
      ) {
        await prisma.deviceMovement.create({
          data: {
            fromEntityType: "ENGINEER",
            fromEntityFieldEngineerId:
              supportTicket.supportTicketRequests.at(0)?.assignedEngineerId,
            toEntityType: "VEHICLE",
            toEntityVehicleId: supportTicket.id,
            deviceId: supportTicket.installationRequisition.device.id,
            movementType: "ENGINEER_TO_VEHICLE",
            movementDate: new Date().toISOString(),
          },
        });

        await prisma.device.update({
          where: { id: supportTicket.installationRequisition.device.id },
          data: { locationType: "VEHICLE" },
        });
      }

      return supportTicket;
    } catch (error) {
      throw error;
    }
  },
  delete: async (supportTicketId: string) => {
    try {
      const supportTicket = await prisma.supportTicket.delete({
        where: {
          id: supportTicketId,
        },
      });
      return supportTicket;
    } catch (error) {
      throw error;
    }
  },
  rejectRequest: async (supportTicketRequestId: string) => {
    try {
      const supportTicketRequest = await prisma.supportTicketRequest.update({
        where: {
          id: supportTicketRequestId,
        },
        data: {
          engineerAcceptTicket: false,
        },
        include: {
          supportTicket: {
            select: {
              pincode: true,
              id: true,
              assignedAggregatorId: true,
            },
          },
        },
      });

      const supportTicketInfo = supportTicketRequest.supportTicket;

      const engineer = await prisma.fieldEngineer.findFirst({
        where: {
          pincodeMappings: {
            some: { mappingPincode: supportTicketInfo.pincode },
          },
          aggregatorId: supportTicketInfo.assignedAggregatorId,
          supportTicketRequests: {
            none: { supportTicketId: supportTicketInfo.id },
          },
        },
        select: {
          id: true,
        },
      });

      if (engineer)
        await prisma.supportTicketRequest.create({
          data: {
            assignedEngineerId: engineer.id,
            supportTicketId: supportTicketInfo.id,
          },
        });
      return { supportTicketRequest, engineer: !!engineer };
    } catch (error) {
      throw error;
    }
  },
  acceptRequest: async (supportTicketRequestId: string) => {
    try {
      const supportTicketRequest = await prisma.supportTicketRequest.update({
        where: {
          id: supportTicketRequestId,
        },
        data: {
          engineerAcceptTicket: true,
        },
      });
      return supportTicketRequest;
    } catch (error) {
      throw error;
    }
  },
  listRequests: async (
    fieldEngineerId?: string,
    offset: number = 0,
    limit: number = Config.PAGE_ITEM_COUNT,
    ticketStatus?: boolean,
    aggregatorId?: string
  ) => {
    try {
      const supportTicketRequest = await prisma.supportTicketRequest.findMany({
        where: {
          assignedEngineerId: fieldEngineerId,
          engineerAcceptTicket: ticketStatus,
          supportTicket: {
            assignedAggregatorId: aggregatorId,
          },
        },
        include: {
          supportTicket: {
            select: {
              ticketNo: true,
              state: true,
              district: true,
              pincode: true,
              supportAddress: true,
              completedAt: true,
              installationRequisition: {
                select: installationRequisitionSelectToInclude,
              },
            },
          },
        },
        skip: offset,
        take: limit,
        orderBy: {
          supportTicket: { completedAt: "desc" },
        },
      });

      const maxCount = await prisma.supportTicketRequest.count({
        where: {
          assignedEngineerId: fieldEngineerId,
          engineerAcceptTicket: ticketStatus,
          supportTicket: {
            assignedAggregatorId: aggregatorId,
          },
        },
      });

      return {
        supportTicketRequest,
        maxPage: Math.ceil(maxCount / limit),
      };
    } catch (error) {
      throw error;
    }
  },
  findRequestsNotAccepted: async () => {
    try {
      const Time = new Date(
        Date.now() - Config.DEFAULT_NOT_ACCEPTED_TIME
      ).toISOString();
      const supportTicketRequest = await prisma.supportTicketRequest.findMany({
        where: {
          createdAt: { lte: Time },
          engineerAcceptTicket: null,
        },
        select: { id: true },
      });
      return supportTicketRequest;
    } catch (error) {
      throw error;
    }
  },
};

export default supportTicketDb;
