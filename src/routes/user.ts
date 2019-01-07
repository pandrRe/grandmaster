import { Router } from "express";
import passport from "passport";
import { UserController } from "../controllers/UserController";
import { adminAccess } from "../middlewares/adminAccess";
import { adminSecret } from "../middlewares/adminSecret";

const router = Router();
const userController = new UserController();

router.post("/register", (req, res) => userController.registerUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));

router.use(passport.authenticate("jwt", {session: false}));

router.get("/:id", userController.getUserByID);

router.use(adminAccess);
router.use(adminSecret(process.env.ADMIN_SECRET!))

export default router;