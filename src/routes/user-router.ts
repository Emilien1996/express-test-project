import { Router } from "express";
import { handleNewUser } from "../controllers/registerController";

export const userRoutes = Router({});

userRoutes.post("/",handleNewUser);
