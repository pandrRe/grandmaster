import { Request, Response, NextFunction, Errback } from "express";
import { error, ErrorType, Message } from "../errors/Error";

export function serverError() {
    return (err: Errback, req: Request, res: Response, next: NextFunction) => {
        res.status(403).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}