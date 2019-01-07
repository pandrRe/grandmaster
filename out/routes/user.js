"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.Router();
const userController = new UserController_1.UserController();
router.post("/register", (req, res) => userController.registerUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));
router.use(passport_1.default.authenticate("jwt_get", { session: false }));
router.get("/:id", userController.getUserByID);
exports.default = router;
