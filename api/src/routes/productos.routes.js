import { Router } from "express";
import { listar } from "../controllers/product.controllers.js";

const router = Router();

router.get('/', listar);
export default router