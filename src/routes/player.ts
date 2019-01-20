import { Router } from "express";
import Worker from "../workers/PlayerWorker";
import jwt from "../jwt_config";
import { adminAccess } from "../middlewares/adminAccess";
import { adminSecret } from "../middlewares/adminSecret";

const router = Router();

router.use(jwt);

router.get("/", Worker.getAllPlayers);
router.get("/:id", Worker.getPlayer);

router.use(adminAccess);
router.use(adminSecret(process.env.ADMIN_SECRET!));

router.put("/", Worker.newPlayer);

export default router;