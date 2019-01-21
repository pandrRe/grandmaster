import { Request, Response } from "express";
import { ErrorType, Message, error } from "../errors/Error";
import { Match } from "../models/Match";
import { Round } from "../models/Round";

async function getMatch(req: Request, res: Response) {
    try {
        const match = await Match.findOne(req.params.id, {
            relations: ["blueTeam", "redTeam", "round"],
        });
        return res.send(match);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function getMatchesOnRound(req: Request, res: Response) {
    try {
        const round = await Round.findOne(req.params.id, {
            relations: ["matches"],
        });

        return res.send(round!.matches);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

export default {
    getMatch, getMatchesOnRound,
};