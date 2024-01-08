import express, { Router } from "express";
import * as productsController from "./controllers/productsController";
import * as productsMiddleware from "./middlewares/productsMiddleware";

const router: Router = express.Router();

router.get(
    "/products",
    productsController.getAll
);

router.post(
    "/products",
    productsMiddleware.validateFieldTitle,
    productsMiddleware.validateFieldDescription,
    productsMiddleware.validateFieldValue,
    productsController.createProduct
)

router.put(
    "/products/:id",
    productsMiddleware.validateFieldTitle,
    productsMiddleware.validateFieldDescription,
    productsMiddleware.validateFieldValue,
    productsController.updateProduct
)

router.delete(
    "/products/:id",
    productsController.deleteProduct
)

export default router;

