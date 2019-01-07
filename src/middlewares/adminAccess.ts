import { Request, Response, NextFunction } from "express";
import { error, ErrorType, Message } from "../errors/Error";

export function adminAccess(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        res.status(401).send(error(ErrorType.Auth, Message.NotLoggedIn));
    }
    else if (req.user.profile !== 2) {
        res.status(403).send(error(ErrorType.Auth, Message.Unauthorized));
    }
    else {
        next();
    }
}