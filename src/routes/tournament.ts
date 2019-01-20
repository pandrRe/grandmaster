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
router.get("/:tournamentId/team/:teamId", Worker.getTeamOnTournament);

router.use(adminAccess);
router.use(adminSecret(process.env.ADMIN_SECRET!));

router.post("/", Worker.newTournament);
router.post("/:tournamentId/team/:teamId", Worker.addTeamOnTournament);
router.post("/:tournamentId/team/:teamId/roster", Worker.addPlayerToTeam);
router.put("/:id/round", Worker.addRound);
router.post("/round/:roundId/match", Worker.addMatchToRound);

export default router;