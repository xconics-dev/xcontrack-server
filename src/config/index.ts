export enum statusCodes {
  clientError = 400,
  serverError = 500,
  unauthorized = 401,
  created = 201,
  forbidden = 403,
}

interface CONFIG {
  PORT: number;
  PAGE_ITEM_COUNT: number;
  FRONTEND_URL: string;
  JWT_SECRET: string;
  GST_API_KEY: string;
  ENCRYPTION_SECRET: string;
  MIN_PASSWORD_LENGTH: number;
  DEFAULT_PASSWORD_LENGTH: number;
  DEFAULT_NOT_ACCEPTED_TIME: number;
}

const Config: CONFIG = {
  PORT: 8080,
  PAGE_ITEM_COUNT: 10,
  FRONTEND_URL: process.env.FRONTEND_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  GST_API_KEY: process.env.GST_API_KEY!,
  ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET!,
  MIN_PASSWORD_LENGTH: 6,
  DEFAULT_PASSWORD_LENGTH: 16,
  DEFAULT_NOT_ACCEPTED_TIME: 1000 * 60 * 60 * 4, //4 hours
};

export default Config;
