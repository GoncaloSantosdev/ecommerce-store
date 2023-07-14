import express from "express";
const router = express.Router();
// Controllers
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
// Middleware
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
