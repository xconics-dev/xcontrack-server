import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

// 🪄 This adds `.openapi()` to all Zod schemas
extendZodWithOpenApi(z);

export { z };
