import { Router } from "express";
import passport from "passport";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/register", (req, res) => userController.registerUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));

router.use(passport.authenticate("jwt_get", {session: false}));

router.get("/:id", userController.getUserByID);

export default router;