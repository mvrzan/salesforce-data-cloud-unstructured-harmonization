import { Router } from "express";
import startSession from "../controllers/start-session.js";

const catalogRoutes = Router();

catalogRoutes.get("/api/v1/start-session", startSession);

export default catalogRoutes;
