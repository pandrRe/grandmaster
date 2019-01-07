import { Request, Response } from "express";
import { User } from "../models/User";
import { ErrorType, Message, error } from "../errors/Error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
    private bcryptSaltRounds: number = 10;

    public getUserByID(req: Request, res: Response) {
        User.findOne({id: req.params.id})
            .then(user => {
                res.send(user);
            })
            .catch(e => {
                res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
            });
    }

    public async registerUser(req: Request, res: Response) {
        const credentials = req.body;
        const user = new User();

        try {
            const hasUser = await User.findOne({login: credentials.login});
            if (hasUser) {
                res.status(400).send(error(ErrorType.Registration, Message.UserAlreadyExists));
                return;
            }

            user.login = credentials.login;
            user.password = credentials.password;
            user.profile = 1;

            const [hasErrors, errors] = await user.validate();
            if (hasErrors) {
                res.status(400).send(error(ErrorType.Registration, errors!));
            }
            else {
                user.password = await this.generatePassword(user.password);
                await user.save();
                res.send(user);
            }
        }
        catch(e) {
            res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
        }
    }

    public async loginUser(req: Request, res: Response) {
        const credentials = req.body;

        try {
            const user = await User.findOne({
                select: ["id", "login", "password", "profile"],
                where: { login: credentials.login },
            });
    
            if (user) {
                const passwordsMatch = await this.validatePassword(credentials.password, user.password);
                if (passwordsMatch) {
                    const userPayload = {
                        id: user.id,
                        login: user.login,
                        profile: user.profile,
                    };

                    const JWT = jwt.sign(userPayload, process.env.JWT_SECRET!, {
                        issuer: "grandmaster",
                        audience: "leaguemaster",
                        expiresIn: "1d",
                    });
                    res.send({ user: userPayload, JWT });   
                    return;
                }
            }

            res.status(400).send(error(ErrorType.Auth, Message.Credentials));
        }
        catch(e) {
            res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
        }
    }

    private generatePassword(plainPassword: string) {
        return bcrypt.hash(plainPassword, this.bcryptSaltRounds)
            .then(hash => hash);
    }

    private validatePassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword)
            .then(result => result);
    }

}