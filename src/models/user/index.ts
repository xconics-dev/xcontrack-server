import prisma from "../index.js";
import {
  userSigninZodType,
  type userZodType,
} from "../../validators/user/index.js";

const userDb = {
  signup: async (userInfo: userZodType) => {
    try {
      const user = await prisma.user.create({ data: userInfo });

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  signin: async (userInfo: userSigninZodType) => {
    try {
      const user = await prisma.user.findUnique({ where: userInfo });

      return user;
    } catch (error) {
      throw error;
    }
  },
  status: async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default userDb;
