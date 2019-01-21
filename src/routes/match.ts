import { Router } from "express";
import Worker from "../workers/MatchWorker";
import jwt from "../jwt_config";
import { adminAccess } from "../middlewares/adminAccess";
import { adminSecret } from "../middlewares/adminSecret";

const router = Router();

router.use(jwt);

router.get("/:id", Worker.getMatch);
router.get("/round/:id", Worker.getMatchesOnRound);

router.use(adminAccess);
router.use(adminSecret(process.env.ADMIN_SECRET!));


export default router;