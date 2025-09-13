import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../schemas/auth.js";
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController } from "../controllers/auth.js";

const router = Router();

router.post('/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController)
);
router.post('/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController)
);
router.post('/refresh',
    ctrlWrapper(refreshUserSessionController)
);
router.post('/logout',
    ctrlWrapper(logoutUserController)
);
export default router;