import { Router } from "express";
import Worker from "../workers/UserWorker";
import jwt from "../jwt_config";
import { adminAccess } from "../middlewares/adminAccess";
import { adminSecret } from "../middlewares/adminSecret";

const router = Router();

router.post("/register", Worker.registerUser);
router.post("/login", Worker.loginUser);

router.use(jwt);

router.get("/:id", Worker.getUserByID);

router.use(adminAccess);
router.use(adminSecret(process.env.ADMIN_SECRET!))

export default router;