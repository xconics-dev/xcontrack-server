import prisma from "../index.js";
import Config from "../../config/index.js";
import {
  installationRequisitionQueryZodSchema,
  InstallationRequisitionUpdateZodType,
  InstallationRequisitionZodType,
  installationStatusZodSchema,
} from "../../validators/installationRequisition/index.js";
import z from "zod";

const installationRequisitionDb = {
  create: async (
    installationRequisitionInfo: InstallationRequisitionZodType
  ) => {
    try {
      const installationRequisition =
        await prisma.installationRequisition.create({
          data: installationRequisitionInfo,
        });

      return { installationRequisition };
    } catch (error) {
      throw error;
    }
  },
  read: async (installationRequisitionId: string, aggregatorId?: string) => {
    try {
      const installationRequisition =
        await prisma.installationRequisition.findUniqueOrThrow({
          where: {
            id: installationRequisitionId,
            assignedAggregatorId: aggregatorId,
          },
        });

      return installationRequisition;
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
    status?: z.infer<typeof installationRequisitionQueryZodSchema.shape.status>,
    installationStatus?: z.infer<typeof installationStatusZodSchema>,
    branchId?: string,
    aggregatorId?: string
  ) => {
    try {
      const installationRequisition =
        await prisma.installationRequisition.findMany({
          where: {
            assignedAggregatorId: aggregatorId,
            status: installationStatus,
            branchId,
            completedAt: status === "CLOSED" ? { not: null } : undefined,
            OR: [
              {
                requisitionNo: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                customerName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
            installationRequisitionRequests: fieldEngineerId
              ? {
                  some: {
                    assignedEngineerId: fieldEngineerId,
                    engineerAcceptTicket: true,
                  },
                }
              : status === "ACCEPTED"
              ? {
                  some: {
                    engineerAcceptTicket: true,
                  },
                }
              : undefined,
            installationFinishTimeAssigned: {
              gte: gte ? gte.toISOString() : undefined,
              lte: lte ? lte.toISOString() : undefined,
            },
          },
          skip: offset,
          take: limit,
          include: {
            branch: {
              select: {
                branchCode: true,
                branchName: true,
              },
            },
            installationRequisitionRequests: {
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
          },
          orderBy: { createdAt: "desc" },
        });

      const maxCount = await prisma.installationRequisition.count({
        where: {
          assignedAggregatorId: aggregatorId,
          status: installationStatus,
          branchId,
          completedAt: status === "CLOSED" ? { not: null } : undefined,
          OR: [
            {
              requisitionNo: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              customerName: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
          installationRequisitionRequests: fieldEngineerId
            ? {
                some: {
                  assignedEngineerId: fieldEngineerId,
                  engineerAcceptTicket: true,
                },
              }
            : status === "ACCEPTED"
            ? {
                some: {
                  engineerAcceptTicket: true,
                },
              }
            : undefined,
          installationFinishTimeAssigned: {
            gte: gte ? gte.toISOString() : undefined,
            lte: lte ? lte.toISOString() : undefined,
          },
        },
      });

      return { installationRequisition, maxPage: Math.ceil(maxCount / limit) };
    } catch (error) {
      throw error;
    }
  },
  update: async (
    installationRequisitionId: string,
    installationRequisitionInfo: InstallationRequisitionUpdateZodType,
    aggregatorId?: string
  ) => {
    try {
      const installationRequisition =
        await prisma.installationRequisition.update({
          where: {
            id: installationRequisitionId,
            assignedAggregatorId: aggregatorId,
          },
          data: installationRequisitionInfo,
          include: {
            device: {
              select: { id: true },
            },
            installationRequisitionRequests: {
              where: {
                engineerAcceptTicket: true,
              },
              select: {
                assignedEngineerId: true,
              },
            },
          },
        });

      if (installationRequisitionInfo.assignedAggregatorId) {
        const engineer = await prisma.fieldEngineer.findFirst({
          where: {
            pincodeMappings: {
              some: { mappingPincode: installationRequisitionInfo.pincode },
            },
            aggregatorId: installationRequisitionInfo.assignedAggregatorId,
          },
          select: {
            id: true,
          },
        });

        if (engineer)
          await prisma.installationRequisitionRequest.create({
            data: {
              assignedEngineerId: engineer.id,
              installationRequisitionId: installationRequisition.id,
            },
          });
      }

      if (
        installationRequisitionInfo.completedAt &&
        installationRequisition.device?.id &&
        installationRequisition.installationRequisitionRequests.at(0)
          ?.assignedEngineerId
      ) {
        await prisma.deviceMovement.create({
          data: {
            fromEntityType: "ENGINEER",
            fromEntityFieldEngineerId:
              installationRequisition.installationRequisitionRequests.at(0)
                ?.assignedEngineerId,
            toEntityType: "VEHICLE",
            toEntityVehicleId: installationRequisition.id,
            deviceId: installationRequisition.device.id,
            movementType: "ENGINEER_TO_VEHICLE",
            movementDate: new Date().toISOString(),
          },
        });

        await prisma.device.update({
          where: { id: installationRequisition.device.id },
          data: { locationType: "VEHICLE" },
        });
      }

      return installationRequisition;
    } catch (error) {
      throw error;
    }
  },
  delete: async (installationRequisitionId: string) => {
    try {
      const installationRequisition =
        await prisma.installationRequisition.delete({
          where: {
            id: installationRequisitionId,
          },
        });
      return installationRequisition;
    } catch (error) {
      throw error;
    }
  },
  rejectRequest: async (installationRequisitionRequestId: string) => {
    try {
      const installationRequisitionRequest =
        await prisma.installationRequisitionRequest.update({
          where: {
            id: installationRequisitionRequestId,
          },
          data: {
            engineerAcceptTicket: false,
          },
          include: {
            installationRequisition: {
              select: {
                pincode: true,
                id: true,
                assignedAggregatorId: true,
              },
            },
          },
        });

      const installationRequisitionInfo =
        installationRequisitionRequest.installationRequisition;

      const engineer = await prisma.fieldEngineer.findFirst({
        where: {
          pincodeMappings: {
            some: { mappingPincode: installationRequisitionInfo.pincode },
          },
          aggregatorId: installationRequisitionInfo.assignedAggregatorId,
          installationRequisitionRequests: {
            none: { installationRequisitionId: installationRequisitionInfo.id },
          },
        },
        select: {
          id: true,
        },
      });

      if (engineer)
        await prisma.installationRequisitionRequest.create({
          data: {
            assignedEngineerId: engineer.id,
            installationRequisitionId: installationRequisitionInfo.id,
          },
        });
      return { installationRequisitionRequest, engineer: !!engineer };
    } catch (error) {
      throw error;
    }
  },
  acceptRequest: async (installationRequisitionRequestId: string) => {
    try {
      const installationRequisitionRequest =
        await prisma.installationRequisitionRequest.update({
          where: {
            id: installationRequisitionRequestId,
          },
          data: {
            engineerAcceptTicket: true,
          },
        });
      return installationRequisitionRequest;
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
      const installationRequisitionRequest =
        await prisma.installationRequisitionRequest.findMany({
          where: {
            assignedEngineerId: fieldEngineerId,
            engineerAcceptTicket: ticketStatus,
            installationRequisition: {
              assignedAggregatorId: aggregatorId,
            },
          },
          include: {
            installationRequisition: {
              select: {
                requisitionNo: true,
                state: true,
                district: true,
                pincode: true,
                installationAddress: true,
                quantity: true,
                completedAt: true,
              },
            },
          },
          skip: offset,
          take: limit,
          orderBy: {
            installationRequisition: { completedAt: "desc" },
          },
        });

      const maxCount = await prisma.installationRequisitionRequest.count({
        where: {
          assignedEngineerId: fieldEngineerId,
          engineerAcceptTicket: ticketStatus,
        },
      });

      return {
        installationRequisitionRequest,
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
      const installationRequisitionRequest =
        await prisma.installationRequisitionRequest.findMany({
          where: {
            createdAt: { lte: Time },
            engineerAcceptTicket: null,
          },
          select: { id: true },
        });
      return installationRequisitionRequest;
    } catch (error) {
      throw error;
    }
  },
};

export default installationRequisitionDb;
