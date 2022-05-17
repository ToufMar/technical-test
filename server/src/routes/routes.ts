import express, { Router } from "express";
import { createProductController, getManyProductController, updateProductController, deleteManyProductController } from "../controllers/productController";
const router = Router();

router.get("/:productUuids", getManyProductController);
router.post("/", createProductController);
router.put("/", updateProductController);
router.delete("/:productUuids", deleteManyProductController);

export default router;
