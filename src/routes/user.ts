import { Router } from "express";
import Worker from "../workers/UserWorker";
import jwt from "../jwt_config";
import { adminAccess } from "../middlewares/adminAccess";
import { adminSecret } from "../middlewares/adminSecret";

const router = Router();

router.post("/register", Worker.registerUser);
router.post("/login", Worker.loginUser);
router.post("/admin", adminSecret(process.env.ADMIN_SECRET!), Worker.newAdminAccount);

router.use(jwt);

router.get("/:id", Worker.getUserByID);

export default router;