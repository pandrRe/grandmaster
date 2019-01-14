import { Request, Response, NextFunction } from "express";
import { error, ErrorType, Message } from "../errors/Error";
import { AuthRequest } from "./authRequest";

export function personalAccess() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.params.id === (req as AuthRequest).user.id) {
            next();
            return;
        }
        
        res.status(403).send(error(ErrorType.Auth, Message.Unauthorized));
    }
}