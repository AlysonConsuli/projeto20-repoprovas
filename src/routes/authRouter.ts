import { Router } from "express";

import { logout, signin, signup } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(authSchema), signup);
authRouter.post("/signin", validateSchema(authSchema), signin);
authRouter.post("/logout", validateToken, logout);

export default authRouter;
