import { Router } from "express";
import { handleLogout } from "../controllers/logoutController";

export const logoutRoute = Router({});

logoutRoute.get("/", handleLogout);
