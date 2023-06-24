import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";

export const refreshTokenRoute = Router({});

refreshTokenRoute.get("/", handleRefreshToken);
