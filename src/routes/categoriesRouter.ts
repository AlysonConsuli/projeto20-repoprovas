import { Router } from "express";

import { validateToken } from "../middlewares/validateToken.js";
import { getCategories } from "../controllers/categoriesControllers.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", validateToken, getCategories);

export default categoriesRouter;
