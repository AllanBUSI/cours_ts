import express, { Request, Response } from "express";
const router = express.Router();
/**
 * PARTIE PUBLIC
 */
router.get("/", (req: Request, res: Response) => { return res.json({ok:"ok"}) });


/**
 * PARTIE PRIVE
 */

export default router;
