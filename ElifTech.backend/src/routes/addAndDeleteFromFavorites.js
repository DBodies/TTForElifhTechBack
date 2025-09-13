import { Router } from 'express';
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { toggleFavoriteController, removeFavoriteController } from "../controllers/shop.js";

const router = Router();

router.post('/user/:userId/favorites/:flowerId', ctrlWrapper(toggleFavoriteController));
router.delete('/user/:userId/favorites/:flowerId', ctrlWrapper(removeFavoriteController));

export default router;