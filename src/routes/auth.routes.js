import { Router } from "express";
import * as AuthCtrl from '../controllers/auth.controller.js'
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.post('/me', AuthCtrl.me);

export default router;