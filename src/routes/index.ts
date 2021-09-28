import { LoginController, RegisterController } from "@controllers/auth.controller";
import express, { Request, Response } from "express";
import { LoginMiddleware, RegisterMiddleware } from "src/middleware/auth.middleware";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */
router.post("/", RegisterMiddleware, RegisterController);

router.post('/login', LoginMiddleware, LoginController);

router.get('/users')
router.get('/user/:email')

export default router;
