import express from "express";
const router = express.Router();
// Controllers
import {
  getProductById,
  getProducts,
  createProduct,
} from "../controllers/productController.js";
// Middleware
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);

export default router;
