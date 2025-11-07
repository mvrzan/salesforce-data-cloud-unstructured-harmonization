import { Router } from "express";
import startSession from "../controllers/start-session.js";
import sendMessage from "../controllers/send-message.js";

const catalogRoutes = Router();

catalogRoutes.get("/api/v1/start-session", startSession);
catalogRoutes.post("/api/v1/send-message", sendMessage);

export default catalogRoutes;
