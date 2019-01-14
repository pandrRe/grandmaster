import { Router } from "express";
import Worker from "../workers/TournamentWorker";
import jwt from "../jwt_config";
import { adminAccess } from "../middlewares/adminAccess";
import { adminSecret } from "../middlewares/adminSecret";

const router = Router();

router.use(jwt);

router.get("/", Worker.getAllTournaments);
router.get("/:id", Worker.getTournament);
router.put("/user/:id", Worker.newUserOnTournament);

router.use(adminAccess);
router.use(adminSecret(process.env.ADMIN_SECRET!));

router.post("/", Worker.newTournament);

export default router;