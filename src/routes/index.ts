import { RegisterController } from "@controllers/auth.controller";
import express, { Request, Response } from "express";
import { RegisterMiddleware } from "src/middleware/auth.middleware";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */
router.get("/", RegisterMiddleware, RegisterController);


/**
 * PARTIE PRIVE
 */

export default router;
