import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authRequest";
import { ErrorType, Message, error } from "../errors/Error";
import { UserOnTournament } from "../models/UserOnTournament";
import { User } from "../models/User";
import { Tournament, TournamentData } from "../models/Tournament";

async function getTournament(req: Request, res: Response) {
    try {
        const tournament = await Tournament.find({
            where: {id: req.params.id}
        });
        return res.send(tournament);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function getAllTournaments(req: Request, res: Response) {
    try {
        const tournaments = await Tournament.find();
        return res.send(tournaments);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function newTournament(req: Request, res: Response) {
    const tournamentData: TournamentData = req.body;

    try {
        const tournament = new Tournament();
        tournament.fromData(tournamentData);
        await tournament.save();

        return res.send(tournament);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function newUserOnTournament(req: Request, res: Response) {
    const userData = (req as AuthRequest).user;
    const tournamentId = req.params.id;

    try {
        const isUserOnTournament = !!(await UserOnTournament.whereUser(userData.id, tournamentId));

        if (!isUserOnTournament) {
            const user = await User.findOne(userData.id);
            const tournament = await Tournament.findOne(tournamentId);

            if (!tournament) {
                return res.status(400).send(error(ErrorType.Request, Message.TournamentNotFound));
            }

            const newUserOnTournament = new UserOnTournament();
            newUserOnTournament.budget = tournament!.startingBudget;
            newUserOnTournament.user = user!;
            newUserOnTournament.tournament = tournament!;
            await newUserOnTournament.save();

            return res.sendStatus(200);
        }
        
        return res.status(400).send(error(ErrorType.Request, Message.UserIsOnTournament));
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

export default {
    getTournament, getAllTournaments,newTournament, newUserOnTournament,
};