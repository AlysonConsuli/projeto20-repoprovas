import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { addTest, getTests } from "../controllers/testsController.js";
import { testSchema } from "../schemas/testsSchema.js";
var testsRouter = Router();
testsRouter.post("/test", validateToken, validateSchema(testSchema), addTest);
testsRouter.get("/tests", validateToken, getTests);
export default testsRouter;
