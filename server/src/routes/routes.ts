import express, { Router } from "express";

const router = Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {});
router.post("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {});

export default router;
