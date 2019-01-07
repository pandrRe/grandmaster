import { Request, Response, NextFunction } from "express";
import { error, ErrorType, Message } from "../errors/Error";

export function adminSecret(secret: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.body.adminSecret === secret) {
            next();
            return;
        }
        
        res.status(403).send(error(ErrorType.Auth, Message.Unauthorized));
    }
}