import express from "express";
const router = express.Router();
// Controllers
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
