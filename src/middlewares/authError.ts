import { Request, Response, NextFunction, Errback } from "express";
import { error, ErrorType, Message } from "../errors/Error";

export function authError() {
    return (err: Errback, req: Request, res: Response, next: NextFunction) => {
        if (err.name === "UnauthorizedError") {
            res.status(403).send(error(ErrorType.Auth, Message.Unauthorized));
        }
        else {
            next();
        }
    }
}