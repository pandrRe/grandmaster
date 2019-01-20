import { Router } from "express";
import Worker from "../workers/TeamWorker";
import jwt from "../jwt_config";
import { adminAccess } from "../middlewares/adminAccess";
import { adminSecret } from "../middlewares/adminSecret";

const router = Router();

router.use(jwt);

router.get("/", Worker.getAllTeams);
router.get("/:id", Worker.getTeam);

router.use(adminAccess);
router.use(adminSecret(process.env.ADMIN_SECRET!));

router.put("/", Worker.newTeam);

export default router;