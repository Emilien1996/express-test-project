import { Router } from "express";
import { handleLogin } from "../controllers/authController";

export const authRoutes = Router({});

authRoutes.post("/", handleLogin);
