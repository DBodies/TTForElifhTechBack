import { getAllShopController, getShopByNameController, getFlowerByShopController, orderServicesController, getOrderByIdController } from "../controllers/shop.js";   
import { Router } from "express";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";

const router = Router();

router.get("/shops", ctrlWrapper(getAllShopController));
router.get('/shops/:id', ctrlWrapper(getShopByNameController));
router.get('/shops/:shopId/flowers', ctrlWrapper(getFlowerByShopController));
router.post('/orders', ctrlWrapper(orderServicesController));
router.get('/orders/:orderId', ctrlWrapper(getOrderByIdController));

export default router;