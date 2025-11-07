import { Router } from "express";
import getChatSession from "../controllers/get-chat-session.js";

const catalogRoutes = Router();

catalogRoutes.get("/api/v1/messages", getChatSession);

export default catalogRoutes;
