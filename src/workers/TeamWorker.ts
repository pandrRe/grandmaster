import { Request, Response } from "express";
import { ErrorType, Message, error } from "../errors/Error";
import { Team } from "../models/Team";

async function newTeam(req: Request, res: Response) {
    const teamData = req.body;
    
    const team = new Team();
    team.name = teamData.name;
    team.tag = teamData.tag;
    team.photoUrl = teamData.photoUrl;

    try {
        await team.save();
        return res.sendStatus(200);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function getTeam(req: Request, res: Response) {
    try {
        const team = await Team.findOne({
            where: {id: req.params.id}
        });
        return res.send(team);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function getAllTeams(req: Request, res: Response) {
    try {
        const teams = await Team.find();
        return res.send(teams);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

export default {
    newTeam, getTeam, getAllTeams,
};