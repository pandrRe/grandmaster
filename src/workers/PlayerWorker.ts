import { Request, Response } from "express";
import { ErrorType, Message, error } from "../errors/Error";
import { Player } from "../models/Player";

async function newPlayer(req: Request, res: Response) {
    const playerData = req.body;
    
    const player = new Player();
    player.name = playerData.name;
    player.realName = playerData.realName;
    player.age = playerData.age;
    player.photoUrl = playerData.photoUrl;

    try {
        await player.save();
        return res.sendStatus(200);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function getPlayer(req: Request, res: Response) {
    try {
        const player = await Player.findOne({
            where: {id: req.params.id}
        });
        return res.send(player);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function getAllPlayers(req: Request, res: Response) {
    try {
        const players = await Player.find();
        return res.send(players);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

export default {
    newPlayer, getPlayer, getAllPlayers,
};