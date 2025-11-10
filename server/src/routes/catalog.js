import { Router } from "express";
import startSession from "../controllers/start-session.js";
import sendMessage from "../controllers/send-message.js";
import deleteSession from "../controllers/delete-session.js";

const catalogRoutes = Router();

catalogRoutes.get("/api/v1/start-session", startSession);
catalogRoutes.post("/api/v1/send-message", sendMessage);
catalogRoutes.delete("/api/v1/delete-session", deleteSession);

export default catalogRoutes;
