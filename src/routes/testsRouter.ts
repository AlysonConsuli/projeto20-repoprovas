import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { addTest } from "../controllers/testsController.js";
import { testSchema } from "../schemas/testsSchema.js";

const testsRouter = Router();

testsRouter.post("/test", validateToken, validateSchema(testSchema), addTest);

export default testsRouter;
