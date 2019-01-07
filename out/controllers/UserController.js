"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Error_1 = require("../errors/Error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor() {
        this.bcryptSaltRounds = 10;
    }
    getUserByID(req, res) {
        User_1.User.findOne({ id: req.params.id })
            .then(user => {
            res.send(user);
        })
            .catch(e => {
            res.status(500).send(Error_1.error(Error_1.ErrorType.Internal, Error_1.Message.SomethingWrong));
        });
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = req.body;
            const user = new User_1.User();
            try {
                const hasUser = yield User_1.User.findOne({ login: credentials.login });
                if (hasUser) {
                    res.status(400).send(Error_1.error(Error_1.ErrorType.Registration, Error_1.Message.UserAlreadyExists));
                    return;
                }
                user.login = credentials.login;
                user.password = credentials.password;
                user.profile = 1;
                const [hasErrors, errors] = yield user.validate();
                if (hasErrors) {
                    res.status(400).send(Error_1.error(Error_1.ErrorType.Registration, errors));
                }
                else {
                    user.password = yield this.generatePassword(user.password);
                    yield user.save();
                    res.send(user);
                }
            }
            catch (e) {
                res.status(500).send(Error_1.error(Error_1.ErrorType.Internal, Error_1.Message.SomethingWrong));
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = req.body;
            try {
                const user = yield User_1.User.findOne({
                    select: ["id", "login", "password"],
                    where: { login: credentials.login },
                });
                if (user) {
                    const passwordsMatch = yield this.validatePassword(credentials.password, user.password);
                    if (passwordsMatch) {
                        const userPayload = {
                            id: user.id,
                            login: user.login,
                        };
                        const JWT = jsonwebtoken_1.default.sign(userPayload, process.env.JWT_SECRET, {
                            issuer: "grandmaster",
                            audience: "leaguemaster",
                            expiresIn: "1d",
                        });
                        res.send({ user: userPayload, JWT });
                        return;
                    }
                }
                res.status(400).send(Error_1.error(Error_1.ErrorType.Auth, Error_1.Message.Credentials));
            }
            catch (e) {
                res.status(500).send(Error_1.error(Error_1.ErrorType.Internal, Error_1.Message.SomethingWrong));
            }
        });
    }
    generatePassword(plainPassword) {
        return bcrypt_1.default.hash(plainPassword, this.bcryptSaltRounds)
            .then(hash => hash);
    }
    validatePassword(plainPassword, hashedPassword) {
        return bcrypt_1.default.compare(plainPassword, hashedPassword)
            .then(result => result);
    }
}
exports.UserController = UserController;
