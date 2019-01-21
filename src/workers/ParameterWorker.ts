import { Request, Response } from "express";
import { ErrorType, Message, error } from "../errors/Error";
import { PerformanceParameter } from "../models/PerformanceParameter";
import { RosterOnMatch } from "../models/RosterOnMatch";
import { RosterPerformance } from "../models/RosterPerformance";

async function addParameter(req: Request, res: Response) {
    const parameterData: {
        name: string, value: number, unique: boolean,
    } = req.body;

    const performanceParameter = new PerformanceParameter();
    performanceParameter.name = parameterData.name;
    performanceParameter.value = parameterData.value;
    performanceParameter.unique = parameterData.unique;

    try {
        await performanceParameter.save();
        return res.sendStatus(200);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

async function addOrUpdatePerformance(req: Request, res: Response) {
    const { parameterId, rosterId, amount } = req.body;

    try {
        const [parameter, rosterOnMatch] = await Promise.all([
            PerformanceParameter.findOne(parameterId),
            RosterOnMatch.findOne(rosterId),
        ]);
    
        if (!parameter) {
            return res.status(400).send(error(ErrorType.Request, Message.PerformanceParameterNotFound));
        }
        if (!rosterOnMatch) {
            return res.status(400).send(error(ErrorType.Request, Message.PlayerNotFound));
        }
    
        let performance = await RosterPerformance.findOne({
            where: {parameter: {id: parameterId}, player: {id: rosterId}},
        });
    
        if (performance) {
            performance!.amount = amount;
            await performance!.save();
    
            return res.sendStatus(200);
        }
    
        performance = new RosterPerformance();
        performance.parameter = parameter;
        performance.player = rosterOnMatch;
        performance.amount = amount;
        await performance.save();
    
        return res.sendStatus(200);
    }
    catch(e) {
        return res.status(500).send(error(ErrorType.Internal, Message.SomethingWrong));
    }
}

export default {
    addParameter, addOrUpdatePerformance,
};