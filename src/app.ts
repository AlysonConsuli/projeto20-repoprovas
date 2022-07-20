import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import "./config/setup.js";

import router from "./routes/index.js";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js";
import { notFoundRouteHandlingMiddleware } from "./middlewares/notFoundRouteHandlingMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandlingMiddleware);
app.use(notFoundRouteHandlingMiddleware);

export default app;
